import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Images } from '../../../imports/api/image';
import _ from 'lodash';
import { Clubs } from '../../../imports/api/clubs';
import { browserHistory } from 'react-router';
import ClubHeader from './club_header';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

class ClubMain extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		const subscription = Meteor.subscribe('currentClub');
		 this.state = {
			 ready: subscription.ready(),
			 subscription: subscription
		 }
		const club = Clubs.findOne(this.getIdByURL());
		this.state = {
			avatarURL: null
		};
	}
	onImageUploadFinished(url) {
		const clubId = this.getIdByURL();
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
	getIdByURL() {
		var pathname = this.props.location.pathname;
		if (pathname) {
			return pathname.substr(pathname.lastIndexOf("/")+1);
		}
		console.log("Can't get correct club id");
		return null;
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
			<div>
				<Dropzone onDrop={this.onImageUpload.bind(this)}>
					<img src={this.state.avatarURL} width='256' height='256' />
				</Dropzone>
			</div>
		);
	}
}

export default ClubMain;
