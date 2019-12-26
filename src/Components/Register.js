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

const styles = theme => ({
  root: {
    height: '100vh'
  },
  background: {
    background:
      'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(86,0,135,1) 53%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      user_type: 'engineer',
      isRegistered: false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('Token') && this.state.isRegistered===true ) {
      this.props.history.push('/');
    }
    console.log(localStorage.getItem('Token'));
  }

  handleOnChange({ target }) {
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
        engineer: `http://localhost:8000/register/engineer`,
        company: `http://localhost:8000/register/company`
      },
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (this.state.user_type === 'engineer') {
      axios.post(data.url.engineer, data.register, data.headers).then(res => {
        alert('Sukses registrasi sebagai Engineer');
        this.setState({ isRegistered : true });
      });
    } else if (this.state.user_type === 'company') {
      axios.post(data.url.company, data.register).then(res => {
        alert('Sukses registrasi sebagai Company');
        this.setState({isRegistered : true});
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
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
              Register Account
            </Typography>
            <form
              className={classes.form}
              onSubmit={this.handleSubmit}
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
                value={this.state.password}
                onChange={this.handleOnChange}
              />

              <FormControl className={classes.formControl}>
                <InputLabel id='demo-simple-select-label'>
                  Register as:
                </InputLabel>
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
                //     console.log('hello register');
                //   }
                // }}
                // onClick= {(e) => {
                //   console.log('tes button')
                // }}
              >
                Register
              </Button>
              <Button
                fullWidth
                variant='contained'
                color='secondary'
                onClick={() => {
                  //login dulu trus navigasi
                  this.props.history.push('/login');
                }}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Register);
