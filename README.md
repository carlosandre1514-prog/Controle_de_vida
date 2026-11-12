# Meu Controle de Vida

App web instalável (PWA) para controlar alimentação, água, treino, sono, higiene, peso e caminhadas, com dieta e treino gerados por IA. Funciona offline e é vendido no modelo **freemium**: grátis para sempre no básico, com assinatura **Premium**.

| Arquivo | O que é |
|---|---|
| `index.html` | O app |
| `config.js` | **Preços, links de pagamento e seus dados. É o único arquivo que você precisa editar para vender.** |
| `vendas.html` | Página de vendas (é o link que você divulga) |
| `termos.html`, `privacidade.html` | Termos de uso e Política de Privacidade (LGPD) |
| `admin.html` | Painel para liberar o Premium manualmente (vendas por Pix direto) |
| `worker/` | Servidor na Cloudflare: IA, licenças e webhooks de pagamento |
| `sw.js`, `manifest.webmanifest`, `icon*` | Funcionamento offline e instalação |

## Modelo de negócio

| | Grátis | Premium |
|---|---|---|
| Registros do dia (comida, água, treino, sono, higiene, peso, GPS) | ✅ | ✅ |
| Estatísticas | 7 dias | 30, 90 e 365 dias |
| Dieta e treino com IA | 3 gerações de teste | 30 por dia |
| Treino guiado | — | ✅ |
| Fotos de evolução | — | ✅ |

- Todo usuário novo ganha **7 dias de Premium grátis** (sem cartão). Depois disso, quem quiser continuar com a IA e os extras assina.
- Preços sugeridos: **R$ 9,90/mês** ou **R$ 59,90/ano** (equivale a R$ 4,99/mês). Mude em `config.js`.
- Custo por usuário: perto de zero. A Cloudflare tem plano gratuito generoso e o Gemini Flash custa frações de centavo por geração.

## Passo a passo para começar a vender

### 1. Publicar o app (grátis)
1. No GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / root**.
2. O app fica em `https://SEU-USUARIO.github.io/Controle_de_vida/` e a página de vendas em `.../vendas.html`.
3. (Opcional, recomendado) Compre um domínio `.com.br` (~R$ 40/ano no registro.br) e aponte para o GitHub Pages ou para o Cloudflare Pages. Domínio próprio passa mais confiança na hora da venda.

### 2. Publicar o servidor (Cloudflare Worker)
No computador, com Node instalado:
```bash
cd worker
npx wrangler login
npx wrangler kv namespace create LIC        # copie o id e cole em wrangler.toml
npx wrangler secret put GEMINI_API_KEY      # chave do Google AI Studio
npx wrangler secret put TOKEN_SECRET        # qualquer texto aleatório longo
npx wrangler secret put ADMIN_KEY           # senha do painel admin
npx wrangler deploy
```
- Em `wrangler.toml`, `ALLOWED_ORIGINS` precisa ser o endereço onde o app está publicado (ex: `https://seuusuario.github.io`), senão o servidor recusa os pedidos.
- O `name` em `wrangler.toml` é o do Worker que já existe (`proud-sea-aab5`). O deploy **substitui** o código antigo, que não está neste repositório. Se preferir um Worker novo, mude o `name` e atualize `API` em `config.js`.

### 3. Criar o produto na plataforma de pagamento
Recomendo **Kiwify** ou **Hotmart**: elas cuidam de Pix, cartão, boleto, nota fiscal, recorrência e reembolso.

1. Crie o produto como **assinatura**, com uma oferta mensal e outra anual.
2. Copie os links de checkout para `CHECKOUT` em `config.js`.
3. Cadastre o webhook (**um por oferta**, com o plano na URL):
   - Kiwify: `https://SEU-WORKER.workers.dev/webhook/kiwify?plano=anual`. Copie o token do webhook e rode `npx wrangler secret put KIWIFY_TOKEN`.
   - Hotmart: `https://SEU-WORKER.workers.dev/webhook/hotmart?plano=anual`. Copie o hottok e rode `npx wrangler secret put HOTMART_HOTTOK`.
4. Na página de obrigado da plataforma, coloque o link `https://SEU-APP/index.html?ativar=` para o cliente cair direto na tela de ativação.
5. **Teste com uma compra real de valor baixo** (ou com o botão de teste de webhook) e confira no `admin.html` se o e-mail apareceu. O formato dos webhooks foi implementado conforme a documentação pública das plataformas, mas confirme com um evento real antes de divulgar.

### 4. Preencher seus dados
Em `config.js`: nome ou razão social, CPF/CNPJ, cidade, e-mail ou WhatsApp de suporte. Esses dados aparecem nos Termos e na Privacidade, e o CDC exige que o vendedor seja identificável.

### 5. Divulgar
- Divulgue o link da `vendas.html` no Instagram, TikTok, grupos e status do WhatsApp.
- Vídeos curtos mostrando "a IA montou minha dieta em 20 segundos" costumam converter bem.
- Ofereça o plano anual como principal: ele traz o dinheiro adiantado e menos cancelamentos.

## Como o cliente ativa
Ele compra → abre o app → **Perfil → Premium → Já comprei: ativar** → digita o e-mail da compra. O Premium vale para até 3 aparelhos. Reembolso ou chargeback desativam o Premium sozinhos, e a renovação estende a validade.

Venda manual por Pix: abra `admin.html`, digite a senha `ADMIN_KEY`, o e-mail do cliente e o plano, e toque em **Liberar**.

## Antes de vender: checklist
- [ ] Abrir **MEI** (gratuito no gov.br) para emitir nota e recolher imposto. Em MEI, "desenvolvimento de programas" pode não ser permitido como ocupação: confira com um contador ou use as plataformas (Kiwify/Hotmart) como intermediárias.
- [ ] Revisar `termos.html` e `privacidade.html` com um advogado. São um bom ponto de partida, não um parecer jurídico.
- [ ] Testar o fluxo completo de compra, ativação e reembolso.
- [ ] Fazer o próprio backup e testar a importação.

## Limitações conhecidas (honestas)
- O bloqueio de treino guiado, fotos e estatísticas é feito no aparelho. Uma pessoa técnica consegue burlar isso. A IA, que é o que custa dinheiro, é protegida no servidor.
- Os dados do usuário ficam no aparelho. Sem backup, trocar de celular apaga tudo. Sincronização na nuvem é a próxima melhoria natural para o Premium.
- O PIN da área privada é uma trava leve, não criptografia.
- Para vender na Play Store, dá para empacotar este PWA com o **Bubblewrap/TWA** (taxa única de US$ 25). Na App Store é mais difícil, e a Apple exige o sistema de pagamento dela para assinaturas dentro do app.
