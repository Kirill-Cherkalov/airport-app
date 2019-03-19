import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
// import Avatar from '@material-ui/core/Avatar';
// import WorkIcon from '@material-ui/icons/Work';
import fetchLuggageTypes from '../../../../../redux/data/luggage-types/actions';
import './index.scss';

class Luggage extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    luggageTypes: PropTypes.array.isRequired,
    fetchLuggageTypes: PropTypes.func.isRequired,
  };

  componentDidMount = () => this.props.fetchLuggageTypes();

  render() {
    return (
      <div className="luggage-list">
        {this.props.luggageTypes.map(({ kg, price }) => (
          <label htmlFor={price} key={Math.random()}>
            <Field
              id={price}
              name={`luggage + ${this.props.index}`}
              component="input"
              type="radio"
              value={price}
            />{' '}
            {kg} kg
          </label>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  luggageTypes: state.data.luggage.luggageTypes,
});

const mapDispatchToProps = dispatch => ({
  fetchLuggageTypes: () => dispatch(fetchLuggageTypes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Luggage);
