import {describe,it,expect} from 'vitest';
import {lex,parse} from '../src/scripting/language/lexer';
describe('BrainScript lexer/parser',()=>{it('tokenizes keywords',()=>expect(lex('agent Demo').tokens.map(t=>t.value)).toContain('agent'));it('parses variables',()=>expect(parse('let answer = 42;').program.variables[0]).toMatchObject({name:'answer',value:'42',constant:false}));});
