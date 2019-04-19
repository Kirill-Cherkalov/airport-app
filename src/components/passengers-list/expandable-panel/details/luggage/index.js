import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
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
        {this.props.luggageTypes.map(({ kg, price }, index) => (
          <div key={index} className="luggage-list__checkbox">
            <div className={`image${kg} image${kg}_active`} />
            <label htmlFor={price} key={Math.random()} className={`luggage-list__label luggage-list__label_${kg}`}>
              <Field
                id={price}
                name={`luggage${this.props.index}`}
                component="input"
                type="radio"
                value={`${price}`}
              />{' '}
              <div className="luggage-list__kg">{`${kg === 0 ? 'no baggage' : `kg ${kg}`}`}</div>
              <div className="luggage-list__price">{`${price === 0 ? 'free' : `$ ${price}`}`}</div>
            </label>
          </div>
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
