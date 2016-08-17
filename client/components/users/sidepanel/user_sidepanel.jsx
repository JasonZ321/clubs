import React, { Component } from 'react';
import AvatarUploader from '../../common/avatar_uploader';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import { Images } from '../../../../imports/collection/image';
import { addFriend, removeFriend } from '../../../../imports/api/user_api';
import { createImageFiles } from '../../../../imports/api/image_api';
import { updateUser } from '../../../../imports/api/user_api';

class UserSidePanel extends Component {
	constructor(props) {
		super(props);
		this.mapPropsToState(props);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.user._id === this.props.user._id) {
			return;
		}
		this.mapPropsToState(nextProps);
	}
	mapPropsToState(props) {
		// equals const profile = props.user.profile.avatarURL
		const {relationship, user, user:{profile:{avatarURL}}} = props;
		if (user && avatarURL) {
			this.state = {
				avatarURL: avatarURL,
				relationship: relationship
			};
		} else {
			this.state = {
				avatarURL: null,
				relationship: relationship
			}
		}
	}
	onImageUploadFinished(url) {
		const userId = this.props.user._id;
		const user = {'profile.avatarURL': url};
		updateUser(userId, user, () => {
			this.setState({
				avatarURL: url
			});
		});
	}
	onImageUpload(files) {
		createImageFiles(files, (imageURL) => {
			this.onImageUploadFinished(imageURL);
		});
	}
	onAddFriend() {
		addFriend(this.props.user._id, function() {
			this.setState({
				relationship: 'friend'
			});
		}.bind(this));
	}
	onRemoveFriend() {
		removeFriend(this.props.user._id, function() {
			this.setState({
				relationship: 'stranger'
			});
		}.bind(this));
	}
	renderUserName() {
		if (this.state.relationship === 'friend') {
			return <FlatButton secondary={true}  label="取消好友" onClick={this.onRemoveFriend.bind(this)}/>;
		}
		if (this.state.relationship === 'stranger') {
			return <RaisedButton icon={<SocialPersonAdd />} onClick={this.onAddFriend.bind(this)}/>;
		}
		return <div></div>;
	}
	render() {
		return (
			<div className='col-md-6'>
				<div>
		   		<span style={{'marginRight': 20}}>{this.props.user.profile.name}</span>
					{this.renderUserName()}
		   	</div>
				<AvatarUploader onImageUpload={this.onImageUpload.bind(this)} avatarURL={this.state.avatarURL} />
			</div>
		)
	}
}

export default UserSidePanel;
