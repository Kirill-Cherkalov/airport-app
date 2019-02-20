import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import './index.scss';

class MenuButton extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     isOpen: false
  //   }
  // }

  render() {
    return (
      <div>
        <button className='header__button' onClick={this.props.showSidebar}>
          <MenuIcon />
        </button>
      </div>
    );
  }
}

export default MenuButton;