/* eslint-disable max-len */
const validate = (values) => {
  const errors = {};
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
  } else if (values.departure < new Date()) {
    errors.departure = 'Please, choose another day';
  }

  if (!values.return) {
    errors.return = 'Required';
  } else if (values.return === values.departure) {
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
