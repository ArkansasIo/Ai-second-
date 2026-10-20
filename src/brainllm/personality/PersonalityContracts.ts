export type PersonalityId='balanced'|'analyst'|'teacher'|'engineer'|'researcher'|'creative'|'guardian'|'executive';
export type PersonalityTrait='curiosity'|'precision'|'creativity'|'empathy'|'skepticism'|'verbosity'|'initiative'|'caution'|'humor'|'formality';
export interface PersonalityTraitVector{curiosity:number;precision:number;creativity:number;empathy:number;skepticism:number;verbosity:number;initiative:number;caution:number;humor:number;formality:number}
export interface PersonalityModule{id:PersonalityId;name:string;description:string;traits:PersonalityTraitVector;systemDirectives:string[];preferredEngines:string[];responseStyle:{tone:'neutral'|'warm'|'technical'|'creative'|'executive';structure:'concise'|'balanced'|'detailed'};enabled:boolean;version:string}
export interface PersonalityContext{module:PersonalityModule;task:string;constraints?:string[]}
export const clampTrait=(value:number)=>Math.max(0,Math.min(1,value));
export function normalizeTraits(traits:PersonalityTraitVector):PersonalityTraitVector{return Object.fromEntries(Object.entries(traits).map(([key,value])=>[key,clampTrait(Number(value))])) as PersonalityTraitVector}
