import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Images } from '../../../imports/api/image';
import _ from 'lodash';
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
					component.onImageUploadFinished(imageURL)
				}));

				const userId = Meteor.userId();
        Meteor.users.update(userId, {$set: {'profile.image': imageURL}})
				}
			});
		});
	}
	render() {
		return (
			<div>
				<span>
					<h1 className="text-center">Create club</h1>
				</span>
				<form>
					<fieldset className="form-group">
						<label>Name</label>
						<input type="text" className="form-control" placehoder="Enter a name" />
					</fieldset>
					<fieldset className="form-group" >
						<label>Description</label>
						<textarea className="form-control" rows="8"></textarea>
					</fieldset>
					<fieldset>
							<Dropzone onDrop={this.onImageUpload.bind(this)}>
                <div>Try dropping some files here, or click to select files to upload.</div>
              </Dropzone>
					</fieldset>
				</form>
				{this.renderImage()}
			</div>
		);
	}
	renderImage() {
		return <img src={this.state.tmpURL} width='100' height='100' />
	}
};


export default CreateClub;
