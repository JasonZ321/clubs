import React, { Component } from 'react';
import {browserHistory} from 'react-router';

class LoginRegisterPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userLoginMode: true,
			clubLoginMode: true
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
				Meteor.loginWithPassword(userLoginEmail.value, userLoginPassword.value, function (error) {
					if (error) {
						alert('wrong password or email!');
					} else {
						browserHistory.push('/');
					}
				})
			} else {
				alert('Invalid input!');
				return;
			}
		} else {
			const { userRegisterName, userRegisterEmail, userRegisterPassword, userRegisterPasswordConfirm } = this.refs;
			const userObject = {
				'email': userRegisterEmail.value,
				'password': userRegisterPassword.value,
				'profile': {'name' :userRegisterName.value},
				'isClubUser': false
			};

			Accounts.createUser(userObject, function(error){
				if (error) {
					console.log(error);
				} else {
					browserHistory.push('/');
				}
			});
		}
	}
	onSubmitClub(event) {
		event.preventDefault();
		if (this.state.clubLoginMode) {
			const {clubLoginEmail, clubLoginPassword} = this.refs;
			if (clubLoginEmail.value && clubLoginPassword.value) {
				Meteor.loginWithPassword(clubLoginEmail.value, clubLoginPassword.value, function (error) {
					if (error) {
						alert('wrong password or email!');
					} else {
						browserHistory.push('/');
					}
				})
			} else {
				alert('Invalid input!');
				return;
			}
		} else {
			const {clubRegisterName, clubRegisterCity, clubRegisterEmail, clubRegisterPassword, clubRegisterPasswordConfirm} = this.refs;

			const userObject = {
				'email': clubRegisterEmail.value,
				'password': clubRegisterPassword.value,
				'profile': {'city': clubRegisterCity.value},
				'profile': {'name': clubRegisterName.value},
				'isClubUser': true
			};

			Accounts.createUser(userObject, function(error){
				if (error) {
					console.log(error);
				} else {
					browserHistory.push('/');
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

export default LoginRegisterPage;
