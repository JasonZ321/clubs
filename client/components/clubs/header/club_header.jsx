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

class ClubHeader extends Component {
	onLogout(event) {
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
	renderClubTabs() {
		const clubId = this.props.club._id;
		const mainURL =`/club/${clubId}`;
		const activityURL = `/club/${clubId}/activities`;
		const postURL = `/club/${clubId}/posts`;
		const managementURL = `/club/${clubId}/management`;
		return (
			<div>
				<Tabs onChange={this.handleTabChange.bind(this)}>
					<Tab label='首页' route={mainURL}></Tab>
					<Tab label='活动' route={activityURL}></Tab>
					<Tab label='发布' route={postURL}></Tab>
					<Tab label='管理' route={managementURL}></Tab>
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
				<AppBar style={styles.appBar} title="团团" iconStyleRight={styles.tabs} iconElementRight={this.renderClubTabs()} iconElementLeft={this.renderLeftButtons()}/>
	 		</div>
	  );
	}
}

export default ClubHeader;
