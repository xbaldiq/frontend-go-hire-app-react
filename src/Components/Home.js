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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import NotificationsIcon from '@material-ui/icons/Notifications';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import SweetAlert from 'sweetalert-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './styles/navbar.css';
import './styles/sweetalert.css';

const MySwal = withReactContent(Swal);

export class Home extends Component {
  constructor(props) {
    super(props);

    this.getProfileEngineer = this.getProfileEngineer.bind(this);
    this.getAllEngineer = this.getAllEngineer.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.pagination = this.pagination.bind(this);
    this.handleClickOpenProfilePage = this.handleClickOpenProfilePage.bind(
      this
    );
    this.handleCloseProfilePage = this.handleCloseProfilePage.bind(this);
    this.getListProject = this.getListProject.bind(this);
    this.assignProject = this.assignProject.bind(this);
    this.handleProjectClick = this.handleProjectClick.bind(this);
    // this.projectAssigment = this.projectAssigment.bind(this)
  }

  pagination = (data, page, limit) => {
    let trimStart = (page - 1) * limit;
    let trimEnd = trimStart + limit;
    let trimmedData = data.slice(trimStart, trimEnd);

    let pages = Math.ceil(data.length / limit);

    return {
      trimmedResponse: trimmedData,
      pages: pages
    };
  };

  state = {
    // loginStatus: false,
    token: localStorage.getItem('Token'),
    UserId: localStorage.getItem('UserId'),
    user_type: localStorage.getItem('user_type'),
    username: localStorage.getItem('username'),
    search_by: 'name',
    sort_by: 'name',
    search: '',
    order: 'asc',
    name: '',
    response: [],
    total_page: [],
    page: 1,
    limit: 5,
    pagination_config: {},
    projectList: [],
    openProjectAssign: false,
    clickedId: '',
    clickedName: '',
    projectAssignOnClose: '',
    projectSelected: '',
    profileClicked: false
    // project_dialo:
  };

  componentDidMount() {
    if (this.state.user_type === 'engineer') {
      this.getProfileEngineer();
    } else if (this.state.user_type === 'company') {
      this.getAllEngineer({});
      this.getListProject();
    }
  }

  async handleOnChange({ target }) {
    await this.setState({
      [target.name]: target.value
    });
    this.getAllEngineer({});
  }

  getListProject = () => {
    const url = `http://localhost:8000/company/project`;

    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        // console.log(res.data.data)
        this.setState({ projectList: res.data.data });
      })
      .catch(err => alert('error', err));
  };

  // Assign Project
  assignProject = () => {
    console.log(this.state.projectSelected);
    const url = `http://localhost:8000/company/project/assign`;
    const data = {
      id_engineer: this.state.clickedId,
      id_company: this.state.UserId,
      project_item: this.state.projectSelected
    };
    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        alert('success assign');
      })
      .catch(err => alert('error', err));
  };

  // GetAll Engineer
  getAllEngineer = () => {
    const url2 = `http://localhost:8000/engineer?sort=${this.state.sort_by}&order=${this.state.order}&page=${this.state.page}&limit=${this.state.limit}&${this.state.search_by}=${this.state.search}`;

    // console.log(url2)
    axios
      .get(url2, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `.concat(this.state.token)
        }
      })
      .then(res => {
        // let data = JSON.parse(res.data[0])
        // console.log(res.data[0])
        this.setState({ pagination_config: res.data[0][0] });
        this.setState({ total_page: res.data[0][0].pagination });
        // console.log(res.data[0].total_page)
        // console.log(res.data[1]);
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
        // console.log(res)
        this.setState({ response: res.data.data });
        this.setState({ name: res.data.data[0].name})
        console.log(this.state.response);
      })
      .catch(err => alert('error', err));
  };

  // Logout
  changeLoginStatus = () => {
    this.setState({ token: '' });
    localStorage.clear();
  };

  handleClickOpenProfilePage = (id, name) => {
    this.setState({ clickedId: id, clickedName: name });
    this.setState({ profilePageOpen: true });
    // this.setState({ profileClicked: true });
  };

  handleCloseProfilePage = () => {
    this.setState({ profilePageOpen: false });
  };

  handleProjectClick = async value => {
    this.setState({ profilePageOpen: false });
    await this.setState({ projectSelected: value.project_name });
    this.assignProject();
  };

  render() {
    if (!this.state.token) {
      this.props.history.push('/login');
    }

    const pages = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
      <>
        <SweetAlert
          show={this.state.profileClicked}
          title={this.state.clickedName}
          showCancelButton
          text={
            this.state.user_type == 'company'
              ? `Skill: ${this.state.clickedSkill} \n Total Project Given: ${this.state.clickedTotalProject} \n Acceptance rate: ${this.state.clickedSuccessrate}% \n\n Hire?`
              : `Skill: ${this.state.clickedSkill} \n Total Project Given: ${this.state.clickedTotalProject} \n Acceptance rate: ${this.state.clickedSuccessrate}%`
          }
          onConfirm={event => {
            this.setState({ profileClicked: false });
            if (this.state.user_type == 'company') {
              this.handleClickOpenProfilePage();
            }
          }}
          onOutsideClick={e => {
            this.setState({ profileClicked: false });
          }}
          onCancel={() => {
            this.setState({ profileClicked: false });
          }}

          // onClose={() => this.setState({ profileClicked: false })}
        />

        {/* <ProjectDialog selectedValue={this.state.projectSelected} open={this.state.projectDialogOpen} onClose={this.state.projectDialogHandleClose} /> */}
        <Dialog
          open={this.state.profilePageOpen}
          onClose={this.handleCloseProfilePage}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {'Project to Assign'}
          </DialogTitle>
          <List>
            {this.state.projectList.map((item, id) => (
              // <ListItem button onClick={() => handleProjectClick(email)} key={email}>
              <ListItem
                button
                key={id}
                onClick={() => this.handleProjectClick(item)}
              >
                {/* <ListItem button key={id}> */}
                <ListItemText primary={item.project_name} />
              </ListItem>
            ))}
          </List>
          <DialogActions>
            <Button
              onClick={this.handleCloseProfilePage}
              color='primary'
              autoFocus
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

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
            />
            <FormControl style={{ paddingLeft: '2rem' }}>
              <InputLabel style={{ paddingLeft: '3rem' }}>Filter:</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                name='search_by'
                value={this.state.search_by}
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
                value={this.state.sort_by}
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
                value={this.state.limit}
                onChange={this.handleOnChange}
              >
                <MenuItem value={'5'}>5</MenuItem>
                <MenuItem value={'10'}>10</MenuItem>
                <MenuItem value={'20'}>20</MenuItem>
                <MenuItem value={'50'}>50</MenuItem>
              </Select>
            </FormControl>
            <div className='navIcon'>
              <Button>
                <SortIcon
                  color='primary'
                  fontSize='large'
                  className='homeIcon'
                  onClick={async () => {
                    (await this.state.order) === 'asc'
                      ? this.setState({ order: 'desc' })
                      : this.setState({ order: 'asc' });
                    this.getAllEngineer();
                  }}
                ></SortIcon>
                {this.state.order}
              </Button>
              <Button>
                <NotificationsIcon
                  color='primary'
                  fontSize='large'
                  className='homeIcon'
                />
              </Button>
              {/* <Button>
                <HomeIcon
                  color='primary'
                  fontSize='large'
                  className='homeIcon'
                />
              </Button> */}
              <Button>
                <AccountBoxIcon
                  color='primary'
                  fontSize='large'
                  className='accountIcon'
                />
                {this.state.name || this.state.username }
                {/* {this.state.username } */}
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
          justify='center'
          alignItems='center'
          padding='1rem'
          style={{ paddingTop: '1rem' }}
        >
          {/* {pages.map(item => { */}
          {this.state.total_page.map((item, id) => {
            return (
              <Button
                key={id}
                variant='contained'
                color='primary'
                onClick={async () => {
                  await this.setState({ page: item });
                  this.getAllEngineer();
                }}
              >
                {item}
              </Button>
            );
          })}
        </Grid>
        <Grid
          container
          direction='row'
          justify='space-evenly'
          alignItems='center'
          spacing={3}
        >
          {this.state.response.map(item => {
            // console.log(item);
            return (
              <Button
                onClick={() => {
                  this.setState({
                    clickedId: item.id,
                    clickedName: item.name,
                    clickedSkill: item.skill,
                    clickedTotalProject: item.total_project,
                    clickedSuccessrate: item.successrate,
                    profileClicked: true
                  });

                  // this.handleClickOpenProfilePage()
                }}
              >
                <Card
                  key={item.id}
                  name={item.name}
                  skill={item.skill}
                  total_project={item.total_project || '-'}
                  successrate={item.successrate || '0'}
                />
              </Button>
            );
          })}
        </Grid>
      </>
    );
  }
}
export default Home;
