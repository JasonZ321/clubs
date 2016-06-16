import React, {Component} from 'react';
import Modal from 'react-modal';
import AvatarUploader from '../../common/avatar_uploader';
import { Images } from '../../../../imports/api/image';

class ActivityCreatePopup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarURL: null
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
	submitNewActivity(event) {
		event.preventDefault();
		const { name, location, start_date, end_date } = this.refs;
		const activity = {
			avatarURL: this.state.avatarURL,
			name: name.value,
			location: location.value,
			start_date: new Date(),
			end_date: new Date()
		}
		this.props.onSubmit(activity);
	}
	cancel(event) {
		event.preventDefault();
		this.props.onCancel();
	}
	render() {
		return (
			<div>
				<Modal isOpen={this.props.isOpen}>
          <h1>创建新活动</h1>
					<form className="form-signin">
							<AvatarUploader onImageUpload={this.onImageUpload.bind(this)} avatarURL={this.state.avatarURL} />
							<label className="sr-only" for="name">活动名:</label>
							<input className='form-control' type="text" ref='name' placeholder="活动名" id='name'/>
							<label className="sr-only" for="location">地点:</label>
							<input className='form-control' type="text" ref='location' placeholder="地点" id='location'/>
							<button onClick={this.submitNewActivity.bind(this)} className='btn btn-primary'>创建</button>
							<button onClick={this.cancel.bind(this)} className='btn btn-danger'>取消</button>
					</form>
        </Modal>
			</div>
		)
	}

}

export default ActivityCreatePopup;
