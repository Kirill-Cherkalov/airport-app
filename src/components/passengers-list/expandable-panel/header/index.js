/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default function Header({ isOpen, openPanel, type, index }) {
  Header.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    openPanel: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  };

  return (
    <div className={`expandable-panel__header${isOpen ? ' opened' : ''}`} onClick={openPanel}>{index} {type}</div>
  );
}
