import React from 'react';
import {Header} from './header';
import {Details} from './details';
import './index.scss';

export class ExpandablePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      firstName: "",
      lastName: "",
      luggagePrice: null
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  openPanel = () => {
    this.setState(state => {
      return {isOpen: !state.isOpen};
    });
  }

  selectLuggage = (event) => {
    this.setState({luggagePrice: +event.target.id});
  }

  render() {
    return (
      <div className="expandable-panel">
        <Header isOpen={this.state.isOpen} openPanel={this.openPanel} type={this.props.type} index={this.props.index}/>
        {this.state.isOpen && <div className="expandable-panel__details">
          <Details selectLuggage={this.selectLuggage} handleChange={this.handleChange}/>
        </div>}
      </div>
    );
  }
}