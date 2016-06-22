import React, {Component} from 'react';
import Modal from 'react-modal';
import AvatarUploader from '../../common/avatar_uploader';
import { Images } from '../../../../imports/collection/image';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class ActivityCreatePopup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarURL: null,
			startDate: null,
			endDate: null
		}
	}
	handleStartDateChange(event, date) {
		this.setState({
			startDate: date
		});
	}
	handleEndDateChange(event, date) {
		this.setState({
			endDate: date
		});
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
		const { name, location } = this.refs;

		const activity = {
			avatarURL: this.state.avatarURL,
			name: name.getValue(),
			location: location.getValue(),
			start_date: this.state.startDate,
			end_date: this.state.endDate
		}
		if (activity.avatarURL && activity.name && activity.location && activity.start_date) {
			this.props.onSubmit(activity);
		} else {
			console.log("Must fill all fields");
		}
	}
	cancel(event) {
		event.preventDefault();
		this.setState({
			avatarURL: null,
			startDate: null,
			endDate: null
		});
		this.props.onCancel();
	}
	render() {
		return (
			<div>
				<Modal isOpen={this.props.isOpen}>
          <h1>创建新活动</h1>
					<form className="form-signin">
							<AvatarUploader onImageUpload={this.onImageUpload.bind(this)} avatarURL={this.state.avatarURL} />
							<TextField hintText="活动名" ref='name'/>
							<TextField hintText="地点" ref='location'/>
							<DatePicker hintText="选择开始日期" value={this.state.startDate} onChange={this.handleStartDateChange.bind(this)} />
							<DatePicker hintText="选择结束时间" value={this.state.endDate} onChange={this.handleEndDateChange.bind(this)} />
							<RaisedButton onClick={this.submitNewActivity.bind(this)} label="创建" primary={true} />
							<RaisedButton onClick={this.cancel.bind(this)} label="取消" secondary={true} />
					</form>
        </Modal>
			</div>
		)
	}

}

export default ActivityCreatePopup;
