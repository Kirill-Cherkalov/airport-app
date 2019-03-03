export const styles = theme => ({
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    backgroundColor: theme.palette.common.white,
    width: 250,
    [theme.breakpoints.up('sm')]: {
      width: 200,
    },
    [theme.breakpoints.up('md')]: {
      width: 250,
    },
    [theme.breakpoints.up('lg')]: {
      width: 280,
    },
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: 20
  },
});