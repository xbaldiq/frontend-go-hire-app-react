import React, { Component } from 'react';
import Navbar from './Navbar';
import Card from './Card';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// REDUX
import { getEngineerProfile } from '../Redux/Actions/engineerProfile';
import { getEngineerSkill } from '../Redux/Actions/engineerSkill';

class EngineerProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.handleEditClick = this.handleEditClick.bind(this);
  }
  componentDidMount = async () => {
    await this.props.dispatch(
      getEngineerProfile(localStorage.getItem('Token'))
    );
    await this.props.dispatch(getEngineerSkill(localStorage.getItem('Token')));

    // this.setState({nameRef: this.props.engineerProfile.engineerProfile.name })
  };

  state = {
    nameRef: this.props.engineerProfile.engineerProfile.name,
    // editName: ''

    // name = this.props.engineerProfile.engineerProfile.name
  };

  showSkill = data => {
    this.render(<TableCell>data</TableCell>);
  };

  handleEditClick = (e, value) => {
    // console.log(e.target.id);  
    console.log(value);
    // this.patchStatusProject(name, value);
  };

  render() {
    const { engineerProfile } = this.props.engineerProfile;
    const { engineerSkillList } = this.props.engineerSkill;

    // this.setState({editName: engineerProfile.name})
    // console.log(this.props.engineerSkill.engineerSkillList);

    return (
      <>
        <Navbar
          name={engineerProfile.name}
          changeLoginStatus={this.changeLoginStatus}
          engineerProfileEditPage={this.engineerProfileEditPage}
        />
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          spacing={4}
          style={{ paddingTop: '1.5rem' }}
        >
          <Grid item>
            <Card
              key={engineerProfile.id || ''}
              name={engineerProfile.name || ''}
              description={engineerProfile.description || ''}
              skill={engineerProfile.skill || ''}
              total_project={engineerProfile.total_project || '-'}
              successrate={engineerProfile.successrate || '0'}
            />
          </Grid>

          <Grid item xs={5}>
            <Paper>
              <List component='nav' aria-label='main mailbox folders'>
                {/* NAME */}
                <ListItem>
                  <ListItemText secondary='Name' />
                  <TextField value={engineerProfile.name} placeholder={engineerProfile.name}/>
                  {/* <ListItemText primary={engineerProfile.name} /> */}
                  <ListItemIcon>
                    {/* <Button
                      // onClick={() => this.handleEditClick()}
                    >
                      <EditIcon htmlColor='darkGrey' />
                    </Button> */}
                  </ListItemIcon>
                </ListItem>

                <ListItem>
                  <ListItemText secondary='Description' />
                  <ListItemText primary={engineerProfile.description} />
                  <ListItemIcon>
                    <Button>
                      <EditIcon htmlColor='darkGrey' />
                    </Button>
                  </ListItemIcon>
                </ListItem>

                <ListItem>
                  <ListItemText secondary='Location' />
                  <ListItemText primary={engineerProfile.location} />
                  <ListItemIcon>
                    <Button>
                      <EditIcon htmlColor='darkGrey' />
                    </Button>
                  </ListItemIcon>
                </ListItem>

                <ListItem>
                  <ListItemText secondary='Date of Birth' />
                  <ListItemText primary={engineerProfile.dateofbirth} />
                  <ListItemIcon>
                    <Button>
                      <EditIcon htmlColor='darkGrey' />
                    </Button>
                  </ListItemIcon>
                </ListItem>

                <ListItem>
                  <ListItemText secondary='Date of Created' />
                  <ListItemText
                    align='left'
                    primary={engineerProfile.datecreated}
                  />
                  <ListItemIcon>
                    <Button>
                      <EditIcon htmlColor='transparent' />
                    </Button>
                  </ListItemIcon>
                </ListItem>

                <ListItem>
                  <ListItemText secondary='Date of Updated' />
                  <ListItemText primary={engineerProfile.dateupdated} />
                  <ListItemIcon>
                    <Button>
                      <EditIcon htmlColor='transparent' />
                    </Button>
                  </ListItemIcon>
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={5}>
            <Paper>
              <TableContainer
                className='table-container'
                component={Paper}
                direction='column'
              >
                <Table aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='left'>No</TableCell>
                      <TableCell align='left'>Skill</TableCell>
                      <TableCell align='center'>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {engineerSkillList.map((skill, index) => (
                      <TableRow key={index}>
                        <TableCell>{skill.skill_no}</TableCell>
                        <TableCell>{skill.skill_item}</TableCell>
                        <TableCell align='center'>
                          <Button>
                            <EditIcon htmlColor='darkGrey' />
                          </Button>
                          <Button>
                            <DeleteIcon htmlColor='darkGrey' />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    engineerProfile: state.engineerProfile,
    engineerSkill: state.engineerSkill
  };
};

export default connect(mapStateToProps)(EngineerProfileDetail);
