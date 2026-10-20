import React, { useMemo, useState } from 'react';
import { BUILD_TARGETS, type BuildTargetId } from './buildTargets';

export interface BuildTargetPanelProps {
  onBuild?: (targetId: BuildTargetId) => void;
}

export function BuildTargetPanel({ onBuild }: BuildTargetPanelProps) {
  const [platform, setPlatform] = useState('all');
  const [selected, setSelected] = useState<BuildTargetId>('web');
  const targets = useMemo(() => platform === 'all' ? BUILD_TARGETS : BUILD_TARGETS.filter((target) => target.platform === platform), [platform]);

  return (
    <section className="build-target-panel" aria-label="Build targets">
      <div className="build-target-toolbar">
        <select value={platform} onChange={(event) => setPlatform(event.target.value)} aria-label="Platform">
          <option value="all">All platforms</option>
          <option value="browser">Web</option>
          <option value="windows">Windows</option>
          <option value="macos">macOS</option>
          <option value="linux">Linux</option>
          <option value="android">Android</option>
          <option value="ios">iOS</option>
          <option value="desktop">Desktop</option>
          <option value="node">Node.js</option>
        </select>
      </div>
      <div className="build-target-grid">
        {targets.map((target) => (
          <button
            type="button"
            key={target.id}
            className={selected === target.id ? 'build-target active' : 'build-target'}
            onClick={() => setSelected(target.id)}
          >
            <strong>{target.name}</strong>
            <span>{target.artifact}</span>
            <small>{target.requiresNativeToolchain ? 'Native toolchain' : 'Browser/Node toolchain'}</small>
          </button>
        ))}
      </div>
      <div className="build-target-footer">
        <code>{BUILD_TARGETS.find((target) => target.id === selected)?.command}</code>
        <button type="button" onClick={() => onBuild?.(selected)}>Build selected target</button>
      </div>
    </section>
  );
}
