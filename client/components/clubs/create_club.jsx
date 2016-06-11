import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Images } from '../../../imports/api/image';
import _ from 'lodash';
import { browserHistory } from 'react-router';

class CreateClub extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tmpURL: null
		};
	}
	onImageUploadFinished(url) {
		this.setState({
			tmpURL: url
		});
	}
	onImageUpload(files) {
		let component = this;
		console.log(this.state.tmpURL);
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
	onSubmitClub(event) {
		event.preventDefault();
		const club = {avatarURL: this.state.tmpURL, name: this.refs.name.value, description: this.refs.description.value };
		Meteor.call("clubs.insert", club, function(error, result){
			if(error){
				console.log("error", error);
			}
			if(result){
				// TODO: Navigate to home page of the created club
				browserHistory.push("/");
			}
		});
	}
	render() {
		return (
			<div>
				<span>
					<h1 className="text-center">Create club</h1>
				</span>
				<form onSubmit={this.onSubmitClub.bind(this)}>
					<fieldset className="form-group">
						<label>Name</label>
						<input type="text" ref='name' className="form-control" placehoder="Enter a name" />
					</fieldset>
					<fieldset className="form-group" >
						<label>Description</label>
						<textarea className="form-control" ref='description' rows="8"></textarea>
					</fieldset>
					<fieldset>
							<Dropzone onDrop={this.onImageUpload.bind(this)}>
                <div>Try dropping some files here, or click to select files to upload.</div>
              </Dropzone>
					</fieldset>
					<button className='btn btn-primary'>Submit</button>
				</form>
				{this.renderImage()}

			</div>
		);
	}
	renderImage() {
		return <img src={this.state.tmpURL} width='256' height='256' />
	}
};

export default CreateClub;
