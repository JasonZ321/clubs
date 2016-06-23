import React, { Component } from 'react';
import AvatarUploader from '../../common/avatar_uploader';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import { Images } from '../../../../imports/collection/image';
import { addFriend, removeFriend } from '../../../../imports/api/user_api';

class UserSidePanel extends Component {
	constructor(props) {
		super(props);
		if (this.props.user && this.props.user.profile) {
			this.state = {
				avatarURL: this.props.user.profile.avatarURL,
				relationship: this.props.relationship
			};
		} else {
			this.state = {
				avatarURL: null,
				relationship: this.props.relationship
			}
		}

	}
	onImageUploadFinished(url) {
		const userId = this.props.user._id;
		Meteor.users.update({_id:userId}, { $set:{"profile.avatarURL":url} });
		this.setState({
			avatarURL: url
		});
	}
	onImageUpload(files) {
		let component = this;
		console.log(this.state.avatarURL);
		_.each(files, function(file) {
			file.owner = Meteor.userId();
			Images.insert(file, function(err, fileObj){
				if (err) {
					console.log(err);
				} else {
					const imageURL = 'http://localhost:3000/cfs/files/images/' + fileObj._id;

					fileObj.on('uploaded', Meteor.bindEnvironment(function() {
						// TODO: image still not uploaded at this point for some reason.
						// work around set time out
						setTimeout(function () {
								component.onImageUploadFinished(imageURL)
						}, 1000);

					}));
				}
			});
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
		debugger;
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
