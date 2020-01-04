import React, { Component } from 'react';
import Navbar from './Navbar';
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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Card from './Card';
import { getCompanyProfile } from '../Redux/Actions/Company/Data/companyProfile';
import { patchCompanyProfile } from '../Redux/Actions/Company/Data/companyProfile';
import Button from '@material-ui/core/Button';

class CompanyDetail extends Component {
  state = {
    onChangeTrigger: false,
    username: localStorage.getItem('username'),
    token: localStorage.getItem('Token'),
    defaultProfile: {}
  };

  componentDidMount = async () => {
    await this.props.dispatch(getCompanyProfile(this.state.token));

    this.setState({
      defaultProfile: this.props.companyProfile.companyProfile
    });
  };

  onChange = e => {
    const val = e.target.value;
    const key = e.target.name;
    this.setState(prevState => ({
      defaultProfile: {
        ...prevState.defaultProfile,
        [key]: val
      }
    }));
    this.setState({ onChangeTrigger: true });
  };

  showApplyButton = () => {
    return (
      <>
        <Button
        onClick={async e => {
          await this.props
            .dispatch(
              patchCompanyProfile(
                this.state.defaultProfile,
                this.state.token
              )
            )
            .then(res => {
              alert('Updating bio company success');
            });
          this.setState({ onChangeTrigger: false });

          await this.props.dispatch(
            getCompanyProfile(localStorage.getItem('Token'))
          );
          this.setState({
            defaultProfile: this.props.companyProfile.companyProfile
          });
        }}
        >
          Apply
        </Button>

        <Button
          onClick={e => {
            this.setState({ onChangeTrigger: false });
            this.setState({
              defaultProfile: this.props.companyProfile.companyProfile
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
        <Button disabled onClick={e => {}}>
          Apply
        </Button>

        <Button
          disabled
          onClick={e => {
            this.setState({ onChangeTrigger: false });
            this.setState({
              defaultProfile: this.props.companyProfile.companyProfile
            });
          }}
        >
          Cancel
        </Button>
      </>
    );
  };

  render() {
    const { companyProfile } = this.props.companyProfile;

    return (
      <>
        <CssBaseline />
        <Navbar
          name={companyProfile.name}
          logout={this.logout}
          profilePage={this.profilePage}
        />

        <Grid
          container
          direction='row'
          justify='center'
          alignItems='flex-start'
          spacing={4}
          style={{ paddingTop: '1.5rem' }}
        >
          <Grid item md={5} xs={5}>
            <Paper>
              <List component='nav' aria-label='main mailbox folders'>
                <ListItem>
                  <ListItemText secondary='Name' />
                  <TextField
                    value={this.state.defaultProfile.name}
                    name='name'
                    onChange={this.onChange}
                  />
                  <ListItemIcon></ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText secondary='Description' />
                  <TextField
                    value={this.state.defaultProfile.description}
                    name='description'
                    onChange={this.onChange}
                  />
                  <ListItemIcon></ListItemIcon>
                </ListItem>

                <ListItem>
                  <ListItemText secondary='location' />
                  <TextField
                    value={this.state.defaultProfile.location}
                    name='location'
                    onChange={this.onChange}
                  />
                  <ListItemIcon></ListItemIcon>
                </ListItem>

                <ListItem>
                  <ListItemText secondary='logo' />
                  <TextField
                    value={this.state.defaultProfile.logo}
                    name='logo'
                    onChange={this.onChange}
                  />
                  <ListItemIcon></ListItemIcon>
                </ListItem>

                <ListItem alignItems='center'>
                    {this.state.onChangeTrigger
                      ? this.showApplyButton()
                      : this.disableApplyButton()}
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    companyProfile: state.companyProfile
    // engineerProjectList: state.engineerProjectList,
    // engineerProfile: state.engineerProfile
  };
};

export default connect(mapStateToProps)(CompanyDetail);
