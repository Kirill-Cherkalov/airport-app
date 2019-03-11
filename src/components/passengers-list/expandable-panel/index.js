import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Details from './details';
import './index.scss';

export default class ExpandablePanel extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      luggagePrice: null,
    };
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  openPanel = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  }

  selectLuggage = (event) => {
    this.setState({ luggagePrice: +event.target.id });
  }

  render() {
    return (
      <div className="expandable-panel">
        <Header isOpen={this.state.isOpen} openPanel={this.openPanel} type={this.props.type} index={this.props.index} />
        {this.state.isOpen && (
        <div className="expandable-panel__details">
          <Details selectLuggage={this.selectLuggage} handleChange={this.handleChange} />
        </div>
        )}
      </div>
    );
  }
}
