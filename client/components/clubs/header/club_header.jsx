import React from 'react';
import { Link } from 'react-router';

const ClubHeader = ({club, onLogout}) => {
		const clubId = club._id;
		const mainURL =`/club/${clubId}`;
		const activityURL = `/club/${clubId}/activity`;
		const postURL = `/club/${clubId}/post`;
		const managementURL = `/club/${clubId}/management`;
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
					<a href='#' onClick={onLogout}>退出</a>
				</div>
			</nav>
		);
};

export default ClubHeader;
