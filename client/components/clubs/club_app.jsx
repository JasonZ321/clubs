import React, { Component } from 'react';
import ClubHeaderContainer from './header/club_header_container';
import ClubSidePanelContainer from './sidepanel/club_sidepanel_container';

class ClubApp extends Component {
	render() {
		return (
			<div>
				<ClubHeaderContainer />
				<div className='full col-sm-9'>
					<ClubSidePanelContainer />
						{this.props.children}
				</div>
			</div>
		);
	}
}

export default ClubApp;
