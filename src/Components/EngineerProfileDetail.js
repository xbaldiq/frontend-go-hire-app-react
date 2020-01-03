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
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

// REDUX
// import { getEngineerProfile } from '../Redux/Actions/engineerProfile';
// const getEngineerProfile = require('../Redux/Actions/engineerProfile');
import { getEngineerProfile } from '../Redux/Actions/engineerProfile';
import { getEngineerSkill } from '../Redux/Actions/engineerSkill';
import { mockComponent } from 'react-dom/test-utils';

class EngineerProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.handleEditClick = this.handleEditClick.bind(this);
  }
  componentDidMount = async () => {
    console.log('didmount')
    await this.props.dispatch(
      getEngineerProfile.getEngineerProfile(localStorage.getItem('Token'))
    );
    await this.props.dispatch(getEngineerSkill(localStorage.getItem('Token')));

    this.setState({
      defaultProfile: this.props.engineerProfile.engineerProfile,
      defaultSkill: this.props.engineerSkill.engineerSkillList,
      refSkill: this.props.engineerSkill.engineerSkillList
    });
    console.log('default skill',this.state.defaultSkill)
  };

  state = {
    // nameRef: this.props.engineerProfile.engineerProfile.name,
    onChangeTrigger: false,
    onChangeSkillTrigger: false,
    nameDefault: '',
    refSkill: [

    ],
    defaultSkill: [
      {
        no: 0,
        id: 0,
        skill_no: 0,
        skill_item: ''
      }
    ],
    defaultProfile: {}
  };  

  showSkill = data => {
    this.render(<TableCell>data</TableCell>);
  };

  handleEditClick = e => {
    // console.log('target: ', e.target.name);
    console.log(e.target.value);
    // this.patchStatusProject(name, value);
    this.setState({ defaultProfile: e.target.value });
    this.setState({ onChangeTrigger: true });
  };

  handleOnChangeSkill = e => {
    this.setState({ defaultSkill: e.target.value });
    this.setState({ onChangeSkillTrigger: true });
  };

  showApplyButton = () => {
    return (
      <>
        <Button
          onClick={e => {
            // send patch
          }}
        >
          Apply
        </Button>

        <Button
          onClick={e => {
            this.setState({ onChangeTrigger: false });
            this.setState({
              defaultProfile: this.props.engineerProfile.engineerProfile
            });
          }}
        >
          Cancel
        </Button>
      </>
    );
  };

  disableApplyButton = () => {
    return (
      <>
        <Button
          disabled
          onClick={e => {
            // send patch
          }}
        >
          Apply
        </Button>

        <Button
          disabled
          onClick={e => {
            this.setState({ onChangeTrigger: false });
            this.setState({
              defaultProfile: this.props.engineerProfile.engineerProfile
            });
          }}
        >
          Cancel
        </Button>
      </>
    );
  };

  showApplySkillButton = () => {
    return (
      <>
        <Button
          onClick={e => {
            // send patch
          }}
        >
          Apply
        </Button>

        <Button
          onClick={e => {
            this.setState({ onChangeSkillTrigger: false });
            this.setState({
              defaultSkill: this.props.engineerSkill.engineerSkillList
            });
          }}
        >
          Cancel
        </Button>
      </>
    );
  };

  disableApplySkillButton = () => {
    return (
      <>
        <Button
          disabled
          onClick={e => {
            // send patch
          }}
        >
          Apply
        </Button>

        <Button
          disabled
          onClick={e => {
            this.setState({ onChangeTriggerSkill: false });
            this.setState({
              defaulSkill: this.props.engineerSkill.engineerSkillList
            });
          }}
        >
          Cancel
        </Button>
      </>
    );
  };

  render() {
    const { engineerProfile } = this.props.engineerProfile;
    const { engineerSkillList } = this.props.engineerSkill;

    console.log(this.state.defaultSkill);
    console.log('render')

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
          alignItems='flex-start'
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

          <Grid item md={5} xs={5}>
            <Paper>
              <List component='nav' aria-label='main mailbox folders'>
                {/* NAME */}
                <ListItem>
                  <ListItemText secondary='Name' />
                  <TextField
                    value={this.state.defaultProfile.name}
                    name='name'
                    onChange={this.handleEditClick}
                  />
                  <ListItemIcon></ListItemIcon>
                </ListItem>

                {/* DESCRIPTION */}
                <ListItem>
                  <ListItemText secondary='Name' />
                  <TextField
                    value={this.state.defaultProfile.description}
                    name='description'
                    onChange={this.handleEditClick}
                  />
                  <ListItemIcon></ListItemIcon>
                </ListItem>

                <ListItem>
                  <ListItemText secondary='location' />
                  <TextField
                    value={this.state.defaultProfile.location}
                    name='location'
                    onChange={this.handleEditClick}
                  />
                  <ListItemIcon></ListItemIcon>
                </ListItem>

                <ListItem>
                  <ListItemText secondary='Date of Birth' />
                  <TextField
                    value={this.state.defaultProfile.dateofbirth}
                    disabled
                    name='dateofbirth'
                    type='text'
                  />
                  <ListItemIcon></ListItemIcon>
                </ListItem>

                <ListItem>
                  <ListItemText secondary='Date Created' />
                  <TextField
                    disabled
                    value={this.state.defaultProfile.datecreated}
                    name='datecreated'
                  />
                  <ListItemIcon></ListItemIcon>
                </ListItem>

                <ListItem>
                  <ListItemText secondary='Date Updated' />
                  <TextField
                    disabled
                    value={this.state.defaultProfile.dateupdated}
                    name='dateupdated'
                  />
                  <ListItemIcon></ListItemIcon>
                </ListItem>

                <Divider />
                <ListItem alignItems='flex-end'>
                  {this.state.onChangeTrigger
                    ? this.showApplyButton()
                    : this.disableApplyButton()}
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item md={4} xs={4}>
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.refSkill.map((skill, index) => (

                      <TableRow key={index}>
                        <TableCell align='left'>{skill.skill_no}</TableCell>

                        <TableCell align='left'>
                          <TextField
                            value={this.state.defaultSkill[index].skill_item  }
                            onChange={this.handleOnChangeSkill}
                          />
                        </TableCell>
                        {/* <TableCell align='center'>
                          <Button>
                            <EditIcon htmlColor='darkGrey' />
                          </Button>
                          <Button>
                            <DeleteIcon htmlColor='darkGrey' />
                          </Button>
                        </TableCell> */}
                      </TableRow>
                    ))}
                    <TableRow key={'btn'}>
                      <TableCell align='center'>
                        {this.state.onChangeSkillTrigger
                          ? this.showApplySkillButton()
                          : this.disableApplySkillButton()}
                      </TableCell>
                    </TableRow>
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
