import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CartaoLivro } from './src/componentes/CartaoLivro';
import type { Livro } from './src/types/biblioteca';

const acervo: Livro[] = [
  { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', sinopse: 'Romance narrado por Bentinho.', exemplares: 3 },
  { id: 2, titulo: 'Vidas Secas', autor: 'Graciliano Ramos', exemplares: 1 },
  { id: 3, titulo: 'O Cortiço', autor: 'Aluísio Azevedo', exemplares: 5 },
];

export default function App() {
  return (
    <View style={estilos.tela}>
      <Text style={estilos.cabecalho}>Acervo</Text>
      <ScrollView>
        {acervo.map((livro) => (
          <CartaoLivro key={livro.id} livro={livro} />
        ))}
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#F6F8FA', paddingTop: 48, paddingHorizontal: 16 },
  cabecalho: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});
