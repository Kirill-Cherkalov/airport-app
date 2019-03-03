export const validate = values => {
  const errors = {};
  if (!values.from) {
    errors.from = "Required";
  }
  if (!values.to) {
    errors.to = "Required";
  } else if (values.to === values.from) {
    errors.to = "Please, choose another country";
  }
  if (!values.departure) {
    errors.departure = "Required";
  } else if (values.departure < new Date()) {
    errors.departure = "Please, choose another day";
  }
  if (!values.return) {
    errors.return = "Required";
  }
  return errors;
};