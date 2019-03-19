import moment from 'moment';

const validate = (values) => {
  const errors = {};
  const departureDate = moment(values.departure).format('L');
  const returnDate = moment(values.return).format('L');
  const today = moment(new Date()).format('L');

  if (!values.from) {
    errors.from = 'Required';
  }

  if (!values.to) {
    errors.to = 'Required';
  } else if (values.to === values.from) {
    errors.to = 'Please, choose another country';
  }

  if (!values.departure) {
    errors.departure = 'Required';
  } else if (departureDate < today) {
    errors.departure = 'Please, choose another day';
  }

  if (!values.return) {
    errors.return = 'Required';
  } else if (returnDate <= departureDate) {
    errors.return = 'Please, choose another day';
  }

  if ((!values.adult || values.adult === '0') && (!values.child || values.child === '0') && (!values.infant || values.infant === '0')) {
    errors.adult = 'Required';
    errors.child = ' ';
    errors.infant = ' ';
  }

  return errors;
};

export default validate;
