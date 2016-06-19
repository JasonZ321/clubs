import React, { Component } from 'react';
import UserHeader from './header/user_header';
import UserSidepanel from './sidepanel/user_sidepanel';
import { browserHistory } from 'react-router';

class UserApp extends Component {
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
			<div>
				<UserHeader user={this.props.user} onLogout={this.onLogout}/>
					<div className='full col-sm-9'>
						<UserSidepanel user={this.props.user}/>
							{this.props.children}
					</div>
			</div>
		);
	}
}

UserApp.childContextTypes = {
  authorized: React.PropTypes.bool
};

export default UserApp;
