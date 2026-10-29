/* Configuração única das ofertas. Links de checkout fornecidos pelo titular do projeto. */
window.FOLGA_CONFIG = {
  currency: 'BRL', locale: 'pt-BR',
  salesEnabled: true,
  deliveryText: 'Os materiais são digitais. Após a aprovação do pagamento, siga as instruções de acesso da Cakto para consultar o conteúdo do plano escolhido. Confira no checkout os dados do vendedor e as condições de compra. Para dúvidas ou cancelamento, utilize o contato informado na sua compra.',
  seller: { name: '', contactUrl: '', termsUrl: '', privacyUrl: '' },
  offers: [
    { id: 'basica', name: 'Básica', purpose: 'Comece pelas contas', price: 7.90, checkoutUrl: 'https://pay.cakto.com.br/zpwh98d_1249155', pages: '18 páginas · 1 guia em PDF', items: ['Bolso em Ordem completo', 'Plano de organização de 30 dias', 'Exemplos e fichas de aplicação'], footnote: 'Uma solução completa para começar, inclusive no papel.' },
    { id: 'intermediaria', name: 'Intermediária', purpose: 'Contas e compras da casa', price: 14.90, checkoutUrl: 'https://pay.cakto.com.br/9mac9pm_1249315', pages: '35 páginas · 2 guias em PDF', items: ['Tudo da Básica', 'Mercado com Plano completo', 'Rotina de compras de sete dias', 'Comparação de embalagens e ficha de compras'], footnote: 'Conecte o orçamento ao que entra na sua cozinha.' },
    { id: 'completa', name: 'Completa', purpose: 'As três frentes, juntas', price: 29.90, checkoutUrl: 'https://pay.cakto.com.br/gaqm4et_1249329', pages: '53 páginas · 3 guias em PDF', items: ['Tudo da Intermediária', 'Renda Extra com um Serviço', 'Planilha com 4 abas e 4 gráficos', 'Modelos editáveis de aplicação', 'Instruções para usar as ferramentas'], footnote: 'Os três guias + ferramentas de aplicação.' }
  ]
};
