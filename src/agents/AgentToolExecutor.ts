import type {AgentDefinition} from './agentRegistry';
import {toolRegistry} from './toolRegistry';
import {agentPolicyStore} from './AgentPolicyStore';
import {auditLog} from '../ai/auditLog';
import {provenanceLog} from '../ai/provenance';
export interface AgentToolCall {agent:AgentDefinition;toolId:string;input:unknown;}
export class AgentToolExecutor {async call(request:AgentToolCall){const tool=toolRegistry.get(request.toolId);if(!tool)throw new Error(`Tool not registered: ${request.toolId}`);if(!request.agent.tools.includes(request.toolId))throw new Error(`Agent ${request.agent.id} has not declared tool ${request.toolId}`);if(!agentPolicyStore.isAllowed(request.agent.id,request.toolId,tool.permission,request.agent.tools))throw new Error(`Permission denied: ${request.agent.id} -> ${request.toolId} (${tool.permission})`);auditLog.record({action:'agent.tool.call',actor:request.agent.id,target:request.toolId,details:{permission:tool.permission}});const result=await toolRegistry.call(request.toolId,request.input);provenanceLog.add({source:`tool:${request.toolId}`,agentId:request.agent.id,metadata:{permission:tool.permission}});return result;}}
export const agentToolExecutor=new AgentToolExecutor();
