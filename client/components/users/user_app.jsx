import React, { Component } from 'react';
import UserHeaderContainer from './header/user_header_container';
import UserSidepanelContainer from './sidepanel/user_sidepanel_container';

class UserApp extends Component {
	render() {
		return (
			<div>
				<UserHeaderContainer />
					<div className='full col-sm-9'>
						<UserSidepanelContainer />
							{this.props.children}
					</div>
			</div>
		);
	}
}

export default UserApp;
