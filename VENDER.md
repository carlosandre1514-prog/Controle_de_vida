# Plano para vender com investimento zero

O plano parte de algo realista: **sem dinheiro para anúncio, quem vende é você, os seus clientes (pelos stories) e os afiliados**. Tudo aqui é gratuito. As plataformas só cobram uma porcentagem quando você vende.

## O produto

**Desafio 30 Dias · Meu Controle de Vida.** Os 3 primeiros dias são grátis, depois o acesso **vitalício custa R$ 27,90** (pagamento único, "de R$ 59,90").

Por que esse formato:
- **Pagamento único e barato vende por impulso.** Assinatura dá mais dinheiro a longo prazo, mas demora a convencer. Para começar rápido, o impulso ganha.
- **"Desafio de 30 dias" é um formato que já vende no Brasil.** As pessoas entendem na hora e tem começo, meio e fim.
- **Os 3 dias grátis fazem a pessoa sentir o valor antes de pagar.** No dia 4 ela já tem 3 quadradinhos verdes e não quer perder a sequência.
- **Cada cliente vira divulgação.** O botão "Postar meu dia nos stories" gera uma imagem com o endereço do app.
- **Custo por cliente perto de zero.** GitHub Pages e Cloudflare são grátis, e o Gemini tem cota gratuita.

## Dia 1: deixar tudo no ar (2 a 3 horas, R$ 0)

1. **Publicar o site:** GitHub → Settings → Pages → branch `main`. Seu link fica `https://SEU-USUARIO.github.io/Controle_de_vida/vendas.html`.
2. **Publicar o servidor:** siga a seção 2 do `README.md`. Sem ele a IA e a ativação não funcionam.
3. **Kiwify** (kiwify.com.br, grátis para criar conta):
   - Crie o produto "Desafio 30 Dias · Meu Controle de Vida", com pagamento único de R$ 27,90.
   - Entrega: "área de membros externa" ou só a página de obrigado com o link `SEU-APP/index.html?ativar=`.
   - Webhook: `https://SEU-WORKER.workers.dev/webhook/kiwify?plano=vitalicio`, e o token dele com `npx wrangler secret put KIWIFY_TOKEN`.
   - **Ative o programa de afiliados com 50% de comissão** (explicado mais abaixo).
   - Coloque o link do checkout em `config.js` → `OFFERS[0].link`.
4. **Sem Kiwify ainda?** Preencha `SUPPORT_WHATSAPP` em `config.js` e deixe o `link` vazio. O botão de compra abre o seu WhatsApp, o cliente paga no Pix e você libera pelo `admin.html` em 30 segundos.
5. Preencha seu nome e CPF em `config.js` (aparecem nos Termos).
6. **Faça uma compra teste** com o seu próprio e-mail e ative no app.

## Semana 1: as primeiras 10 vendas vêm de quem já te conhece

Não espere o algoritmo. Mande para os seus contatos hoje.

**Status do WhatsApp (todo dia por 7 dias):** poste a imagem do seu próprio "Dia X de 30", gerada pelo app.

**Mensagem individual** (não mande em massa, mande para 30 pessoas, uma por uma):
> Oi, [nome]! Criei um app de desafio de 30 dias pra quem quer entrar em forma: ele diz o que fazer em cada dia (água, comida, treino, sono). Estou fazendo e já estou no dia 5 😅 Os 3 primeiros dias são grátis, quer testar comigo? [link da vendas.html]

**Grupos** (família, faculdade, trabalho, academia):
> Gente, quem topa um desafio de 30 dias comigo? É um app que eu fiz: cada dia tem 5 tarefas simples e a gente posta o progresso. Começa grátis: [link]

**Dica:** quem começa junto com você vende para você. Crie um grupo "Desafio 30 Dias – turma de [mês]" e poste lá o seu dia todo dia.

## Semanas 1 a 4: conteúdo diário (TikTok, Reels, Shorts)

Um vídeo por dia, de 15 a 30 segundos, gravado no celular. Não precisa aparecer o rosto. **Poste o mesmo vídeo nas três redes.** Coloque o link na bio (`vendas.html`).

| # | Gancho (primeiros 2 segundos) | Conteúdo |
|---|---|---|
| 1 | "Dia 1 do desafio de 30 dias. Vem comigo?" | Mostra o app, as 5 tarefas e a foto do dia 1 |
| 2 | "Quanta água VOCÊ precisa beber?" | Peso × 35 ml, mostra o app calculando |
| 3 | "Pedi pra uma IA montar minha dieta" | Grava a tela gerando a dieta com gramas |
| 4 | "Treino de 15 minutos em casa, sem equipamento" | Treino do app + cronômetro do treino guiado |
| 5 | "Quantas calorias tem um prato feito?" | Registra arroz, feijão e frango no app |
| 6 | "Dia 7: o que mudou em 1 semana" | Sequência verde e peso |
| 7 | "3 coisas que te fazem desistir na 2ª semana" | Solução: missão diária e sequência |
| 8 | "Erro nº 1 de quem quer emagrecer: refri" | Mostra as calorias do refri no app |
| 9 | "Missão de hoje: 100 agachamentos" | Faça a missão do dia em vídeo |
| 10 | "Dia 15: metade do caminho" | Comparação de fotos |

Depois repita os formatos que tiverem mais visualizações. **Constância vale mais que qualidade:** 30 vídeos medianos vendem mais que 3 perfeitos.

**Bio do Instagram/TikTok:**
> Desafio 30 Dias 🏆 Uma missão por dia pra mudar corpo e rotina. Dia 1 grátis 👇

## Afiliados: o atalho para escalar sem gastar

Na Kiwify (e na Hotmart) qualquer pessoa pode se afiliar e vender seu produto ganhando comissão. **Você só paga quando vende.**

- Comissão: **50%**. Parece muito, mas é dinheiro que você não teria e não custa nada para produzir.
- Chame quem já fala com o seu público: personal trainers, nutricionistas recém-formados, perfis de "antes e depois", donos de academia de bairro.
- Mensagem para afiliados:
> Oi! Tenho um app de Desafio 30 Dias (fitness, com IA) e pago 50% de comissão por venda na Kiwify. O seu público combina muito. Posso te liberar acesso grátis pra você testar e mostrar?

Libere o acesso deles pelo `admin.html` (plano vitalício), de graça.

## Números para acompanhar (realistas)

- De quem **começa o desafio grátis**, algo como **3% a 10% compra** no dia 4 (a média de apps freemium vai de 2% a 5%; o formato de desafio costuma converter mais).
- Ou seja: **cerca de 100 a 300 pessoas começando para cada 10 vendas.**
- 10 vendas × R$ 27,90 ≈ **R$ 250 líquidos** (descontando a taxa da plataforma).
- O que mais pesa é **quantas pessoas chegam ao link**. Por isso o vídeo diário e os afiliados.

**Seja honesto com você mesmo:** não existe dinheiro garantido nem rápido para todo mundo. O que este plano faz é tirar o custo da equação: se não vender, você perdeu tempo, não dinheiro. Se um vídeo viralizar ou um afiliado grande entrar, o sistema já está pronto para vender sozinho, 24 horas por dia.

## Depois das primeiras 50 vendas

1. **Suba o preço** para R$ 37,90 e mantenha o "de R$ 59,90".
2. **Crie a oferta anual ou mensal** para quem quer acompanhamento contínuo: adicione em `OFFERS`.
3. **Colete depoimentos** (print do WhatsApp com autorização) e coloque na `vendas.html`.
4. **Publique na Play Store** com o Bubblewrap (TWA), pagando US$ 25 uma vez só. Dá mais credibilidade.

## Cuidados legais (não pule)

- Venda com **CPF** no começo (a Kiwify permite). Quando passar de uns R$ 2 a 3 mil por mês, abra um **MEI ou ME** com um contador.
- **Nunca prometa resultado** ("perca 10 kg"). Fale de rotina e hábito. Promessa de emagrecimento gera problema com o Procon e com a política das plataformas.
- Mantenha o aviso de que o app não substitui médico, nutricionista ou educador físico (já está no app e na página).
- Respeite a garantia de 7 dias (CDC).
