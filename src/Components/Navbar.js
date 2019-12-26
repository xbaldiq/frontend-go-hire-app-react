import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SvgIcon from '@material-ui/core/SvgIcon';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Logo from './logo.png';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import './styles/navbar.css';

export default class Navbar extends Component {

  

  render() {
    return (
      <>
        <CssBaseline />
        <AppBar position='static' className='appbar'>
          <Toolbar className='toolbar'>
            <img src={Logo} />
            <TextField
              className='searchbar'
              id='input-with-icon-textfield'
              label='Search'
              variant='outlined'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />

            <div className='navIcon'>
              <Button>
                <HomeIcon
                  color='primary'
                  fontSize='large'
                  className='homeIcon'
                />
              </Button>
              <Button>
                <AccountBoxIcon
                  color='primary'
                  fontSize='large'
                  className='accountIcon'
                />
                Username
              </Button>
              <Button onClick={() => {
                this.props.data.changeLoginStatus()
              }} >
                <MeetingRoomIcon color='primary' fontSize='large' />
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}
