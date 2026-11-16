# Simulador de Tempo de Tela e Saúde Digital

Aplicação web educativa para que estudantes do Ensino Médio analisem seus hábitos tecnológicos, visualizem a projeção do tempo dedicado às telas e reflitam sobre escolhas relacionadas à saúde digital.

O projeto foi reconstruído em HTML5, CSS3 e JavaScript Vanilla, sem frameworks ou dependências obrigatórias. Pode ser hospedado gratuitamente no GitHub Pages e, após o primeiro carregamento, oferece recursos básicos de funcionamento offline por meio de um Service Worker.

> **Importante:** a classificação exibida é uma referência pedagógica para reflexão. O simulador não realiza diagnóstico médico ou psicológico.

## Objetivos educacionais

- Reconhecer e analisar os próprios hábitos de uso de tecnologias digitais.
- Comparar o tempo destinado a atividades de estudo e atividades recreativas.
- Interpretar projeções diárias, semanais e anuais de tempo de tela.
- Refletir sobre possíveis impactos na rotina, no sono, na autoestima, no foco e no convívio social.
- Identificar estratégias pessoais para uma relação mais consciente e saudável com a tecnologia.
- Desenvolver pensamento crítico sobre mecanismos de design das plataformas digitais, como notificações, rolagem infinita e algoritmos de recomendação.

## Habilidade BNCC EM13CO24

O simulador foi concebido como apoio a atividades de Cultura Digital relacionadas à habilidade **EM13CO24**, articulando autoavaliação, análise crítica dos hábitos tecnológicos e reflexão sobre o uso consciente das tecnologias. O professor pode contextualizar a atividade com o texto integral da habilidade e o currículo adotado pela rede de ensino.

## Funcionalidades

- Controles deslizantes para estudos, redes sociais, jogos/vídeos e uso antes de dormir.
- Cálculo automático diário, semanal e anual (em dias inteiros).
- Comparação percentual entre estudo e uso recreativo.
- Barras de progresso dinâmicas.
- Classificação em Uso Equilibrado, Zona de Atenção e Uso Intenso.
- Alerta educativo para uso de telas antes de dormir a partir de 30 minutos.
- Quatro questões reflexivas.
- Geração de ficha diagnóstica em texto.
- Cópia do relatório para a área de transferência.
- Exportação para PDF por meio da função de impressão do navegador.
- Alternância entre tema claro e escuro.
- Salvamento local dos controles e das respostas com LocalStorage.
- Reinicialização da atividade.
- Layout responsivo, navegação por teclado e suporte a leitores de tela.
- PWA com cache dos arquivos essenciais para acesso offline após a primeira visita.

## Regras de cálculo preservadas

| Indicador | Fórmula / regra |
|---|---|
| Total diário | Estudos + redes sociais + jogos/vídeos |
| Total semanal | Total diário × 7 |
| Horas no ano | Total diário × 365 |
| Dias inteiros no ano | `Math.round((total diário × 365) / 24)` |
| Percentual produtivo | Estudos ÷ total diário × 100 |
| Percentual recreativo | 100 − percentual produtivo |
| Uso equilibrado | Recreativo ≤ 2,5 h e total diário ≤ 5 h |
| Zona de atenção | Recreativo ≤ 5 h **ou** total diário ≤ 8 h, se não classificado como equilibrado |
| Uso intenso | Demais situações |
| Alerta noturno | Uso antes de dormir ≥ 30 minutos |

Os valores iniciais e os limites dos controles também reproduzem o simulador fornecido: estudos de 0 a 8 horas; redes e lazer de 0 a 10 horas; sono de 0 a 180 minutos.

## Tecnologias utilizadas

- **HTML5:** estrutura semântica.
- **CSS3:** layout responsivo, variáveis de tema, animações e estilos de impressão.
- **JavaScript ES6+:** módulos nativos, cálculos, eventos e relatórios.
- **LocalStorage:** persistência local dos dados.
- **Web App Manifest:** metadados de instalação PWA.
- **Service Worker / Cache API:** recursos essenciais offline.
- **API Clipboard:** cópia do relatório.
- **Window.print():** exportação do relatório como PDF pelo navegador.

Não são usados frameworks, bibliotecas externas, fontes remotas ou CDNs.

## Estrutura de diretórios

```text
/
├── index.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── app.js
│   │   ├── simulator.js
│   │   ├── report.js
│   │   ├── storage.js
│   │   └── theme.js
│   ├── images/
│   │   ├── logo.png
│   │   ├── banner.jpg
│   │   └── icons/
│   └── pdf/
├── manifest.json
├── sw.js
├── README.md
├── LICENSE
├── .gitignore
└── favicon.ico
```

## Como executar localmente

Como o projeto utiliza módulos JavaScript e Service Worker, execute-o por um servidor HTTP local. Abrir `index.html` diretamente pelo protocolo `file://` pode impedir esses recursos de funcionar corretamente.

### Opção 1 — Visual Studio Code

1. Abra a pasta do projeto no VS Code.
2. Instale a extensão **Live Server**, caso ainda não esteja instalada.
3. Clique com o botão direito em `index.html`.
4. Selecione **Open with Live Server**.
5. A aplicação será aberta em um endereço local, normalmente `http://127.0.0.1:5500`.

### Opção 2 — Python

No terminal, dentro da pasta do projeto, execute:

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000`.

## Publicação no GitHub Pages

### Passo a passo para deploy

1. **Criar repositório:** acesse o GitHub e crie um repositório, por exemplo `simulador-saude-digital`.
2. **Enviar arquivos:** envie todos os arquivos e pastas do projeto para a raiz do repositório. O arquivo `index.html` deve ficar na raiz.
3. **Acessar Settings:** abra o repositório e clique em **Settings**.
4. **Pages:** no menu lateral, entre em **Pages**.
5. **Selecionar branch main:** em *Build and deployment*, escolha *Deploy from a branch*, selecione a branch `main` e a pasta `/ (root)`.
6. **Salvar:** clique em **Save**.
7. **Acessar URL gerada:** aguarde a publicação e abra o endereço informado pelo GitHub Pages. Normalmente será `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

### Atualizações futuras

Após modificar os arquivos, envie um novo commit para a branch `main`. O GitHub Pages publicará a atualização automaticamente após o processo de build.

## Capturas de tela ilustrativas

As imagens abaixo são representações esquemáticas da interface esperada, não capturas de uma sessão real.

### Visão geral do painel

```text
┌────────────────────────────────────────────────────────────────┐
│ Saúde Digital                          Cultura Digital · EM13CO24│
├────────────────────────────────────────────────────────────────┤
│ SIMULADOR DE TEMPO DE TELA E SAÚDE DIGITAL                      │
│ Explore seus hábitos, observe os resultados e reflita.          │
├──────────────────────────────┬─────────────────────────────────┤
│ 1. ROTINA DIÁRIA              │ 2. IMPACTO NO TEMPO              │
│ Estudos               2,0 h   │  6,0h       42,0h       91       │
│ ━━━━━━━━━━━●━━━━             │  Por dia    Por semana  Dias/ano │
│ Redes sociais         2,5 h   │                                 │
│ ━━━━━━━━━━━━━●━━━━           │  Estudo 33%  ███████             │
│ Jogos e vídeos        1,5 h   │  Recreação 67% █████████████    │
│ ━━━━━━━●━━━━━━━━             │                                 │
│ Uso antes de dormir   45 min  │  Uso Equilibrado / Atenção      │
└──────────────────────────────┴─────────────────────────────────┘
```

### Questões reflexivas e ficha

```text
┌────────────────────────────────────────────────────────────────┐
│ 3. QUESTÕES PARA REFLETIR                                       │
│ 01  O que mais te surpreendeu na projeção anual?                │
│     [ Campo para resposta do estudante                       ]  │
│ 02  Como as redes influenciam autoestima e foco?                │
│     [ Campo para resposta do estudante                       ]  │
│ 03  Como as plataformas disputam nossa atenção?                 │
│     [ Campo para resposta do estudante                       ]  │
│ 04  Qual atitude saudável você adotará nesta semana?             │
│     [ Campo para resposta do estudante                       ]  │
│ [ Gerar ficha diagnóstica ] [ Reiniciar simulação ]              │
└────────────────────────────────────────────────────────────────┘
```

## Acessibilidade

- Estrutura com elementos semânticos e regiões identificadas.
- Link para pular diretamente ao conteúdo.
- Rótulos associados aos controles e campos de resposta.
- Estados de foco visíveis para navegação por teclado.
- Mensagens dinâmicas com regiões `aria-live`.
- Contraste reforçado por cores e textos, sem depender exclusivamente da cor.
- Respeito à preferência do sistema por movimento reduzido.
- Layout adaptável a telas pequenas e ampliação de texto.

## Privacidade e armazenamento

Os dados são salvos no `localStorage` do navegador utilizado. Eles não são enviados a servidores. Em computadores compartilhados, recomenda-se reiniciar a simulação ao final da atividade. Limpar os dados do navegador também remove o conteúdo salvo.

## Exportação para PDF

Gere a ficha diagnóstica e clique em **Exportar / salvar PDF**. Na janela de impressão do navegador, selecione **Salvar como PDF** como destino. A aparência final pode variar conforme o navegador e as configurações de impressão.

## Licença

Distribuído sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE).
