import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default function NotFoundPage() {
  return (
    <div className="not-found-page__background">
      <div className="not-found-page">
        <h1 className="not-found-page__main-header">
          Page not found
        </h1>
        <h3 className="not-found-page___secondary-header">
          We're sorry, we couldn't find the page you requested.
        </h3>
        <br />
        <br />
        <h1 className="not-found-page__proposal">
          You can try to find something
          <Link to="/search" className="not-found-page__proposal-link">
            here
          </Link>
        </h1>
      </div>
    </div>
  );
}
