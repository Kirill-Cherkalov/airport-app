import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './index.scss';

export function Menu(props) {
  return (
    <div className={props.className} >
      <Link to="/search"><Button color="inherit">flights</Button></Link>
      <Link to="/flights-list"><Button color="inherit">tickets</Button></Link>
      <Link to="/passengers-list"><Button color="inherit">Passengers</Button></Link>
      <Link to="/"><Button color="inherit">about us</Button></Link>
      <Link to="/login"><Button>Login</Button></Link>
    </div>
  );
}
