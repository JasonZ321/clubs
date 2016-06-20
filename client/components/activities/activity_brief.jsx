import React, { Component } from 'react';
import AvatarUploader from '../common/avatar_uploader';

class ActivityBrief extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarURL: this.props.activity.avatarURL
		}
	}
	onImageUpload(files) {
		let component = this;
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
								component.setState({
									avatarURL: imageURL
								});
						}, 1000);

					}));
				}
			});
		});
	}
	renderAvatar() {
		if (this.context.authorized) {
			return <AvatarUploader onImageUpload={this.onImageUpload.bind(this)} avatarURL={this.state.avatarURL} />;
		} else {
			return <img className='thumbnail' src={this.props.activity.avatarURL} />;
		}
	}
	render() {

		const {avatarURL, location, clubId, start_date, end_date} = this.props.activity;
		return (
			<div>
					<h2>活动简介</h2>
					<div className="thumbnail">
							{this.renderAvatar()}
							<div className="caption">
								<h3>{name}</h3>
								<ul>
									<li key='location' className="list-group-item"> 地点: {location} </li>
									<li key='club' className="list-group-item"> 社团: {clubId}</li>
									<li key='start_date' className="list-group-item"> 开始时间: {start_date.toDateString()}</li>
									<li key='end_date' className="list-group-item"> 结束时间: {end_date.toDateString()}</li>
								</ul>
							</div>
					</div>
   		</div>
		);
	}
}

ActivityBrief.contextTypes = {
	authorized: React.PropTypes.bool
}

export default ActivityBrief;
