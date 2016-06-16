import React from 'react';

const ActivityIndexCell = ({activity, key}) => {
	const {avatarURL, name, start_date, end_date, location} = activity;
	return (
		<li key={key} className="thumbnail">
				<img className='thumbnail' src={avatarURL} />
				<div className="caption">
					<h3>{name}</h3>
					<ul>
						<li key='location' className="list-group-item"> 地点: {location} </li>
						<li key='start_date' className="list-group-item"> 开始时间: {start_date.toDateString()}</li>
						<li key='end_date' className="list-group-item"> 结束时间: {end_date.toDateString()}</li>
					</ul>
				</div>
		</li>
	);
}

export default ActivityIndexCell;
