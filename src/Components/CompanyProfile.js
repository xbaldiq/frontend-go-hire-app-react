import React, { Component } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { getAssignedProject } from '../Redux/Actions/Company/Project/getAssignedProject';
import { createNewProject } from '../Redux/Actions/Company/Project/createNewProject';
import SendIcon from '@material-ui/icons/Send';
import { Button } from '@material-ui/core';
import Axios from 'axios';

class CompanyProfile extends Component {
  state = {
    token: localStorage.getItem('Token'),
    UserId: localStorage.getItem('UserId'),
    username: localStorage.getItem('username'),
    name_project: ''
  };

  onChange = e => {
    this.setState({ [e.target.id || e.target.name]: e.target.value });
  };

  onClickCreateProject = async () => {
    await this.props.dispatch(createNewProject(this.state.name_project,this.state.token)).then((res) => {
        alert('Create project success')
        this.setState({name_project:''})
      });
  };

  componentDidMount = async () => {
    await this.setState({ token: localStorage.getItem('Token') });
    await this.props
      .dispatch(getAssignedProject(this.state.token))
  };

  render() {
    return (
      <>
        <CssBaseline />
        <Navbar
        // name={engineerProfile.name}
        // logout={this.logout}
        // profilePage={this.profilePage.bind(this)}
        />
        {/* <Grid container justify='center' alignItems='center' style={{paddingTop: '1.5rem'}}>
          <Typography variant='h3' gutterBottom>
            Company Project Assignment
          </Typography>
        </Grid> */}
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          spacing={3}
          style={{ paddingTop: '1.5rem' }}
        >
          <Grid item sm={8}>
            <TableContainer className='table-container' component={Paper}>
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>No</TableCell>
                    <TableCell align='left'>Engineer</TableCell>
                    <TableCell align='right'>Company</TableCell>
                    <TableCell align='right'>Project Name </TableCell>
                    <TableCell align='right'>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.companyAssignedProject.assignedProject.map(
                    (project, index) => (
                      <TableRow key={index}>
                        <TableCell component='th' scope='row'>
                          {index + 1}
                        </TableCell>
                        <TableCell align='right'>{project.engineer}</TableCell>
                        <TableCell align='right'>{project.company}</TableCell>
                        <TableCell align='right'>
                          {project.name_project}
                        </TableCell>
                        <TableCell align='right'>
                          {project.status_project}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item>
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={3}
            >
              <TextField
                variant='filled'
                margin='normal'
                id='name_project'
                label='Add Project'
                name='addProject'
                value={this.state.name_project}
                onChange={this.onChange}
              />
              <Button onClick={this.onClickCreateProject}>
                <SendIcon fontSize='large' style={{ marginLeft: '1rem' }} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    companyAssignedProject: state.assignedProject
  };
};

export default connect(mapStateToProps)(CompanyProfile);
