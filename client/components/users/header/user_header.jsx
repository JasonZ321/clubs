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
		Meteor.logout(function() {
			console.log('Logged out');
			browserHistory.push('/');
		});
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
		return (
			<div>
				<Tabs onChange={this.handleTabChange.bind(this)}>
					<Tab label='首页' route={mainURL}></Tab>
					<Tab label='附近' route={nearbyURL}></Tab>
					<Tab label='我的社团' route={myclubURL}></Tab>
					<Tab label='我的活动' route={myactivityURL}></Tab>
			 	</Tabs>
		</div>
		);
	}
	render() {
		return (
			<div>
				<AppBar style={styles.appBar} title="团团" iconStyleRight={styles.tabs} iconElementRight={this.renderUserTabs()} iconElementLeft={<a href='#' onClick={this.onLogout}>退出</a>}/>
	 		</div>
	  );
	}
}

export default UserHeader;
