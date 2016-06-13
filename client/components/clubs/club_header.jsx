import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
class ClubHeader extends Component {
	constructor(props) {
		super(props);
	}
	onLogout() {
		Meteor.logout(function(){
			console.log('Logged out');
			browserHistory.push('/');
		});
	}
	render() {
		debugger;
		const clubId = this.props.currentClub._id;
		const mainURL =`/club/${clubId}`;
		const activityURL = `/club/${clubId}/activity`;
		const postURL = `/club/${clubId}/post`;
		const managementURL = `/club/${clubId}/management`;
		return (
			<nav className="nav navbar-default">
				<div className="navbar-header" >
					<Link to="/" className="navbar-brand" >团团</Link>
				</div>
				<ul className="nav navbar-nav navbar-left">
					<li>
						<Link to={mainURL} className="navbar-brand" >首页</Link>
					</li>
					<li>
						<Link to={activityURL} className="navbar-brand" >活动</Link>
					</li>
					<li>
						<Link to={postURL} className="navbar-brand" >文章</Link>
					</li>
					<li>
						<Link to={managementURL} className="navbar-brand" >管理</Link>
					</li>
				</ul>
				<div>
					<a href='#' onClick={this.onLogout.bind(this)}>退出</a>
				</div>
			</nav>
		)
	}
}

export default createContainer(() => {
	Meteor.subscribe('currentClub');
	return { currentClub: Clubs.find({owner: Meteor.userId()}) }

}, ClubHeader);
