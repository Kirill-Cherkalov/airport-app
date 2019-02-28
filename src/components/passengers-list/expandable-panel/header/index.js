import React from 'react';
import './index.scss';

export function Header({isOpen, openPanel, type, index}) {
  return (
    <div className={"expandable-panel__header" + (isOpen ? " opened" : "")} onClick={openPanel}>{index} {type}</div>
  );
}