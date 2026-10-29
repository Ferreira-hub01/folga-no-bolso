# Folga no Bolso

Site de vendas em Vite para https://folga.filhoteeducado.com/.

## Hostinger
- Repositório: Ferreira-hub01/folga-no-bolso
- Branch: main
- Diretório raiz: .
- Framework: Vite
- Node.js: 24
- Instalação: npm ci
- Compilação: npm run build
- Diretório de saída: dist
- Sem variáveis de ambiente obrigatórias

Ative a publicação automática da branch main na Hostinger para publicar alterações enviadas ao GitHub.

## Ofertas
A Intermediária é a única opção recomendada. Os três botões utilizam os links da Cakto configurados em config.js. Os produtos completos são entregues pela Cakto; este repositório contém somente a página de vendas e as amostras públicas.

## Desenvolvimento
Execute npm ci e npm run dev. Para validar a compilação: npm run build.

As imagens ficam em assets-source como Base64 para transferência pelo conector. O script prebuild restaura os arquivos originais antes de compilar; não há requisições externas de imagens.
