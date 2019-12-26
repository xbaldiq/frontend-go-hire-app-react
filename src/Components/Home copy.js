import React, { Component } from 'react';
import Navbar from './Navbar';
import Card from './Card';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.getProfileEngineer = this.getProfileEngineer.bind(this);
    this.getAllEngineer = this.getAllEngineer.bind(this);
  }

  state = {
    // loginStatus: false,
    token: localStorage.getItem('Token'),
    UserId: localStorage.getItem('UserId'),
    user_type: localStorage.getItem('user_type'),
    searchFilter: '',
    response: []
  };

  componentDidMount() {
    if (this.state.user_type === 'engineer') {
      this.getProfileEngineer();
    } else if (this.state.user_type === 'company') {
      this.getAllEngineer();
    }
  }

  // GetAll Engineer
  getAllEngineer = () => {
    axios
      .get('http://localhost:8000/engineer', {
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

    if (!this.state.token) {
      this.props.history.push('/login');
    }
    return (
      <>
        <Navbar
          data={{
            searchFilter: this.state.searchFilter,
            changeLoginStatus: this.changeLoginStatus.bind(this)
          }}
        />
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
