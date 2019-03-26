const styles = theme => ({
  textField: {
    marginBottom: theme.spacing.unit,
    backgroundColor: theme.palette.common.white,
    width: 240,
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
    backgroundColor: theme.palette.common.white,
    marginBottom: theme.spacing.unit,
    width: 240,
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
    backgroundColor: theme.palette.common.white,
    width: 80,
    [theme.breakpoints.up('sm')]: {
      width: 70,
    },
    [theme.breakpoints.up('md')]: {
      width: 80,
    },
    [theme.breakpoints.up('lg')]: {
      width: 90,
    },
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: 20,
  },
});

export default styles;
