import type {BrainScriptFunction, BrainScriptProgram, BrainScriptStatement, BrainScriptType} from './brainscript';

export interface BrainScriptDiagnostic { severity: 'error'|'warning'; message: string; symbol?: string; }

export class BrainScriptTypeChecker {
  check(program: BrainScriptProgram): BrainScriptDiagnostic[] {
    const diagnostics: BrainScriptDiagnostic[] = [];
    const variables = new Map<string, BrainScriptType>();
    for (const variable of program.variables) {
      if (variables.has(variable.name)) diagnostics.push({severity:'error', message:`Duplicate variable: ${variable.name}`, symbol: variable.name});
      variables.set(variable.name, variable.type ?? 'any');
    }
    for (const fn of program.functions) this.checkFunction(fn, variables, diagnostics);
    for (const statement of program.statements) this.checkStatement(statement, variables, diagnostics);
    return diagnostics;
  }

  private checkFunction(fn: BrainScriptFunction, globals: Map<string, BrainScriptType>, diagnostics: BrainScriptDiagnostic[]): void {
    const variables = new Map(globals);
    for (const parameter of fn.parameters) {
      if (variables.has(parameter.name)) diagnostics.push({severity:'warning', message:`Parameter shadows variable: ${parameter.name}`, symbol: parameter.name});
      variables.set(parameter.name, parameter.type);
    }
    for (const statement of fn.body) this.checkStatement(statement, variables, diagnostics);
  }

  private checkStatement(statement: BrainScriptStatement, variables: Map<string, BrainScriptType>, diagnostics: BrainScriptDiagnostic[]): void {
    if (statement.variable) variables.set(statement.variable.name, statement.variable.type ?? 'any');
    if (statement.expression) {
      const identifiers = statement.expression.match(/[A-Za-z_$][\w$]*/g) ?? [];
      for (const identifier of identifiers) {
        if (['true','false','null','undefined'].includes(identifier)) continue;
        if (/^\d+$/.test(identifier)) continue;
        if (!variables.has(identifier) && !['Math','console','String','Number','Boolean','Array','Object'].includes(identifier)) {
          diagnostics.push({severity:'warning', message:`Unknown identifier: ${identifier}`, symbol: identifier});
        }
      }
    }
    for (const child of statement.body ?? []) this.checkStatement(child, variables, diagnostics);
    for (const child of statement.elseBody ?? []) this.checkStatement(child, variables, diagnostics);
  }
}

export const brainScriptTypeChecker = new BrainScriptTypeChecker();
