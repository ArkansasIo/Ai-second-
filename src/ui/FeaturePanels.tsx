import React from 'react';
import { AIBinderControlCenter } from '../binder-ui/AIBinderControlCenter';
import { BrainLLMControlCenter } from '../brainllm/BrainLLMControlCenter';
import { AgentPermissionsPanel } from '../agents/AgentPermissionsPanel';
import { PluginControlCenter } from '../plugins/PluginControlCenter';
import { WorkforceControlCenter } from '../workforce/WorkforceControlCenter';
import { MemoryControlCenter } from '../memory/MemoryControlCenter';
import './control-center.css';

export function FeaturePanels() {
  return <><AIBinderControlCenter /><BrainLLMControlCenter /><AgentPermissionsPanel /><PluginControlCenter /><WorkforceControlCenter /><MemoryControlCenter /></>;
}
