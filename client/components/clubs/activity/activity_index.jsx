import React, { Component } from 'react';
import ActivityIndexCellContainer from './activity_index_cell_container';
import ActivityCreatePopup from './activity_create_popup';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { createActivity } from '../../../../imports/api/activity_api';

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
	onCreateActivity(activity) {
		createActivity(activity, () => {
			this.closePopup();
		});
	}
	renderActivityList() {
		return this.props.activities.map(activity => <ActivityIndexCellContainer key={activity._id} activity={activity}/>);
	}
	renderCreateActivityButton() {
		if (this.context.authorized) {
				return (
					<div style={{'text-align': 'right', 'marginBottom': 20}} >
						<FloatingActionButton onClick={this.openPopup} ><ContentAdd /></FloatingActionButton>
						<ActivityCreatePopup isOpen={this.state.popupOpen} onCancel={this.cancelActivityCreate.bind(this)} onSubmit={this.onCreateActivity.bind(this)}/>
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
