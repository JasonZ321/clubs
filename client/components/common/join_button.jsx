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
		if (callbacks.joinClub && !this.state.joined) {
			callbacks.joinClub(targetId);
		}
		if (callbacks.unjoinClub && this.state.joined) {
			callbacks.unjoinClub(targetId);
		}
		if (callbacks.joinActivity && !this.state.joined) {
			callbacks.joinActivity(targetId);
		}
		if (callbacks.unjoinActivity && this.state.joined) {
			callbacks.unjoinActivity(targetId);
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

export default JoinButton;
