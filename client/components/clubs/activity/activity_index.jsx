import React, { Component } from 'react';
import ActivityIndexCell from './activity_index_cell';
import ActivityCreatePopup from './activity_create_popup';

class ClubActivityIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			popupOpen: false
		};
		this.openPopup = this.openPopup.bind(this);
		this.closePopup = this.closePopup.bind(this);
	}
	openPopup() {
		this.setState({
			popupOpen: true
		});
	}
	closePopup() {
		this.setState({
			popupOpen: false
		});
	}
	cancelActivityCreate() {
		this.closePopup();
	}
	createActivity(activity) {
		const component = this;
		Meteor.call('activities.insert', activity, function(error, result) {
			if (error) {
				console.log("Error in creating activity");
			} else {
				console.log("Activity {} created.", activity.name);
			}
			component.closePopup();
		});
	}
	renderActivityList() {
		return this.props.activities.map(activity => <ActivityIndexCell key={activity._id} activity={activity}/>);
	}
	renderCreateActivityButton() {
		if (this.context.authorized) {
				return (
					<div>
						<button onClick={this.openPopup} className='btn btn-primary pull-right'>创建活动</button>
						<ActivityCreatePopup isOpen={this.state.popupOpen} onCancel={this.cancelActivityCreate.bind(this)} onSubmit={this.createActivity.bind(this)}/>
			    </div>
				);
		}
	}
	render() {
		return (
			<div className='col-md-6'>
				{this.renderCreateActivityButton()}
				<ul>
					{this.renderActivityList()}
				</ul>
			</div>
		);
	}
}

ClubActivityIndex.contextTypes = {
	authorized: React.PropTypes.bool
};


export default ClubActivityIndex;
