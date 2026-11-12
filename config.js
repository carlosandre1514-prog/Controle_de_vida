/* ==========================================================
   CONFIGURAÇÃO DE VENDAS — edite só este arquivo.
   Vale para o app (index.html), a página de vendas (vendas.html),
   os termos e o painel admin.
   ========================================================== */
window.MCV = {
  // Endereço do servidor (Cloudflare Worker da pasta worker/). Sem barra no fim.
  API: 'https://proud-sea-aab5.carlosandre-ad1514.workers.dev',

  // Links de pagamento (Kiwify, Hotmart, Mercado Pago...). Deixe '' para esconder o botão.
  CHECKOUT: {
    mensal: '',
    anual: ''
  },

  // Preços exibidos (precisam bater com os da plataforma de pagamento).
  PRICE: { mensal: 'R$ 9,90/mês', anual: 'R$ 59,90/ano', anualMes: 'R$ 4,99/mês', anualDesconto: '50% OFF' },

  TRIAL_DAYS: 7,

  // Seus dados de vendedor (aparecem nos Termos e na Política de Privacidade).
  SELLER: { nome: '[SEU NOME OU RAZÃO SOCIAL]', doc: '[CPF/CNPJ]', cidade: '[CIDADE – UF]' },
  SUPPORT_EMAIL: '',
  SUPPORT_WHATSAPP: '' // só números, com DDI e DDD. Ex: 5588999999999
};
