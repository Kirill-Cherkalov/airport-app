import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export const Overlay = ({ isOpen, onClick }) => (
  <div
    role="presentation"
    className={`overlay${isOpen ? ' overlay_opened' : ''}`}
    onClick={onClick}
  />
);

Overlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

const Sidebar = ({ isOpen, hideSidebar, children }) => (
  <Fragment>
    <div className={`sidebar${isOpen ? ' sidebar_opened' : ''}`}>
      {children}
    </div>
    <Overlay isOpen={isOpen} onClick={hideSidebar} />
  </Fragment>
);

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  hideSidebar: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};


export default Sidebar;
