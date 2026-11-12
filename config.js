/* ==========================================================
   CONFIGURAÇÃO DE VENDAS — edite só este arquivo.
   Vale para o app (index.html), a página de vendas (vendas.html),
   os termos e o painel admin.
   ========================================================== */
window.MCV = {
  // Endereço do servidor (Cloudflare Worker da pasta worker/). Sem barra no fim.
  API: 'https://proud-sea-aab5.carlosandre-ad1514.workers.dev',

  // Ofertas mostradas no app e na página de vendas, na ordem (a primeira é a destacada).
  // plano: precisa ser igual ao ?plano= do webhook (vitalicio, anual, trimestral ou mensal).
  // link: link do checkout na Kiwify/Hotmart. Sem link, o botão leva o cliente ao seu WhatsApp (venda por Pix).
  OFFERS: [
    { plano: 'vitalicio', titulo: 'Acesso vitalício', preco: 'R$ 27,90', de: 'R$ 59,90', nota: 'pagamento único · preço de lançamento', link: '' }
  ],

  TRIAL_DAYS: 3, // dias de Premium grátis para quem acabou de instalar

  // Seus dados de vendedor (aparecem nos Termos e na Política de Privacidade).
  SELLER: { nome: '[SEU NOME OU RAZÃO SOCIAL]', doc: '[CPF/CNPJ]', cidade: '[CIDADE – UF]' },
  SUPPORT_EMAIL: '',
  SUPPORT_WHATSAPP: '' // só números, com DDI e DDD. Ex: 5588999999999
};
