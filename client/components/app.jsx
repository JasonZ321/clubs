import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Clubs } from '../../imports/collection/clubs';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {composeWithTracker} from 'react-komposer';
import { createClubUser, createNormalUser, loginClubUser, loginNormalUser } from '../../imports/api/user_api';

// UI component library
import FlatButton from 'material-ui/FlatButton';

/**
 * @class - Entry point of clubs App
 * If user signed in, redirect to clubs user main page or normal user main page.
 * If user not signed in, render the login sign up page.
 * Using TrackerReact to make App component a Reactive component for synchronizing data
 */
class App extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		this.state = {
			userMode: true,
			clubMode: false,
			signinMode: true,
			signupMode: false
		}
	}
	componentWillUnmount() {
		Meteor.subscribe("currentUser").stop();
		Meteor.subscribe("currentClub").stop();
	}
	/**
	 * redirect if user not logged in.
	 */
	componentWillMount() {
		const userId = Meteor.userId();
		if (userId) {
			Meteor.subscribe('currentUser', function() {
				console.log(Meteor.user());
				const currentUser = Meteor.user();
				if (!currentUser) {
					console.log("User not loaded");
					return;
				}
				if (currentUser && currentUser.isClubUser) {
					Meteor.subscribe('currentClub', function() {
						const club = Clubs.findOne({'owner': currentUser._id});
						if (!club) {
							console.log(`user ${currentUser._id} doesn't have a club`);
							return;
						}
						const clubId = club._id;
						const url = `/club/${clubId}`;
						browserHistory.push(url);
					});
				} else {
					const url = `/user/${Meteor.userId()}`;
					browserHistory.push(url);
				}
			});
		}
	}

	switchUserMode(event) {
		event.preventDefault();
		this.setState({
			userMode: true,
			clubMode: false
		});
	}

	switchClubMode(event) {
		event.preventDefault();
		this.setState({
			userMode: false,
			clubMode: true
		});
	}

	switchSigninMode(event) {
		event.preventDefault();
		this.setState({
			signinMode: true,
			signupMode: false
		});
	}
	switchSignupMode(event) {
		event.preventDefault();
		this.setState({
			signinMode: false,
			signupMode: true
		});
	}

	/**
	 * onSubmitUser - Handler of submit loggin form or sign up form for normal user
	 *
	 * @param  {type} event submit handler
	 */
	onSubmitUser(event) {
		event.preventDefault();
		if (this.state.signinMode) {
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
			loginNormalUser(userLoginEmail.value, userLoginPassword.value, function(userId) {
				const url = `/user/${userId}`;
				browserHistory.push(url);
			});
		}
	}

	/**
	 * onSubmitClub - Handler of submit loggin form or sign up form for club user
	 *
	 * @param  {type} event submit handler
	 */
	onSubmitClub(event) {
		event.preventDefault();
		if (this.state.signinMode) {
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
			loginClubUser(clubLoginEmail.value, clubLoginPassword.value, function(club) {
				const clubId = club._id;
				const url = `/club/${clubId}`;
				browserHistory.push(url);
			});
		}
	}

	/**
	 * renderUserForm - render method of normal user form
	 * {this.renderSwitch(this.state.userLoginMode, this.switchUserLoginMode)}
	 * <button onClick={this.onSubmitUser.bind(this)} className='btn btn-primary pull-right'>提交</button>
	 * <button onClick={this.onSubmitUser.bind(this)} className='btn btn-primary pull-right'>提交</button>

	 */
	renderUserForm() {

		if (this.state.signinMode) {
			return (
				<form className="form-signin">
					<label className="sr-only" for="useremail">邮箱:</label>
					<input className='form-control' type="text" ref='userLoginEmail' placeholder="邮箱" id='useremail'/>
					<label className="sr-only" for="userpassword">密码:</label>
					<input className='form-control' type="text" ref='userLoginPassword' placeholder="密码" id='userpassword'/>
					<FlatButton backgroundColor="#2196F3" className="start-but" onClick={this.onSubmitUser.bind(this)} label="开始"/>
				</form>
			)
		} else {
			return (
					<form className="form-signin">
							<label className="sr-only" for="useremail">邮箱:</label>
							<input className='form-control' type="text" ref='userRegisterEmail' placeholder="邮箱" id='useremail'/>
							<label className="sr-only" for="username">姓名:</label>
							<input className='form-control' type="text" ref='userRegisterName' placeholder="姓名" id='username'/>
							<label className="sr-only" for="userpassword">密码:</label>
							<input className='form-control' type="text" ref='userRegisterPassword' placeholder="密码" id='userpassword'/>
							<label className="sr-only" for="userpassword">密码确认:</label>
							<input className='form-control' type="text" ref='userRegisterPasswordConfirm' placeholder="密码确认" id='userpassword'/>
							<FlatButton backgroundColor="#2196F3" className="start-but" onClick={this.onSubmitUser.bind(this)} label="开始"/>
					</form>
			)
		}
	}

	/**
	 * renderClubForm - render method of club user form
	 * <button onClick={this.onSubmitClub.bind(this)} className='btn btn-primary pull-right'>提交</button>
	 */
	renderClubForm() {
		if (this.state.signinMode) {
			return (
					<form className="form-signin">
						<label className="sr-only" for="clubemail">邮箱:</label>
						<input className='form-control' type="text" ref='clubLoginEmail' placeholder="邮箱" id='clubemail'/>
						<label className="sr-only" for="clubpassword">密码:</label>
						<input className='form-control' type="text" ref='clubLoginPassword' placeholder="密码" id='clubpassword'/>
						<FlatButton backgroundColor="#2196F3" className="start-but" onClick={this.onSubmitClub.bind(this)} label="开始"/>
					</form>
			);
		} else {
			return (
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
						<FlatButton backgroundColor="#2196F3" className="start-but" onClick={this.onSubmitClub.bind(this)} label="开始"/>
					</form>
			);
		}
	}

	renderForm(){
		if (this.state.userMode) {
			return(
				<div>
			  	{this.renderUserForm()}
    		</div>
			)
		}
		else {
			return(
				<div>
			  	{this.renderClubForm()}
    		</div>			)
		}
	}

	/**
	 * renderAccessForm - render method of user and club form
	 */
	 //onClick={switchClubMode.bind(this)}
	renderAccessForm(){

		return (
			<fieldset className="scheduler-border">
				<FlatButton className="access-form" label="用户" primary={this.state.userMode} onClick={this.switchUserMode.bind(this)}/>
				<FlatButton className="access-form" label="社团" primary={this.state.clubMode} onClick={this.switchClubMode.bind(this)}/>
				{this.renderForm()}
				<FlatButton className="access-form" label="登陆" primary={this.state.signinMode} onClick={this.switchSigninMode.bind(this)}/>
				<FlatButton className="access-form" label="注册" primary={this.state.signupMode} onClick={this.switchSignupMode.bind(this)}/>
			</fieldset>
		)
	}

	render() {
		return (
			<div className="row">
				<div className="col-sm-6 col-sm-3">
    			{this.renderAccessForm()}
    		</div>
			</div>
		);
	}
}

export default App;
