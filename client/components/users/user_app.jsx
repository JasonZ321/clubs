import React, { Component } from 'react';
import UserHeader from './header/user_header';
import UserSidepanel from './sidepanel/user_sidepanel';
import { browserHistory } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * @class
 * @summary - Container of normal user pages
 */
class UserApp extends Component {
	/**
	 * getChildContext
	 * @summary define context property 'authorized'
	 * so that all its children can access 'authorized' property
	 * to know if user is logged in.
	 */
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
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
			<div>
				<UserHeader user={this.props.user} onLogout={this.onLogout}/>
					<div className='full col-sm-9'>
						<UserSidepanel user={this.props.user} relationship={this.props.relationship}/>
							{this.props.children}
					</div>
			</div>
			</MuiThemeProvider>
		);
	}
}

UserApp.childContextTypes = {
  authorized: React.PropTypes.bool
};

export default UserApp;
