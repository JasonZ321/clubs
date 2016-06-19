import React, {Component} from 'react';

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
		const { targetId } = this.props;
		if (callbacks.userJoinClub && !this.state.joined) {
			callbacks.userJoinClub(targetId);
		}
		if (callbacks.userQuitClub && this.state.joined) {
			callbacks.userQuitClub(targetId);
		}
		if (callbacks.userJoinActivity && !this.state.joined) {
			callbacks.userJoinActivity(targetId);
		}
		if (callbacks.userQuiteActivity && this.state.joined) {
			callbacks.userQuiteActivity(targetId);
		}
	}
	render() {
		if (this.state.joined) {
			return <div onClick={this.toggleJoinedState.bind(this)} className='alert alert-success'>已加入</div>
		} else {
			return <div onClick={this.toggleJoinedState.bind(this)} className='alert alert-info'>加入</div>
		}
	}
}

JoinButton.contextTypes = {
	authorized: React.PropTypes.bool
}

export default JoinButton;
