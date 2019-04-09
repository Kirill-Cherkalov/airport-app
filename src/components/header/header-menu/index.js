import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import MenuButton from './button';
import Sidebar from './sidebar';
import Menu from './menu';

export default function HeaderMenu(props) {
  HeaderMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    showSidebar: PropTypes.func.isRequired,
  };

  return (
    <Fragment>
      <Menu className="header__menu" />
      <MenuButton onClick={props.showSidebar} />
      <Sidebar isOpen={props.isOpen} hideSidebar={props.showSidebar}>
        <Menu className="sidebar__menu" onClick={props.showSidebar} />
      </Sidebar>
    </Fragment>
  );
}
