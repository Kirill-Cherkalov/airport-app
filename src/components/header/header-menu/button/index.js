import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import './index.scss';

export default function MenuButton({ onClick }) {
  MenuButton.propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  return (
    <button type="button" className="header__button" onClick={onClick}>
      <MenuIcon />
    </button>
  );
}
