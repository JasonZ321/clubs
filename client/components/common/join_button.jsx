import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';

class JoinButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			joined: this.props.joined
		}
	}
	toggleJoinedState() {
		this.setState({
			joined: !this.state.joined
		});
		const { callbacks } = this.props;
		const { activityId, clubId } = this.props;
		if (callbacks.userJoinClub && !this.state.joined) {
			callbacks.userJoinClub(clubId);
		}
		if (callbacks.userQuitClub && this.state.joined) {
			callbacks.userQuitClub(clubId);
		}
		if (callbacks.userJoinActivity && !this.state.joined) {
			callbacks.userJoinActivity(activityId, clubId);
		}
		if (callbacks.userQuiteActivity && this.state.joined) {
			callbacks.userQuiteActivity(activityId);
		}
	}
	render() {
		if (this.state.joined) {
			return <FlatButton onClick={this.toggleJoinedState.bind(this)} primary={true} label="已加入"/>
		} else {
			return <FlatButton onClick={this.toggleJoinedState.bind(this)} secondary={true} label="加入"/>
		}
	}
}

JoinButton.contextTypes = {
	authorized: React.PropTypes.bool
}

export default JoinButton;
