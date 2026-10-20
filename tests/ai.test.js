import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/ai.js';
process.env.CARE360_AI_PILOT_ENABLED='true';
process.env.CARE360_ALLOWED_ORIGINS='https://care360apps.com';
const base={method:'POST',headers:{origin:'https://care360apps.com','content-type':'application/json'},body:{product:'patient',purpose:'education',question:'What is blood pressure?'}};
function res(){return {code:200,status(n){this.code=n;return this},setHeader(){return this},end(x){this.payload=JSON.parse(x)}}}
async function run(patch={}){const out=res();await handler({...base,...patch},out);return out}
test('GET denied',async()=>assert.equal((await run({method:'GET'})).code,405));
test('unapproved origin denied',async()=>assert.equal((await run({headers:{...base.headers,origin:'https://example.org'}})).code,403));
test('plain text denied',async()=>assert.equal((await run({headers:{...base.headers,'content-type':'text/plain'}})).code,415));
test('oversized body denied',async()=>assert.equal((await run({headers:{...base.headers,'content-length':'4000'}})).code,413));
test('HMS scope denied',async()=>assert.equal((await run({body:{...base.body,product:'hms'}})).code,400));
test('extra fields denied',async()=>assert.equal((await run({body:{...base.body,patientId:'123'}})).code,400));
test('emergency phrase intercepted',async()=>assert.equal((await run({body:{...base.body,question:'chest pain'}})).payload.escalation,'emergency'));
test('personal question refused',async()=>assert.equal((await run({body:{...base.body,question:'I have a headache'}})).payload.escalation,'human_review'));
