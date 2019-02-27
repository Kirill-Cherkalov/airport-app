import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import './index.scss';

export function MenuButton(props) {
  return (
    <button className='header__button' onClick={props.showSidebar}>
      <MenuIcon />
    </button>
  );
}
