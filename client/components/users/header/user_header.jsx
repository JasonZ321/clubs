import React from 'react';
import { Link } from 'react-router';

const UserHeader = ({user, onLogout}) => {
		const userId = user._id;
		const mainURL =`/user/${userId}`;
		const nearbyURL = `/user/${userId}/nearby`;
		const myactivityURL = `/user/${userId}/myactivity`;
		const myclubURL = `/user/${userId}/myclub`;
		return (
			<nav className="nav navbar-default">
				<div className="navbar-header" >
					<div className="navbar-brand" >团团</div>
				</div>
				<ul className="nav navbar-nav navbar-left">
					<li>
						<Link to={mainURL} className="navbar-brand" >首页</Link>
					</li>
					<li>
						<Link to={nearbyURL} className="navbar-brand" >附近</Link>
					</li>
					<li>
						<Link to={myclubURL} className="navbar-brand" >我的社团</Link>
					</li>
					<li>
						<Link to={myactivityURL} className="navbar-brand" >我的活动</Link>
					</li>
				</ul>
				<div>
					<a href='#' onClick={onLogout}>退出</a>
				</div>
			</nav>
		);
};

export default UserHeader;
