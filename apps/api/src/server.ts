import { createServer } from 'node:http';

const port = Number(process.env.PORT ?? 8787);
const ollama = process.env.OLLAMA_BASE_URL ?? 'http://127.0.0.1:11434';

const send = (res: any, status: number, data: unknown) => {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' });
  res.end(JSON.stringify(data));
};

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') { res.writeHead(204, { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'GET,POST,OPTIONS', 'access-control-allow-headers': 'content-type' }); return res.end(); }
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
  if (url.pathname === '/api/health') return send(res, 200, { ok: true, service: 'ai-second-brain-api', version: '0.1.0' });
  if (url.pathname === '/api/ollama/models') {
    try { const r = await fetch(`${ollama}/api/tags`); return send(res, r.status, await r.json()); }
    catch { return send(res, 503, { ok: false, error: 'Ollama unavailable', endpoint: ollama }); }
  }
  if (url.pathname === '/api/ollama/chat' && req.method === 'POST') {
    let body = ''; for await (const chunk of req) body += chunk;
    try {
      const payload = JSON.parse(body || '{}');
      const r = await fetch(`${ollama}/api/chat`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ model: payload.model, messages: payload.messages ?? [], stream: false }) });
      return send(res, r.status, await r.json());
    } catch { return send(res, 503, { ok: false, error: 'Unable to reach Ollama' }); }
  }
  if (url.pathname === '/api/blueprints/sample') return send(res, 200, { id: 'BLUEPRINT-00001', name: 'HelloProgram', target: 'python', nodes: [{ id: 'NODE-00001', type: 'event', name: 'Start' }, { id: 'NODE-00002', type: 'function', name: 'print' }, { id: 'NODE-00003', type: 'return', name: 'Return' }], edges: [{ from: 'NODE-00001', to: 'NODE-00002' }, { from: 'NODE-00002', to: 'NODE-00003' }] });
  send(res, 404, { error: 'Not found' });
});

server.listen(port, '127.0.0.1', () => console.log(`AI Second Brain API listening on http://127.0.0.1:${port}`));
