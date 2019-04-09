import React from 'react';
import PropTypes from 'prop-types';
import { FaUser } from 'react-icons/fa';
import './index.scss';

export default function Header({ index }) {
  Header.propTypes = {
    index: PropTypes.number.isRequired,
  };

  return (
    <div className="expandable-panel__header">
      <FaUser className="expandable-panel__header-icon" />
      <span className="expandable-panel__header-text">{index + 1} passenger</span>
    </div>
  );
}
