import React, { Component } from 'react';
import LoginRegisterPage from './login/login_register_page';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Clubs } from '../../imports/collection/clubs';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {composeWithTracker} from 'react-komposer';
import { createClubUser, createNormalUser, loginClubUser, loginNormalUser } from '../../imports/api/user_api';

class App extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		this.state = {
			userLoginMode: true,
			clubLoginMode: true,
			userSubscription: Meteor.subscribe("currentUser"),
			clubSubscription: Meteor.subscribe("currentClub")
		}
	}
	componentWillUnmount() {
		this.state.userSubscription.stop();
		this.state.clubSubscription.stop();
	}
	componentWillMount() {
		const userId = Meteor.userId();
		if (userId && this.state.userSubscription.ready()) {
			console.log(Meteor.user());
			const currentUser = Meteor.user();
			if (!currentUser) {
				console.log("User not loaded");
				return;
			}
			if (currentUser && currentUser.isClubUser && this.state.clubSubscription.ready()) {
					const club = Clubs.findOne({'owner': currentUser._id});
					if (!club) {
						console.log(`user ${currentUser._id} doesn't have a club`);
						return;
					}
					const clubId = club._id;
					const url = `/club/${clubId}`;
					browserHistory.push(url);
			}
			if (currentUser && !currentUser.isClubUser) {
				const url = `/user/${Meteor.userId()}`;
				browserHistory.push(url);
			}
		}
	}
	switchUserLoginMode(event) {
		event.preventDefault();
		this.setState({
			userLoginMode: !this.state.userLoginMode
		});
	}
	switchClubLoginMode(event) {
		event.preventDefault();
		this.setState({
			clubLoginMode: !this.state.clubLoginMode
		});
	}
	renderSwitch(loginMode, switchLoginMode) {
		return loginMode ? <a href="#" className="btn btn-info" onClick={switchLoginMode.bind(this)}>登录</a> : <a href="#" className="btn btn-info" onClick={switchLoginMode.bind(this)}>注册</a>
	}
	onSubmitUser(event) {
		event.preventDefault();
		if (this.state.userLoginMode) {
			const {userLoginEmail, userLoginPassword} = this.refs;
			if (userLoginEmail.value && userLoginPassword.value) {
				loginNormalUser(userLoginEmail.value, userLoginPassword.value, function(userId) {
					const url = `/user/${userId}`;
					browserHistory.push(url);
				});
			} else {
				alert('Invalid input!');
			}
		} else {
			const { userRegisterName, userRegisterEmail, userRegisterPassword, userRegisterPasswordConfirm } = this.refs;
			const userObject = {
				'email': userRegisterEmail.value,
				'password': userRegisterPassword.value,
				'name': userRegisterName.value,
				'isClubUser': false
			};

			createNormalUser(userObject, function(result) {
				if (result) {
					const url = `/user/${result}`;
					browserHistory.push(url);
				}
			});
		}
	}
	onSubmitClub(event) {
		event.preventDefault();
		if (this.state.clubLoginMode) {
			const {clubLoginEmail, clubLoginPassword} = this.refs;
			if (clubLoginEmail.value && clubLoginPassword.value) {
				loginClubUser(clubLoginEmail.value, clubLoginPassword.value, function(club) {
					const clubId = club._id;
					const url = `/club/${clubId}`;
					browserHistory.push(url);
				});
			} else {
				alert('Invalid input!');
				return;
			}
		} else {
			const {clubRegisterName, clubRegisterCity, clubRegisterEmail, clubRegisterPassword, clubRegisterPasswordConfirm} = this.refs;

			const userObject = {
				'email': clubRegisterEmail.value,
				'password': clubRegisterPassword.value,
				'city': clubRegisterCity.value,
				'name': clubRegisterName.value
			};

			createClubUser(userObject, function(result) {
				if (result) {
					const url = `/club/${result}`;
					browserHistory.push(url);
				} else {
					console.error("no result found for newly created club user");
				}
			});
		}

	}
	renderUserForm() {
		if (this.state.userLoginMode) {
			return (
				<fieldset className="scheduler-border">
					<legend className="scheduler-border">用户</legend>
					<form className="form-signin">
							<label className="sr-only" for="useremail">邮箱:</label>
							<input className='form-control' type="text" ref='userLoginEmail' placeholder="邮箱" id='useremail'/>
							<label className="sr-only" for="userpassword">密码:</label>
							<input className='form-control' type="text" ref='userLoginPassword' placeholder="密码" id='userpassword'/>
							{this.renderSwitch(this.state.userLoginMode, this.switchUserLoginMode)}
							<button onClick={this.onSubmitUser.bind(this)} className='btn btn-primary pull-right'>提交</button>
					</form>
				</fieldset>
			)
		} else {
			return (
				<fieldset className="scheduler-border">
					<legend className="scheduler-border">用户</legend>
					<form className="form-signin">
							<label className="sr-only" for="useremail">邮箱:</label>
							<input className='form-control' type="text" ref='userRegisterEmail' placeholder="邮箱" id='useremail'/>
							<label className="sr-only" for="username">姓名:</label>
							<input className='form-control' type="text" ref='userRegisterName' placeholder="姓名" id='username'/>
							<label className="sr-only" for="userpassword">密码:</label>
							<input className='form-control' type="text" ref='userRegisterPassword' placeholder="密码" id='userpassword'/>
							<label className="sr-only" for="userpassword">密码确认:</label>
							<input className='form-control' type="text" ref='userRegisterPasswordConfirm' placeholder="密码确认" id='userpassword'/>
							{this.renderSwitch(this.state.userLoginMode, this.switchUserLoginMode)}
							<button onClick={this.onSubmitUser.bind(this)} className='btn btn-primary pull-right'>提交</button>
					</form>
				</fieldset>
			)
		}
	}
	renderClubForm() {
		if (this.state.clubLoginMode) {
			return (
				<fieldset className="scheduler-border">
					<legend className="scheduler-border">社团</legend>
					<form className="form-signin">
						<label className="sr-only" for="clubemail">邮箱:</label>
						<input className='form-control' type="text" ref='clubLoginEmail' placeholder="邮箱" id='clubemail'/>
						<label className="sr-only" for="clubpassword">密码:</label>
						<input className='form-control' type="text" ref='clubLoginPassword' placeholder="密码" id='clubpassword'/>
						{this.renderSwitch(this.state.clubLoginMode, this.switchClubLoginMode)}
						<button onClick={this.onSubmitClub.bind(this)} className='btn btn-primary pull-right'>提交</button>
					</form>
				</fieldset>
			);
		} else {
			return (
				<fieldset className="scheduler-border">
					<legend className="scheduler-border">社团</legend>
					<form className="form-signin">
						<label className="sr-only" for="clubemail">邮箱:</label>
						<input className='form-control' type="text" ref='clubRegisterEmail' placeholder="邮箱" id='clubemail'/>
						<label className="sr-only" for="clubname">社团名:</label>
						<input className='form-control' type="text" ref='clubRegisterName' placeholder="社团名" id='clubname'/>
						<label className="sr-only" for="clubcity">所在城市:</label>
						<input className='form-control' type="text" ref='clubRegisterCity' placeholder="所在城市" id='clubcity'/>
						<label className="sr-only" for="clubpassword">密码:</label>
						<input className='form-control' type="text" ref='clubRegisterPassword' placeholder="密码" id='clubpassword'/>
						<label className="sr-only" for="clubpassword">密码确认:</label>
						<input className='form-control' type="text" ref='clubRegisterPasswordConfirm' placeholder="密码确认" id='clubpassword'/>
						{this.renderSwitch(this.state.clubLoginMode, this.switchClubLoginMode)}
						<button onClick={this.onSubmitClub.bind(this)} className='btn btn-primary pull-right'>提交</button>
					</form>
				</fieldset>
			);
		}
	}
	render() {
		return (
			<div className="row">
				<div className="col-sm-6 col-sm-3">
					{this.renderUserForm()}
				</div>
				<div className="col-sm-6 col-sm-3">
					{this.renderClubForm()}
				</div>
			</div>
		);
	}
}

export default App;
