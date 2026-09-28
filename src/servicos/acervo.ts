import type { Livro } from '../types/biblioteca';

const acervo: Livro[] = [
  { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', sinopse: 'Romance narrado por Bentinho.', exemplares: 3 },
  { id: 2, titulo: 'Vidas Secas', autor: 'Graciliano Ramos', exemplares: 1 },
  { id: 3, titulo: 'O Cortiço', autor: 'Aluísio Azevedo', exemplares: 5 },
];

export function carregarLivros(): Promise<Livro[]> {
  return new Promise((resolver) => {
    setTimeout(() => resolver(acervo), 800);
  });
}
