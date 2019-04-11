const styles = theme => ({
  textField: {
    marginBottom: theme.spacing.unit,
    marginRight: 10,
    width: 200,
    [theme.breakpoints.up('sm')]: {
      width: 210,
    },
    [theme.breakpoints.up('md')]: {
      width: 240,
    },
    [theme.breakpoints.up('lg')]: {
      width: 270,
    },
  },

  selectField: {
    marginBottom: theme.spacing.unit,
    marginRight: 10,
    width: 200,
    [theme.breakpoints.up('sm')]: {
      width: 210,
    },
    [theme.breakpoints.up('md')]: {
      width: 240,
    },
    [theme.breakpoints.up('lg')]: {
      width: 270,
    },
  },

  passengers: {
    marginBottom: theme.spacing.unit,
    marginRight: 10,
    width: 200,
    [theme.breakpoints.up('sm')]: {
      width: 210,
    },
    [theme.breakpoints.up('md')]: {
      width: 240,
    },
    [theme.breakpoints.up('lg')]: {
      width: 270,
    },
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    marginTop: 10,
  },
});

export default styles;
