import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Logo from '../Components/styles/Pict/logo.png';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import SortIcon from '@material-ui/icons/Sort';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import './styles/Navbar.css';

export default class Navbar extends Component {

  render() {
    return (
      <>
        {/* <CssBaseline /> */}
        <AppBar position='static' className='appbar'>
          <Toolbar className='toolbar'>
            <img src={Logo} />
            <TextField
              className='searchbar'
              id='input-with-icon-textfield'
              label='Search'
              variant='outlined'
              name='search'
              value={this.props.search}
              onChange={this.handleOnChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
            <FormControl style={{ paddingLeft: '2rem' }}>
              <InputLabel style={{ paddingLeft: '3rem' }}>Filter:</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                name='search_by'
                value={this.props.search_by || 'Name'}
                onChange={this.handleOnChange}
              >
                <MenuItem value={'name'}>Name</MenuItem>
                <MenuItem value={'skill'}>Skill</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={{ paddingLeft: '2rem' }}>
              <InputLabel style={{ paddingLeft: '3rem' }}>Sort:</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                name='sort_by'
                value={this.props.sort_by || 'Name'}
                onChange={this.handleOnChange}
              >
                <MenuItem value={'name'}>Name</MenuItem>
                <MenuItem value={'skill'}>Skill</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={{ paddingLeft: '2rem' }}>
              <InputLabel style={{ paddingLeft: '3rem' }}>Item:</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                name='limit'
                value={this.props.limit || 5}
                onChange={this.handleOnChange}
              >
                <MenuItem value={'5'}>5</MenuItem>
                <MenuItem value={'10'}>10</MenuItem>
                <MenuItem value={'20'}>20</MenuItem>
                <MenuItem value={'50'}>50</MenuItem>
              </Select>
            </FormControl>
              <Button>
                <SortIcon
                  color='primary'
                  fontSize='large'
                  className='homeIcon'
                  onClick={async () => {
                    (await this.props.order) === 'asc'
                      ? this.setState({ order: 'desc' })
                      : this.setState({ order: 'asc' });
                    this.getAllEngineer();
                  }}
                ></SortIcon>
                {this.props.order || 'ASC'}
              </Button>
              {/* <Button>
                <NotificationsIcon
                  color='primary'
                  fontSize='large'
                  className='homeIcon'
                />
              </Button> */}
              <Button onClick={() => {
                this.props.profilePage();
              }}>
                <AccountBoxIcon
                  color='primary'
                  fontSize='large'
                  className='accountIcon'
                />
                {this.props.name || this.props.username}
              </Button>
              <Button
                onClick={() => {
                  this.props.logout();
                }}
              >
                <MeetingRoomIcon color='primary' fontSize='large' />
                Logout
              </Button>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}
