import React, { Component } from 'react';
class UserMain extends Component {
	render() {
		
		if (this.context.authorized) {
			return <div>Authorized page</div>
		}
		return <div>unauthorized page</div>
	}
}

UserMain.contextTypes = {
  authorized: React.PropTypes.bool
};

export default UserMain;
