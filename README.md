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
| `aula16` | 16 | Navegador de abas (`@react-navigation/bottom-tabs`): a pilha vai para `src/navegacao/PilhaAcervo.tsx` e vira a tela de uma aba; `RotasDasAbas` com `NavigatorScreenParams`; a `TelaSobre` na segunda aba; um só `NavigationContainer`, no `App.tsx` |
| `aula17` | 17 | Cadastro em tela própria: `TelaNovoLivro` na rota `NovoLivro` da pilha, que entrega o livro ao serviço (`proximoId` em `src/servicos/acervo.ts`) e volta com `navigation.goBack()`; a lista do acervo recarrega ao ganhar foco, com `useFocusEffect` e `useCallback`, sem o aviso de carregamento; aba Busca com tela reservada (`TelaBusca`): são as cinco telas do exemplo |
| `aula19` | 19 | Tema em `src/tema/tema.ts` (cores, espaçamentos, raio e `larguraLarga`); `CartaoLivro` em flexbox (linha com `flexDirection: 'row', coluna com `flex: 1`, `gap` e a etiqueta de exemplares); a lista do acervo em uma ou duas colunas pela largura da janela (`useWindowDimensions`, `numColumns` com `key` e `columnWrapperStyle`); `TelaSobre` com a janela em dp, a densidade (`PixelRatio.get()`) e a escala da fonte |
| `aula20` | 20 | Componentes visuais: `Botao` (`Pressable` com estilo em função, variantes primária e secundária, estados pressionado e desabilitado, `accessibilityRole="button"`) e `Campo` (rótulo, `TextInput` e mensagem de erro); `FormularioLivro` com validação visual do título (mensagem só depois de tocado, botão desabilitado com o título vazio); a barra do acervo com `Botao` |
| `aula22` | 22 | Dados na nuvem: `supabase/esquema.sql` (tabela `livros` com RLS, políticas de leitura e inclusão e `grant` ao `anon`), `.env.example` (`EXPO_PUBLIC_SUPABASE_URL` e `EXPO_PUBLIC_SUPABASE_KEY`), seção Configuração neste README; `src/servicos/acervo.ts` lendo e incluindo pela API de dados com `fetch`, cabeçalho `apikey`, resposta como `unknown` conferida por type guard e `POST` com `Prefer: return=representation`; `TelaNovoLivro` inclui pela API e volta |
| `aula23` | 23 | Estados de tela por união discriminada: `ErroDaApi` com o código e a mensagem do corpo da resposta, `descreverErro(erro: unknown)`; `TelaAcervo` com `EstadoAcervo` (`carregando`, `erro`, `pronto`), `switch` por `tipo` e "Tentar de novo" no erro |
| `aula24` | 24 | Context para estado global: `src/contexto/AcervoContexto.tsx` com `AcervoProvedor` (carrega uma vez, `recarregar`, `incluir`, `buscar`) e `useAcervo`; `App.tsx` envolvido pelo provedor; lista, cadastro e detalhe lendo do contexto, com uma só leitura da API |
| `aula26` | 26 | Banco local: `expo-sqlite` instalado; `src/banco/banco.ts` abre `acervo.db` uma vez, cria `livros` com `IF NOT EXISTS` e oferece `listarLocal`, `guardarLocal` (transação: apaga e regrava) e `contarLocal`, com `getAllAsync<LinhaLivro>` e `paraLivro`; o provedor guarda cada carga da nuvem; `TelaSobre` mostra `Guardados no aparelho: N` por `useFocusEffect` |
| `aula27` | 27 | Cache offline: `EstadoAcervo` com duas formas de `pronto` (`origem: 'nuvem'` e `origem: 'aparelho'` com `motivo`); o `.catch` da carga lê `listarLocal` e mostra a lista do aparelho; `TelaAcervo` com o aviso `Sem conexão: mostrando os livros guardados no aparelho (...)` |
| `aula28` | 28 | Fila de sincronização: tabela `pendentes` com `listarPendentes`, `guardarPendente` (`lastInsertRowId`) e `removerPendente`; o provedor roda `sincronizar` antes da carga (envia, remove; `ErroDaApi` descarta; sem rede, para) e `incluir` enfileira a falha de rede; `TelaAcervo` com a linha `A enviar (n): ...` |
| `aula30` | 30 | Qualidade e proteção de dados: `src/erros/erros.ts` (`classificarErro`, `registrarErro`, `ErroDeValidacao`, `ErroDoBanco`); o banco lança `ErroDoBanco` por `noBanco`; o provedor registra cada falha com a origem e segue sem o banco; `TelaNovoLivro` mostra a recusa; `FormularioLivro` valida `exemplares`; `TelaSobre` com `indisponível`; `supabase/esquema.sql` com `revoke update, delete` do `anon` |
| `aula33` | 33 | Entrega: `docs/roteiro_de_teste.md` (casos C01 a C13, executados no renderizador de teste); `eas.json` com o perfil `preview` (`buildType` `apk`, `distribution` `internal`); `android.package` no `app.json`. O build no EAS não foi executado |

## Navegação (desde a `aula17`)

| Tela | Onde fica | Aberta por | Parâmetro |
|---|---|---|---|
| Acervo | Pilha do acervo, na aba Acervo | Aba Acervo | Nenhum |
| Detalhe do livro | Pilha do acervo | Toque em "Ver detalhes" num livro | `id` do livro |
| Novo livro | Pilha do acervo | Botão "Novo livro" na tela do acervo | Nenhum |
| Busca | Aba Busca | Aba Busca | Nenhum |
| Sobre | Aba Sobre | Aba Sobre | Nenhum |

Acervo, Busca e Sobre são abas porque são as seções do aplicativo. Detalhe do livro e Novo livro são rotas de pilha
porque são abertas a partir do acervo. A tela Busca é reservada: recebe conteúdo quando o aplicativo passar a consumir
dados da rede.

Gates rodados antes de cada tag: `npx tsc --noEmit` e `npx expo-doctor`.

O projeto fica no Expo SDK 57.0.22, a versão do material. O `expo-doctor` aponta a atualização de
patch disponível do SDK 57 (o `expo` mais recente) e é a única verificação que não passa: a atualização fica para
quando o material mudar de versão.

## Configuração (desde a `aula22`)

O aplicativo lê a URL do projeto e a chave publicável do Supabase de um arquivo `.env.local`, que não vai
para o repositório. Copie `.env.example` para `.env.local` e preencha com os valores do **seu** projeto
(crie o projeto e execute `supabase/esquema.sql` no SQL Editor; o guia do encontro 22 explica cada passo):

```text
EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
EXPO_PUBLIC_SUPABASE_KEY=sb_publishable_SUA-CHAVE
```

A chave publicável é pública por desenho; o que ela alcança é decidido pelas políticas de RLS do esquema
(leitura e inclusão em `livros`). A chave secreta e a senha do banco nunca entram no repositório.
