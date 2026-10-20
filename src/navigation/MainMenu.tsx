import React, { useState } from 'react';
import { MAIN_MENU_ROOT, type MainMenuItem } from './mainMenu';
import './main-menu.css';

export interface MainMenuProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
}

export function MainMenu({ activeRoute, onNavigate }: MainMenuProps) {
  const [open, setOpen] = useState(true);

  return (
    <nav className="main-menu" aria-label="AI Second Brain main navigation">
      <button className="main-menu__root" onClick={() => onNavigate(MAIN_MENU_ROOT.route)} aria-expanded={open}>
        <span className="main-menu__root-icon">{MAIN_MENU_ROOT.icon}</span>
        <span>AI SECOND BRAIN</span>
        <span className="main-menu__chevron">{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div className="main-menu__tree">
          {MAIN_MENU_ROOT.children?.map((item) => (
            <MenuItem key={item.id} item={item} activeRoute={activeRoute} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </nav>
  );
}

function MenuItem({ item, activeRoute, onNavigate }: { item: MainMenuItem; activeRoute: string; onNavigate: (route: string) => void }) {
  const active = item.route === activeRoute;
  return (
    <button className={`main-menu__item${active ? ' is-active' : ''}`} onClick={() => onNavigate(item.route)} aria-current={active ? 'page' : undefined}>
      <span className="main-menu__item-icon">{item.icon}</span>
      <span>{item.label}</span>
    </button>
  );
}
