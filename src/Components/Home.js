import React, { Component } from 'react';
import Card from './Card';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Logo from './logo.png';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import SortIcon from '@material-ui/icons/Sort';
import './styles/navbar.css';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.getProfileEngineer = this.getProfileEngineer.bind(this);
    this.getAllEngineer = this.getAllEngineer.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  state = {
    // loginStatus: false,
    token: localStorage.getItem('Token'),
    UserId: localStorage.getItem('UserId'),
    user_type: localStorage.getItem('user_type'),
    search: '',
    response: []
  };

  componentDidMount() {
    if (this.state.user_type === 'engineer') {
      this.getProfileEngineer();
    } else if (this.state.user_type === 'company') {
      this.getAllEngineer({});
    }
  }

  handleOnChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
    console.log();
  }

  // GetAll Engineer
  getAllEngineer = query => {
    let key = Object.keys(query);
    let val = query[key];

    const url2 = `http://localhost:8000/engineer?${key}=${val}`;
    const url = `http://localhost:8000/engineer?`;

    console.log(url2);

    axios
      .get(url2, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `.concat(this.state.token)
        }
      })
      .then(res => {
        console.log(res.data[1]);
        this.setState({ response: res.data[1] });
      })
      .catch(err => alert('error', err));
  };

  // Get One Engineer
  getProfileEngineer = () => {
    const data = {
      register: {
        username: this.state.username,
        password: this.state.password
      },
      url: {
        engineer: `http://localhost:8000/engineer`,
        company: `http://localhost:8000/company`
      },
      config: {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `.concat(this.state.token)
        }
      }
    };
    axios
      .get(data.url.engineer, data.config)
      .then(res => {
        this.setState({ response: res.data.data });
        console.log(this.state.response);
      })
      .catch(err => alert('error', err));
  };

  // Logout
  changeLoginStatus = () => {
    this.setState({ token: '' });
    localStorage.removeItem('Token');
  };

  render() {
    // this.getAllEngineer()
    // console.log(this.state.search)

    if (!this.state.token) {
      this.props.history.push('/login');
    }
    return (
      <>
        <AppBar position='static' className='appbar'>
          <Toolbar className='toolbar'>
            <img src={Logo} />
            <TextField
              className='searchbar'
              id='input-with-icon-textfield'
              label='Search'
              variant='outlined'
              name='search'
              value={this.state.search}
              onChange={this.handleOnChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              onKeyPress={({ key, target }) => {
                if (key === 'Enter') {
                  this.getAllEngineer({ name: target.value });
                  // console.log(target.value);
                }
              }}
            />
            <div className='navIcon'>
              <Button>
                <SortIcon
                  color='primary'
                  fontSize='large'
                  className='homeIcon'
                  onClick={() => {
                    this.getAllEngineer({ sort: 'asc' });
                  }}
                ></SortIcon>
              </Button>
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
              <Button
                onClick={() => {
                  this.changeLoginStatus();
                }}
              >
                <MeetingRoomIcon color='primary' fontSize='large' />
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <Grid
          container
          direction='row'
          justify='space-evenly'
          alignItems='center'
          spacing={3}
        >
          {this.state.response.map(item => {
            return <Card name={item.name} skill={item.skill} />;
          })}
        </Grid>
      </>
    );
  }
}
export default Home;
