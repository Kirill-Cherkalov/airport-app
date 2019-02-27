import React from 'react';
import './index.scss';

function Overlay({isOpen, hideSidebar}) {
  return (
    <div 
      className={"overlay" + (isOpen ? " overlay_opened" : "")}
      onClick={hideSidebar}
    ></div>);
}

function Sidebar({isOpen, hideSidebar, children}) {
  return (
    <>
      <div className={"sidebar" + (isOpen ? " sidebar_opened" : "")}>
        {children}
      </div>
      <Overlay isOpen={isOpen} hideSidebar={hideSidebar}/>
    </>
  );
}

export {Sidebar};