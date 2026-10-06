# uc8-mobile-biblioteca

Código dos slides do módulo 3 em diante (React Native com Expo e TypeScript) da UC8, no domínio
de **biblioteca** (`Livro`). É o exemplo neutro que os slides usam para mostrar a forma; cada aluno
aplica a mesma forma ao próprio recorte, no seu `uc8-projeto-mobile`. O código web do módulo 2, no
mesmo domínio, está em `uc8-react-biblioteca`.

Uma tag por encontro. Para ver o estado de um encontro, no Git Bash:

```bash
git clone https://github.com/thalsime/uc8-mobile-biblioteca.git
cd uc8-mobile-biblioteca
git checkout aula10
npm install
npx tsc --noEmit
npx expo start
```

| Tag | Encontro | O que entra |
|---|---|---|
| `aula10` | 10 | O `CartaoLivro` do módulo 2 portado para componentes nativos: `View`, `Text` e `Pressable` no lugar das tags do HTML, `onPress` no lugar de `onClick`, estilo com `StyleSheet.create` e propriedades em camelCase sem unidade; a lista de livros dentro de um `ScrollView` |
| `aula11` | 11 | Terceiro livro no acervo do exemplo; a lista continua em `ScrollView` com `map` e `key={livro.id}` |
| `aula12` | 12 | `FormularioLivro` com `TextInput` controlado (`value` e `onChangeText`) e `DadosLivro` exportado; o `App` guarda a lista em `useState` e define o id; a lista passa de `ScrollView` com `map` para `FlatList` com `keyExtractor` e `ListEmptyComponent` |
| `aula13` | 13 | Serviço `carregarLivros` em `src/servicos/acervo.ts`, que devolve a lista por uma `Promise` depois de 800 ms; o `App` começa com a lista vazia e a carrega ao abrir com `useEffect`, com o estado `carregando` e `ActivityIndicator`; o botão `Recarregar` muda `tentativa`, a dependência do efeito, e a função de limpeza descarta a resposta de uma execução anterior |
| `aula15` | 15 | React Navigation 7, instalado com `npx expo install`; a lista sai do `App.tsx` para `src/telas/TelaAcervo.tsx`; navegador em pilha no `App.tsx`, com as rotas tipadas em `src/navegacao/tipos.ts`; a `TelaDetalheLivro` recebe o `id` por parâmetro tipado e busca o livro no serviço, que ganha `guardarLivro` e `buscarLivro` |

Gates rodados antes de cada tag: `npx tsc --noEmit` e `npx expo-doctor`.

O projeto fica no Expo SDK 57.0.22, a versão do material. O `expo-doctor` aponta a atualização de
patch disponível do SDK 57 (o `expo` mais recente) e é a única verificação que não passa: a atualização fica para
quando o material mudar de versão.
