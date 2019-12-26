import React, { useState, Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Navbar from './Navbar';
import Image from 'material-ui-image';
import Logo from './logo.png'
import LoginPict from './loginPict.svg'



const styles = theme => ({
  root: {
    height: '100vh'
  },
  background: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    // backgroundRepeat: 'no-repeat',
    // backgroundColor:
    //   theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    // backgroundColor: 'orange',
    // background: rgb(220,17,130),
    background:
      'linear-gradient(90deg, rgba(0,196,242,1) 0%, rgba(64,0,255,1) 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
    // flexWarp: 'wrap'
  },
  logo: {
    imageStyle: { width: '50%', height: '50%' }
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  divider: {
    borderTop: '1px solid red'
  }
});

class Login extends Component {
  render() {
    const { classes } = this.props;
    return (
      // <>
      // <Navbar />
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        
        {/* <Grid item xs={false} sm={4} md={7} className={classes.background}> */}
        <Grid item xs={false} sm={4} md={7} className={classes.background}>
        <img src={Logo} />
        
          {/* <div>
            <Image src='http://loremflickr.com/300/200/' className={classes.logo} />
          </div> */}
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='User'
                label='Username'
                name='text'
                autoComplete='username'
                autoFocus
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onKeyPress={({ key, target }) => {
                  if (key === 'Enter') {
                    console.log('hello');
                  }
                }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='#' variant='body2'>
                    {'Register here'}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
      // </>
    );
  }
}

export default withStyles(styles)(Login);
