import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';

const styles = {
  appBar: {
    flexWrap: 'wrap',
  },
  tabs: {
   	padding: '20px',
		width: '40%'
  }
};

class UserHeader extends Component {
	onLogout() {
		event.preventDefault();
		Meteor.logout(function() {
			console.log('Logged out');
			browserHistory.push('/');
		});
	}
	onNavigateToHome() {
		event.preventDefault();
		browserHistory.push('/');
    location.reload();
	}
	handleTabChange(value, e, tab) {
		browserHistory.push(tab.props.route);
	}
	renderUserTabs() {
		const userId = this.props.user._id;
		const mainURL =`/user/${userId}`;
		const nearbyURL = `/user/${userId}/nearby`;
		const myactivityURL = `/user/${userId}/myactivity`;
		const myclubURL = `/user/${userId}/myclub`;
    const friendsURL = `/user/${userId}/friends`;
		return (
			<div>
				<Tabs onChange={this.handleTabChange.bind(this)}>
					<Tab label='首页' route={mainURL}></Tab>
					<Tab label='附近' route={nearbyURL}></Tab>
					<Tab label='我的社团' route={myclubURL}></Tab>
					<Tab label='我的活动' route={myactivityURL}></Tab>
          <Tab label='好友' route={friendsURL}></Tab>
			 	</Tabs>
		</div>
		);
	}
	renderLeftButtons() {
		return (
			<div>
   			<a onClick={this.onLogout}>退出</a><br />
				<a onClick={this.onNavigateToHome}>我的首页</a>
   		</div>
		);
	}
	render() {
		return (
			<div>
				<AppBar style={styles.appBar} title="团团" iconStyleRight={styles.tabs} iconElementRight={this.renderUserTabs()} iconElementLeft={this.renderLeftButtons()}/>
	 		</div>
	  );
	}
}

export default UserHeader;
