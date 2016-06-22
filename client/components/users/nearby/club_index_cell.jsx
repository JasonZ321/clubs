import React from 'react';
import { Link } from 'react-router';
import JoinButton from '../../common/join_button';
function renderJoinButton(authorized, joined, callbacks, clubId) {
	if (authorized) {
		return <JoinButton joined={joined} callbacks={callbacks} clubId={clubId} />;
	}
}
const ClubIndexCell = ({club, joined, callbacks, authorized}) => {
	const {avatarURL, name} = club;
	const url = `/club/${club._id}`;
	return (
		<li style={{'marginBottom': 20}} className="thumbnail">
				<img className='thumbnail' src={avatarURL} />
				<div className="caption">
					<Link to={url}><h3>{name}</h3></Link>
				</div>
				{renderJoinButton(authorized, joined, callbacks, club._id)}
		</li>
	);
}

export default ClubIndexCell;
