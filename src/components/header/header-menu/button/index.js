import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import './index.scss';

export default function MenuButton(props) {
  MenuButton.propTypes = {
    clicked: PropTypes.func.isRequired,
  };

  return (
    <button type="button" className="header__button" onClick={props.clicked}>
      <MenuIcon />
    </button>
  );
}
