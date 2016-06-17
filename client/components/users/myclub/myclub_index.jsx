import React, { Component } from 'react';
import ClubIndexCell from '../nearby/club_index_cell';

const MyclubIndex = ({clubs, clubCallbacks}) => {
	return (
		<div className='col-md-6'>
			{
				clubs.map((club) => {
					return <ClubIndexCell key={club._id} callbacks={clubCallbacks} club={club} joined={true}/>;
				})
			}
		</div>
	)
};

export default MyclubIndex;
