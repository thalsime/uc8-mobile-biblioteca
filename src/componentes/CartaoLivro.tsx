import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Livro } from '../types/biblioteca';

interface CartaoLivroProps {
  livro: Livro;
  minimoExemplares?: number;
}

export function CartaoLivro({ livro, minimoExemplares = 2 }: CartaoLivroProps) {
  const [mostrarSinopse, setMostrarSinopse] = useState(false);

  return (
    <View style={estilos.cartao}>
      <Text style={estilos.titulo}>{livro.titulo}</Text>
      <Text style={estilos.autor}>{livro.autor}</Text>
      <Pressable onPress={() => setMostrarSinopse(!mostrarSinopse)}>
        <Text style={estilos.acao}>{mostrarSinopse ? 'Esconder sinopse' : 'Ver sinopse'}</Text>
      </Pressable>
      {mostrarSinopse && <Text style={estilos.sinopse}>{livro.sinopse ?? 'Sem sinopse'}</Text>}
      <Text>{livro.exemplares} exemplares</Text>
      {livro.exemplares < minimoExemplares && <Text style={estilos.alerta}>Poucos exemplares</Text>}
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 12 },
  titulo: { fontSize: 18, fontWeight: 'bold' },
  autor: { color: '#5B6B7C' },
  acao: { color: '#004A8D', marginTop: 8 },
  sinopse: { marginTop: 8 },
  alerta: { color: '#F7941D', marginTop: 4 },
});
