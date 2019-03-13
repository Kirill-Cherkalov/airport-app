/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default function Header({ isOpen, openPanel, index }) {
  Header.propTypes = {
    // isOpen: PropTypes.bool.isRequired,
    // openPanel: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  };

  return (
    // <div className={`expandable-panel__header${isOpen ? ' opened' : ''}`} onClick={openPanel}>{i} passenger</div>
    <div className='expandable-panel__header' onClick={openPanel}>{index + 1} passenger</div>
  );
}
