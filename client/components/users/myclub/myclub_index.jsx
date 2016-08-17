import React, { Component } from 'react';
import ClubIndexCell from '../nearby/club_index_cell';

class MyclubIndex extends Component {
	renderClubs() {
		const authorized = this.context.authorized;
		const clubCallbacks = this.props.clubCallbacks;
		return this.props.clubs.map((club) => {
			return <ClubIndexCell key={club._id} callbacks={clubCallbacks} club={club} joined={true} authorized={authorized}/>;
		});
	}
	render() {
		return (
			<div className='col-md-6'>
				<ul>{this.renderClubs()}</ul>
			</div>
		);
	}
};

MyclubIndex.contextTypes = {
	authorized: React.PropTypes.bool
};

export default MyclubIndex;
