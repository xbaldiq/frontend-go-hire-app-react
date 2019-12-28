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
import Logo from './logo.png';
import LogoWhite from './arkademy.svg';
import './styles/Register.css';
import LoginPict from './loginPict.svg';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from 'react-bootstrap';

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
      'linear-gradient(108deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 17%, rgba(0,121,135,1) 94%)',
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
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      user_type: 'engineer',
      token: '',
      openSnackbar: false
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('Token')) {
      this.props.history.push('/');
    }
    console.log(localStorage.getItem('Token'));
  }

  handleOnChange({ key, target }) {
    this.setState({
      [target.name]: target.value
    });
    console.log();
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      register: {
        username: this.state.username,
        password: this.state.password
      },
      url: {
        engineer: `http://localhost:8000/login/engineer`,
        company: `http://localhost:8000/login/company`
      },
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if(!(this.state.username && this.state.password)){
      alert('Username dan password harus diisi')
      this.setState({openSnackbar: true})
    }
    else if (this.state.user_type === 'engineer') {
      axios
        .post(data.url.engineer, data.register, data.headers)
        .then(res => {
          this.setState({openSnackbar: true})
          console.log(res.data.data[0]);
          localStorage.setItem('Token', res.data.data[0].token);
          localStorage.setItem('UserId', res.data.data[0].id);
          localStorage.setItem('user_type', 'engineer');
          localStorage.setItem('username', res.data.data[0].username);
          
          this.props.history.push('/');
        })
        .catch(err => alert('error', err));
    } else if (this.state.user_type === 'company') {
      axios
        .post(data.url.company, data.register, data.headers)
        .then(res => {
          this.setState({openSnackbar: true})
          console.log(res.data.data[0]);
          localStorage.setItem('Token', res.data.data[0].token);
          localStorage.setItem('UserId', res.data.data[0].id);
          localStorage.setItem('user_type', 'company');
          localStorage.setItem('username', res.data.data[0].username);
          this.setState({openSnackbar: true})
          this.props.history.push('/');
        })
        .catch(err => {
          console.log(err);
          alert(err);
        });
    }
  }

  render() {
    const { classes } = this.props;
    const defaultType = 'Engineer';
    return (
      // <>
      // <Navbar />
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={this.state.openSnackbar}
          autoHideDuration={3000}
          onClose={(event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
            this.setState({ openSnackbar: false});
          }}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id='message-id'>Please enter Username and Password</span>}
        />
        <Grid item xs={false} sm={4} md={7} className={classes.background}>
          <img src={LogoWhite} className='logo' />
          <img src={LoginPict} className='loginPict' />
          <h1 className='slogan'>
            Hire expert freelancers for any job, online.
          </h1>
          <p className='slogan'>
            Millions of small businesses use Freelancer to turn their ideas into
            reality.
          </p>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <form
              className={classes.form}
              // onSubmit={this.handleSubmit}
              noValidate
            >
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='User'
                label='Username'
                name='username'
                autoComplete='username'
                autoFocus
                value={this.state.username}
                onChange={this.handleOnChange}
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
                value={this.state.password}
                onChange={this.handleOnChange}
              />

              <FormControl className={classes.formControl}>
                <InputLabel id='demo-simple-select-label'>Login as:</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  name='user_type'
                  value={this.state.user_type}
                  onChange={this.handleOnChange}
                >
                  <MenuItem value={'engineer'}>Engineer</MenuItem>
                  <MenuItem value={'company'}>Company</MenuItem>
                </Select>
              </FormControl>

              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                // onKeyPress={({ key, target }) => {
                //   if (key === 'Enter') {
                //     console.log('hello sign in');
                //   }
                // }}
                onClick={this.handleSubmit}
              >
                Sign In
              </Button>

              <Button
                fullWidth
                variant='contained'
                color='secondary'
                onClick={() => {
                  //login dulu trus navigasi
                  this.props.history.push('/register');
                }}
              >
                Register
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
      // </>
    );
  }
}

export default withStyles(styles)(Login);
