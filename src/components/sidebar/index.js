import React from 'react';
import './index.scss';

function Overlay({isOpen, hideSidebar}) {
  return (
    <div className={isOpen ? "overlay overlay_opened" : "overlay"} 
         onClick={hideSidebar}
    ></div>);
}

function Sidebar({isOpen}) {
  return <div className={isOpen ? "sidebar sidebar_opened" : "sidebar"}></div>;
}

export {Sidebar, Overlay};