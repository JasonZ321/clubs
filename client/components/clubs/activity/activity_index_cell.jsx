import React from 'react';
import JoinButton from '../../common/join_button';
import { Link } from 'react-router';
function renderJoinButton(authorized, joined, callbacks, targetId) {
	if (authorized) {
		return <li className="list-group-item"><JoinButton joined={joined} callbacks={callbacks} targetId={targetId} /></li>
	}
}
const ActivityIndexCell = ({activity, callbacks, authorized, joined}) => {
	const {avatarURL, name, start_date, end_date, location, clubId} = activity;
	const activityURL = `/club/${clubId}/activity/${activity._id}`;
	return (
		<li className="thumbnail">
				<img className='thumbnail' src={avatarURL} />
				<div className="caption">
					<Link to={activityURL}><h3>{name}</h3></Link>
					<ul>
						<li key='location' className="list-group-item"> 地点: {location} </li>
						<li key='club' className="list-group-item"> 社团: {clubId}</li>
						<li key='start_date' className="list-group-item"> 开始时间: {start_date.toDateString()}</li>
						<li key='end_date' className="list-group-item"> 结束时间: {end_date.toDateString()}</li>
						{renderJoinButton(authorized, joined, callbacks, activity._id)}
					</ul>
				</div>
		</li>
	);
}

export default ActivityIndexCell;
