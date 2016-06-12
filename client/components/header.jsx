import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import Accounts from './accounts';
class Header extends Component {
	onCreateClubClick(event) {
		event.preventDefault();
		browserHistory.push("/create_club");
	}
	render() {
		return (
			<nav className="nav navbar-default">
				<div className="navbar-header" >
					<Link to="/" className="navbar-brand" >Clubs</Link>
				</div>
				<ul className="nav navbar-nav navbar-right">
					<li>
						<Accounts />
					</li>
					<li>
						<a href="#" onClick={this.onCreateClubClick.bind(this)}>Create club</a>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Header;
