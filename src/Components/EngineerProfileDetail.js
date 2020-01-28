import React, { Component } from 'react';
import Navbar from './Navbar';
import Card from './Card';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import SendIcon from '@material-ui/icons/Send';
// REDUX
import { getEngineerProfile } from '../Redux/Actions/Engineer/engineerProfile';
import { patchEngineerProfile } from '../Redux/Actions/Engineer/engineerEditProfile';
import { patchEngineerSkill } from '../Redux/Actions/Engineer/engineerEditSkill';
import { getEngineerSkill } from '../Redux/Actions/Engineer/engineerSkill';
import { postEngineerSkill } from '../Redux/Actions/Engineer/engineerSkill';
import { deleteEngineerSkill } from '../Redux/Actions/Engineer/engineerSkill';

class EngineerProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.onChangeBio = this.onChangeBio.bind(this);
  }
  componentDidMount = async () => {
    console.log('didmount');
    await this.props.dispatch(
      getEngineerProfile(localStorage.getItem('Token'))
    );
    await this.props.dispatch(getEngineerSkill(localStorage.getItem('Token')));

    this.setState({
      defaultProfile: this.props.engineerProfile.engineerProfile,
      defaultSkill: this.props.engineerSkill.engineerSkillList,
      refSkill: this.props.engineerSkill.engineerSkillList
    });

    const skillLength = this.state.defaultSkill.length;

    console.log('skillLength', skillLength);
    console.log('end didmount');
  };

  state = {
    token: localStorage.getItem('Token'),
    onChangeTrigger: false,
    onChangeSkillTriggerArray: [
      {
        onChangeSkill: false
      }
    ],
    nameDefault: '',
    refSkill: [],
    defaultSkill: [
      {
        no: 0,
        id: 0,
        skill_no: 0,
        skill_item: ''
      }
    ],
    defaultProfile: {},
    changedSkill: {}
  };

  onChangeBio = e => {
    // console.log('value', e.target.value);
    // console.log('key', e.target.name);
    const val = e.target.value;
    const key = e.target.name;
    this.setState(prevState => ({
      defaultProfile: {
        ...prevState.defaultProfile,
        [key]: val
      }
    }));
    this.setState({ onChangeTrigger: true });

    // console.log(this.state.defaultProfile);
  };

  onChangeSkill = async e => {
    let index = e.target.id;
    const value = e.target.value;

    this.setState(prevState => ({
      changedSkill: {
        ...prevState.changedSkill,
        skill_no: parseInt(index) + 1,
        skill_item: value
      }
    }));

    const defaultSkill = [...this.state.defaultSkill];
    defaultSkill[index] = { ...defaultSkill[index], skill_item: value };
    this.setState({ defaultSkill });

    const onChangeSkillTriggerArray = [...this.state.onChangeSkillTriggerArray];
    onChangeSkillTriggerArray[index] = {
      ...onChangeSkillTriggerArray[index],
      onChangeSkill: true
    };
    await this.setState({ onChangeSkillTriggerArray });

    console.log(this.state.onChangeSkillTriggerArray[index].onChangeSkill);
  };

  onChange = e => {
    this.setState({ [e.target.id || e.target.name]: e.target.value });
  };

  showApplyButton = () => {
    return (
      <>
        <Button
          onClick={async e => {
            await this.props
              .dispatch(
                patchEngineerProfile(
                  this.state.defaultProfile,
                  localStorage.getItem('Token')
                )
              )
              .then(res => {
                alert('Updating bio success');
              });
            this.setState({ onChangeTrigger: false });
            await this.props.dispatch(
              getEngineerProfile(localStorage.getItem('Token'))
            );
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

  showApplySkillButton = () => {
    return (
      <>
        <Button
        //   onClick={ async e => {
        //     await this.props.dispatch(patchEngineerProfile(this.state.defaultProfile,localStorage.getItem('Token')))
        //     .then((res) => {
        //       alert('Updating bio success')
        //     })
        //     this.setState({ onChangeTrigger: false });
        //     await this.props.dispatch(
        //       getEngineerProfile(localStorage.getItem('Token'))
        //     );
        //   }
        // }
        >
          Apply
        </Button>

        <Button
          onClick={e => {
            const onChangeSkillTriggerArray = [
              ...this.state.onChangeSkillTriggerArray
            ];
            onChangeSkillTriggerArray[0] = {
              ...onChangeSkillTriggerArray[0],
              onChangeSkill: false
            };
            this.setState({ onChangeSkillTriggerArray });
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

  logout = () => {
    this.setState({ token: '' });
    localStorage.clear();
    alert('Logout Account')
  };

  profilePage = () => {
    // this.props.history.push('/engineer/profile');
  };

  deleteSkill = deletedSkill => {
    this.props
      .dispatch(
        deleteEngineerSkill(deletedSkill, localStorage.getItem('Token'))
      )
      .then(res => {
        alert(`success deleted ${deletedSkill}`)
        // alert(res);
      });
  };

  onClickInsertSkill = async () => {
    await this.props
      .dispatch(
        postEngineerSkill(
          this.state.defaultSkill.length + 1,
          this.state.newSkill,
          localStorage.getItem('Token')
        )
      )
      .then(() => {
        alert(`Success insert ${this.state.newSkill}`);
        this.setState({ newSkill: '' });
      });
      
  };
  render() {
    const { engineerProfile } = this.props.engineerProfile;
    const { engineerSkillList } = this.props.engineerSkill;

    console.log('render');

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
                    onChange={this.onChangeBio}
                  />
                  <ListItemIcon></ListItemIcon>
                </ListItem>

                {/* DESCRIPTION */}
                <ListItem>
                  <ListItemText secondary='Description' />
                  <TextField
                    value={this.state.defaultProfile.description}
                    name='description'
                    onChange={this.onChangeBio}
                  />
                  <ListItemIcon></ListItemIcon>
                </ListItem>

                <ListItem>
                  <ListItemText secondary='Location' />
                  <TextField
                    value={this.state.defaultProfile.location}
                    name='Location'
                    onChange={this.onChangeBio}
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

          <Grid item md={3} xs={5}>
            <Paper>
              <TableContainer
                className='table-container'
                alignItems=''
                component={Paper}
                direction='column'
              >
                <Table aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='left' width='10%'>
                        No
                      </TableCell>
                      <TableCell align='left' width='100%'>
                        Skill
                      </TableCell>
                      <TableCell align='center'>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.refSkill.map((skill, index) => (
                      <TableRow key={index}>
                        <TableCell align='left'>{index + 1}</TableCell>
                        <TableCell align='left'>
                          <TextField
                            id={index}
                            value={this.state.defaultSkill[index].skill_item}
                            onChange={this.onChangeSkill}
                          />
                        </TableCell>

                        <TableCell align='center'>
                          <Button>
                            <EditIcon htmlColor='darkGrey' />
                          </Button>
                          <Button
                            onClick={async () => {
                              await this.props.dispatch(deleteEngineerSkill(skill.skill_no, localStorage.getItem('Token')))
                              .then(res => {
                                alert(`Successfully DELETE ${skill.skill_item} skill`)
                              });
                            }}
                          >
                            <DeleteIcon htmlColor='darkGrey' />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow key={'btn'}>
                      <TableCell align='center' colSpan={3}>
                        {this.state.onChangeSkillTriggerArray[0].onChangeSkill
                          ? this.showApplySkillButton()
                          : this.disableApplySkillButton()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>
                        <TextField
                          fullWidth
                          variant='outlined'
                          margin='normal'
                          id='newSkill'
                          label='Add New Skill'
                          name='newSkill'
                          value={this.state.newSkill}
                          onChange={this.onChange}
                        />
                      </TableCell>
                      <TableCell colSpan={1}>
                        <Button onClick={this.onClickInsertSkill}>
                          <SendIcon
                            fontSize='large'
                            style={{ marginLeft: '1rem' }}
                          />
                        </Button>
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

  disableApplyButton = () => {
    return (
      <>
        <Button disabled onClick={e => {}}>
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
          }}
        >
          Cancel
        </Button>
      </>
    );
  };
}

const mapStateToProps = state => {
  return {
    engineerProfile: state.engineerProfile,
    engineerSkill: state.engineerSkill
  };
};

export default connect(mapStateToProps)(EngineerProfileDetail);
