import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Clubs } from '../../../imports/api/clubs';
import { browserHistory } from 'react-router';
import ClubHeaderContainer from './club_header_container';
import ClubSidePanelContainer from './club_sidepanel_container';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

class ClubApp extends Component {
	render() {
		return (
			<div>
				<ClubHeaderContainer onLogout={this.logout}/>
				<div className='full col-sm-9'>
					<ClubSidePanelContainer />
						{this.props.children}
				</div>
			</div>
		);
	}
}

export default ClubApp;
