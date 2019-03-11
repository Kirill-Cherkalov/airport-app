import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Overlay = ({ isOpen, hideSidebar }) => (
  <div
    role="presentation"
    className={`overlay${isOpen ? ' overlay_opened' : ''}`}
    onClick={hideSidebar}
  />
);

Overlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hideSidebar: PropTypes.func.isRequired,
};

const Sidebar = ({ isOpen, hideSidebar, children }) => (
  <Fragment>
    <div className={`sidebar${isOpen ? ' sidebar_opened' : ''}`}>
      {children}
    </div>
    <Overlay isOpen={isOpen} hideSidebar={hideSidebar} />
  </Fragment>
);

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hideSidebar: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};


export default Sidebar;
