// Prepara a Cloudflare antes de publicar o servidor:
// - descobre o ID da conta
// - encontra (ou cria) o banco KV "mcv-LIC"
// - escreve o ID do banco no worker/wrangler.toml
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';

const token = process.env.CLOUDFLARE_API_TOKEN;
if (!token) {
  console.error('::error::Falta o segredo CLOUDFLARE_API_TOKEN (GitHub → Settings → Secrets and variables → Actions).');
  process.exit(1);
}
const api = async (path, init = {}) => {
  const r = await fetch('https://api.cloudflare.com/client/v4' + path, {
    ...init,
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json', ...(init.headers || {}) },
  });
  const j = await r.json().catch(() => ({}));
  if (!j.success) {
    console.error('::error::Cloudflare recusou ' + path + ': ' + JSON.stringify(j.errors || j));
    process.exit(1);
  }
  return j.result;
};

let account = process.env.CLOUDFLARE_ACCOUNT_ID;
if (!account) {
  const accs = await api('/accounts?per_page=50');
  if (!accs.length) { console.error('::error::O token não tem acesso a nenhuma conta.'); process.exit(1); }
  account = accs[0].id;
  console.log('Conta Cloudflare:', accs[0].name);
}

const TITLE = 'mcv-LIC';
const list = await api(`/accounts/${account}/storage/kv/namespaces?per_page=100`);
let ns = list.find(n => n.title === TITLE);
if (!ns) {
  ns = await api(`/accounts/${account}/storage/kv/namespaces`, { method: 'POST', body: JSON.stringify({ title: TITLE }) });
  console.log('Banco KV criado:', TITLE);
} else {
  console.log('Banco KV encontrado:', TITLE);
}

const toml = 'worker/wrangler.toml';
const src = readFileSync(toml, 'utf8').replace(/^id = ".*"$/m, `id = "${ns.id}"`);
writeFileSync(toml, src);
appendFileSync(process.env.GITHUB_ENV, `CLOUDFLARE_ACCOUNT_ID=${account}\n`);
