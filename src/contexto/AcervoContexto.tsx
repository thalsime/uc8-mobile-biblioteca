import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { guardarLocal, listarLocal } from '../banco/banco';
import { carregarLivros, descreverErro, incluirLivro, type DadosNovoLivro } from '../servicos/acervo';
import type { Livro } from '../types/biblioteca';

export type EstadoAcervo =
  | { tipo: 'carregando' }
  | { tipo: 'erro'; mensagem: string }
  | { tipo: 'pronto'; livros: Livro[]; origem: 'nuvem' }
  | { tipo: 'pronto'; livros: Livro[]; origem: 'aparelho'; motivo: string };

interface ValorDoAcervo {
  estado: EstadoAcervo;
  recarregar: () => void;
  incluir: (dados: DadosNovoLivro) => Promise<Livro>;
  buscar: (id: number) => Livro | undefined;
}

const AcervoContexto = createContext<ValorDoAcervo | undefined>(undefined);

export function AcervoProvedor({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<EstadoAcervo>({ tipo: 'carregando' });
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let cancelado = false;
    setEstado({ tipo: 'carregando' });
    carregarLivros()
      .then((livros) => {
        if (!cancelado) {
          setEstado({ tipo: 'pronto', livros, origem: 'nuvem' });
        }
        guardarLocal(livros).catch((erro: unknown) => {
          console.warn('Não foi possível guardar no aparelho: ' + descreverErro(erro));
        });
      })
      .catch((erro: unknown) => {
        const motivo = descreverErro(erro);
        listarLocal()
          .then((guardados) => {
            if (cancelado) {
              return;
            }
            if (guardados.length > 0) {
              setEstado({ tipo: 'pronto', livros: guardados, origem: 'aparelho', motivo });
            } else {
              setEstado({ tipo: 'erro', mensagem: motivo });
            }
          })
          .catch((erroLocal: unknown) => {
            if (!cancelado) {
              setEstado({ tipo: 'erro', mensagem: motivo + ' / ' + descreverErro(erroLocal) });
            }
          });
      });
    return () => {
      cancelado = true;
    };
  }, [tentativa]);

  function recarregar() {
    setTentativa(tentativa + 1);
  }

  async function incluir(dados: DadosNovoLivro): Promise<Livro> {
    const novo = await incluirLivro(dados);
    setEstado((atual) => (atual.tipo === 'pronto' ? { ...atual, livros: [...atual.livros, novo] } : atual));
    return novo;
  }

  function buscar(id: number): Livro | undefined {
    return estado.tipo === 'pronto' ? estado.livros.find((livro) => livro.id === id) : undefined;
  }

  return <AcervoContexto.Provider value={{ estado, recarregar, incluir, buscar }}>{children}</AcervoContexto.Provider>;
}

export function useAcervo(): ValorDoAcervo {
  const valor = useContext(AcervoContexto);
  if (valor === undefined) {
    throw new Error('useAcervo só funciona dentro de AcervoProvedor');
  }
  return valor;
}
