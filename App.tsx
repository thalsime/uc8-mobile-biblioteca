import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CartaoLivro } from './src/componentes/CartaoLivro';
import { FormularioLivro, type DadosLivro } from './src/componentes/FormularioLivro';
import type { Livro } from './src/types/biblioteca';

const acervoInicial: Livro[] = [
  { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', sinopse: 'Romance narrado por Bentinho.', exemplares: 3 },
  { id: 2, titulo: 'Vidas Secas', autor: 'Graciliano Ramos', exemplares: 1 },
  { id: 3, titulo: 'O Cortiço', autor: 'Aluísio Azevedo', exemplares: 5 },
];

export default function App() {
  const [livros, setLivros] = useState<Livro[]>(acervoInicial);

  function adicionar(dados: DadosLivro) {
    const proximoId = livros.reduce((maior, atual) => Math.max(maior, atual.id), 0) + 1;
    setLivros([{ id: proximoId, ...dados }, ...livros]);
  }

  return (
    <View style={estilos.tela}>
      <Text style={estilos.cabecalho}>Acervo</Text>
      <FormularioLivro aoAdicionar={adicionar} />
      <FlatList
        data={livros}
        keyExtractor={(livro) => String(livro.id)}
        renderItem={({ item }) => <CartaoLivro livro={item} />}
        ListEmptyComponent={<Text>Nenhum livro no acervo.</Text>}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#F6F8FA', paddingTop: 48, paddingHorizontal: 16 },
  cabecalho: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});
