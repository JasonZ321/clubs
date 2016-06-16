import React from 'react';
import { Link } from 'react-router';
import JoinButton from '../../common/join_button';
const ClubIndexCell = ({club, key, joined, callbacks}) => {
	const {avatarURL, name} = club;
	const url = `/club/${club._id}`;
	return (
		<li key={key} className="thumbnail">
				<img className='thumbnail' src={avatarURL} />
				<div className="caption">
					<Link to={url}><h3>{name}</h3></Link>
				</div>
				<JoinButton joined={joined} callbacks={callbacks} targetId={club._id} />
		</li>
	);
}

export default ClubIndexCell;
