import React from 'react';
import {BrainLLMControlCenter} from '../brainllm/BrainLLMControlCenter';
import {AgentPermissionsPanel} from '../agents/AgentPermissionsPanel';
import {PluginControlCenter} from '../plugins/PluginControlCenter';
import {WorkforceControlCenter} from '../workforce/WorkforceControlCenter';
import './control-center.css';
export function FeaturePanels(){return <><BrainLLMControlCenter/><AgentPermissionsPanel/><PluginControlCenter/><WorkforceControlCenter/></>}
