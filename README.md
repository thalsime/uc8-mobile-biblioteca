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

Gates rodados antes de cada tag: `npx tsc --noEmit` e `npx expo-doctor`.

O projeto fica no Expo SDK 57.0.22, a versão do material. O `expo-doctor` aponta a atualização de
patch disponível (`expo` 57.0.24) e é a única verificação que não passa: a atualização fica para
quando o material mudar de versão.
