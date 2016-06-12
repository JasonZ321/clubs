import React, { Component } from 'react';
import { browserHistory } from 'react-router';
class UserMain extends Component {
	onLogout() {
		Meteor.logout(function(){
			console.log('Logged out');
			browserHistory.push('/');
		});
	}
	render() {
		return (
			<div>
				User page not start yet!
				<a href='#' onClick={this.onLogout.bind(this)}>退出</a>
			</div>
		)
	}
}

export default UserMain;
