import React, { Component } from 'react';
import ClubHeader from './header/club_header';
import ClubSidePanel from './sidepanel/club_sidepanel';
import { browserHistory } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ClubApp extends Component {
	getChildContext() {
		return {authorized: this.props.authorized};
	}
	onLogout() {
		Meteor.logout(function() {
			console.log('Logged out');
			browserHistory.push('/');
		});
	}
	render() {
		if (this.props.club) {
			return (
				<MuiThemeProvider muiTheme={getMuiTheme()}>
					<div>
						<ClubHeader club={this.props.club} onLogout={this.onLogout}/>
						<div className='full col-sm-9'>
							<ClubSidePanel club={this.props.club}/>
								{this.props.children}
						</div>
					</div>
				</MuiThemeProvider>
			);
		} else {
			return <div>Page is loading...</div>
		}
	}
}

ClubApp.childContextTypes = {
  authorized: React.PropTypes.bool
};

export default ClubApp;
