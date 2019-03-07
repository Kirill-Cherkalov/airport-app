import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

function Overlay({ isOpen, hideSidebar }) {
  Overlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    hideSidebar: PropTypes.func.isRequired,
  };

  return (
    <div
      role="presentation"
      className={`overlay${isOpen ? ' overlay_opened' : ''}`}
      onClick={hideSidebar}
    />
  );
}

function Sidebar({ isOpen, hideSidebar, children }) {
  Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    hideSidebar: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  };

  return (
    <Fragment>
      <div className={`sidebar${isOpen ? ' sidebar_opened' : ''}`}>
        {children}
      </div>
      <Overlay isOpen={isOpen} hideSidebar={hideSidebar} />
    </Fragment>
  );
}

export default Sidebar;
