import React from 'react';

import {MenuButton} from './button';
import {Sidebar} from './sidebar';
import {Menu} from './menu';

export function HeaderMenu(props) {
  return (
    <>
      <Menu className="header__menu" />
      <MenuButton showSidebar={props.showSidebar}/>
      <Sidebar isOpen={props.isOpen} hideSidebar={props.showSidebar} children={<Menu className="sidebar__menu"/>} />
    </>
  );
}
