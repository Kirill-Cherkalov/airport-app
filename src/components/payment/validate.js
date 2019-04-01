const validate = (values) => {
  const errors = {};

  if (!values.number) {
    errors.number = 'Please add the card number';
  }

  if (!values.name) {
    errors.name = 'Please ass the cardholder name';
  }

  if (!values.month) {
    errors.month = 'Required';
  }

  if (!values.year) {
    
    errors.year = 'Required';
  }

  if (!values.code) {
    errors.code = 'Please add CVC2/CVV number';
  }

  return errors;
};

export default validate;
