import React, { Component } from 'react';
import Navbar from './Navbar';
import Card from './Card';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import './Styles/HomeEngineer.css';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { getProjectList } from '../Redux/Actions/Engineer/engineerProjectList';
import { getEngineerProfile } from '../Redux/Actions/Engineer/engineerProfile';
import { responseProject } from '../Redux/Actions/Engineer/responseProject';

class HomeEngineer extends Component {
  constructor() {
    super();
    this.handleStatusOnClick = this.handleStatusOnClick.bind(this);
  }

  state = {
    token: localStorage.getItem('Token'),
    UserId: localStorage.getItem('UserId'),
    user_type: localStorage.getItem('user_type'),
    username: localStorage.getItem('username'),
    engReceivedProject: [],
    name: ''
  };

  componentDidMount = async () => {
    await this.props.dispatch(getProjectList(this.state.UserId));
    await this.props.dispatch(getEngineerProfile(this.state.token));
  };

  logout = () => {
    this.setState({ token: '' });
    localStorage.clear();
  };

  profilePage = () => {
    this.props.history.push('/engineer/profile');
  };


  handleStatusOnClick = async (e, name, status) => {  
    await this.props.dispatch(responseProject({id: this.state.UserId, name_project:name, status_project:status }));
    await this.props.dispatch(getProjectList(this.state.UserId));
  };

  render() {

    const { engineerProfile } = this.props.engineerProfile;

    if (!this.state.token) {
      this.props.history.push('/login');
    }

    return (
      <>
        <CssBaseline />
        <Navbar
          name={engineerProfile.name}
          logout={this.logout}
          profilePage={this.profilePage.bind(this)}
        />

        {/* <Grid container direction='column' justify="space-around" alignItems='center' sm={12}> */}
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          spacing={3}
          style={{paddingTop: '1.5rem'}}
        > 
          <Grid item sm={6}>
            <TableContainer className='table-container' component={Paper}>
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>no</TableCell>
                    <TableCell align='left'>Project Name</TableCell>
                    <TableCell align='right'>Company</TableCell>
                    <TableCell align='right'>Status</TableCell>
                    <TableCell align='right'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.engineerProjectList.engineerProjectList.map(
                    (project, index) => (
                      <TableRow key={index}>
                        <TableCell component='th' scope='row'>
                          {index + 1}
                        </TableCell>
                        <TableCell>{project.project}</TableCell>
                        <TableCell align='right'>{project.company}</TableCell>
                        <TableCell align='right'>{project.status}</TableCell>
                        <TableCell align='right'>
                          {project.status === 'success' ||
                          project.status === 'failed' ||
                          project.status === 'rejected' ? (
                            ''
                          ) : (
                            <>
                              <Button
                                onClick={
                                  project.status === 'ongoing'
                                    ? e => {
                                        this.handleStatusOnClick(
                                          e,
                                          project.project,
                                          'success'
                                        );
                                      }
                                    : e => {
                                        this.handleStatusOnClick(
                                          e,
                                          project.project,
                                          'ongoing'
                                        );
                                      }
                                }
                              >
                                <ControlPointIcon
                                  fontSize='large'
                                  htmlColor='green'
                                />
                              </Button>
                              <Button
                                onClick={
                                  project.status === 'ongoing'
                                    ? e => {
                                        this.handleStatusOnClick(
                                          e,
                                          project.project,
                                          'failed'
                                        );
                                      }
                                    : e => {
                                        this.handleStatusOnClick(
                                          e,
                                          project.project,
                                          'rejected'
                                        );
                                      }
                                }
                              >
                                <NotInterestedIcon
                                  fontSize='large'
                                  htmlColor='red'
                                />
                              </Button>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item sm={3}>
            <Card
              key={engineerProfile.id || ''}
              name={engineerProfile.name || ''}
              description={engineerProfile.description || ''}
              skill={engineerProfile.skill || ''}
              total_project={engineerProfile.total_project || '-'}
              successrate={engineerProfile.successrate || '0'}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    engineerProjectList: state.engineerProjectList,
    engineerProfile: state.engineerProfile
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     getProject: () => dispatch({type:'ENG_GET_PROJECT_LIST'}),
//     getProfileEngineer: () => dispatch({type:'ENG_GET_PROFILE'}),
//     addValue: () => dispatch({ type: 'INCREMENT_VALUE' })
//   };
// };

export default connect(mapStateToProps)(HomeEngineer);
