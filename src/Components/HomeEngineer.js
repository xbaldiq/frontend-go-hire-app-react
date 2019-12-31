import React, { Component } from 'react';
import Navbar from './Navbar';
import Card from './Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import './Styles/HomeEngineer.css'
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Button from '@material-ui/core/Button';
import InputIcon from '@material-ui/icons/Input';

class HomeEngineer extends Component {
  constructor() {
    super();

    // this.createData = this.createData.bind(this);
    this.getProject = this.getProject.bind(this);
    this.handleStatusOnClick = this.handleStatusOnClick.bind(this)
  }

  state = {
      projects : [],
      id : 252
  }

  componentDidMount() {
    this.getProject()
  }

  getProject = () => {
    const url = `http://localhost:8000/engineer/project/`;
    axios
      .get(url, {
        params: {
            id:this.state.id
        },
        headers: {
          'Content-Type': 'application/json'
          //   Authorization: `Bearer `.concat(this.state.token)
        }
      })
      .then(projects => {
          this.setState({projects: projects.data})
        //   this.setState({status: projects.data.status})
      })
      .catch(err => alert('error', err));
  };

  patchStatusProject = (name_project,status_project) => {
    const url = `http://localhost:8000/engineer/project/`;
    // const url = `http://localhost:8000/engineer/project/?id=${this.state.id}&name_project=${name_project}&status_project=${status_project}`;
    axios
      .patch(url, null, {
        params: {
            id:this.state.id,
            name_project,
            status_project
        },
        headers: {
          'Content-Type': 'application/json'
          //   Authorization: `Bearer `.concat(this.state.token)
        }
      })
      .then(projects => {
          // console.log(projects)
          // console.log('click action')
        //   this.setState({projects: projects.data})
        //   this.setState({status: projects.data.status})
      })
      .catch(err => alert('error', err));
  };

  handleStatusOnClick = (e, name, status) => {
      this.patchStatusProject(name,status)
  }

  render() {

    return (
      <>
        <CssBaseline />
        <Navbar />
        {/* <Card />     */}

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
              {this.state.projects.map((project, index) => (
                <TableRow key={project.name}>
                    <TableCell component='th' scope='row'>{index+1}</TableCell>
                    <TableCell>{project.project}</TableCell>
                    <TableCell align='right'>{project.company}</TableCell>
                    <TableCell align='right'>
                      {project.status}
                    </TableCell>
                    <TableCell align='right'>
                      {project.status==='success' || project.status==='failed' || project.status==='rejected' ? ''
                      :<>
                        <Button onClick={ project.status==='ongoing' ? (e) => {this.handleStatusOnClick(e, project.project, 'success')}  
                        : (e) => {this.handleStatusOnClick(e, project.project, 'ongoing')} } ><ControlPointIcon fontSize='large' htmlColor='green'/></Button> 
                        <Button onClick={ project.status==='ongoing' ? (e) => {this.handleStatusOnClick(e, project.project, 'failed')} 
                        : (e) => {this.handleStatusOnClick(e, project.project, 'rejected')} }><NotInterestedIcon fontSize='large' htmlColor='red'/></Button>
                      </>
                      } 
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default HomeEngineer;
