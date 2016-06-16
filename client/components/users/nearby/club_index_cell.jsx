import React from 'react';

const ClubIndexCell = ({club, key}) => {
	const {avatarURL, name} = club;
	return (
		<li key={key} className="thumbnail">
				<img className='thumbnail' src={avatarURL} />
				<div className="caption">
					<h3>{name}</h3>
				</div>
		</li>
	);
}

export default ClubIndexCell;
