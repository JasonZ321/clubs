import React from 'react';

const ClubsDetail = ({club}) => {
	const { avatarURL, name, description, owner } = club;
	return (
		<div className="thumbnail">
			<img src={avatarURL} />
			<div className="caption">
				<h3>{name}</h3>
				<ul className="list-group">
					<li className="list-group-item"> Description: {description} </li>
					<li className="list-group-item"> Created By: {owner} </li>
				</ul>
			</div>
		</div>
	)
}

export default ClubsDetail;
