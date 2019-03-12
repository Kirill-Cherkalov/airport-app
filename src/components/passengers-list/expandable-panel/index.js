import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Details from './details';
import './index.scss';

export default class ExpandablePanel extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  openPanel = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  }

  onSubmit = values => values;

  render() {
    return (
      <div className="expandable-panel">
        <Header isOpen={this.state.isOpen} openPanel={this.openPanel} index={this.props.index} />
        {/* {this.state.isOpen && ( */}
        <div className="expandable-panel__details">
          <Details i={this.props.index} handleChange={this.handleChange} />
        </div>
        {/* )} */}
      </div>
    );
  }
}
