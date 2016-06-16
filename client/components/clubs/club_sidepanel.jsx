import React, { Component } from 'react';
import AvatarUploader from './avatar_uploader';
import ClubDescriptionPanel from './club_description_panel';
import { Images } from '../../../imports/api/image';

class ClubSidePanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarURL: this.props.club.avatarURL
		};
	}
	onImageUploadFinished(url) {
		const clubId = this.props.club._id;
		const club = {avatarURL: url};
		debugger;
		Meteor.call("clubs.update", clubId, club, function(error, result) {
			if(error) {
				console.log("error", error);
			}
		});
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
				<AvatarUploader onImageUpload={this.onImageUpload.bind(this)} avatarURL={this.state.avatarURL} />
				<ClubDescriptionPanel club={this.props.club} />
			</div>
		)
	}
}

export default ClubSidePanel;
