import React, { Component } from 'react';
import AvatarUploader from '../../common/avatar_uploader';
import { Images } from '../../../../imports/api/image';

class UserSidePanel extends Component {
	constructor(props) {
		super(props);
		if (this.props.user && this.props.user.profile) {
			this.state = {
				avatarURL: this.props.user.profile.avatarURL
			};
		} else {
			this.state = {
				avatarURL: null
			}
		}

	}
	onImageUploadFinished(url) {
		const userId = this.props.user._id;
		const user = {profile: {avatarURL: url}};
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
	render() {
		return (
			<div className='col-md-6'>
				<div>{this.props.user.name}</div>
				<AvatarUploader onImageUpload={this.onImageUpload.bind(this)} avatarURL={this.state.avatarURL} />
			</div>
		)
	}
}

export default UserSidePanel;
