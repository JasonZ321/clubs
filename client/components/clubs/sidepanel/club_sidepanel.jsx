import React, { Component } from 'react';
import AvatarUploader from '../../common/avatar_uploader';
import ClubDescriptionPanel from './club_description_panel';
import ClubMembersSidepanelContainer from './club_members_sidepanel_container';
import { createImageFiles } from '../../../../imports/api/image_api';
import { updateClub } from '../../../../imports/api/club_api';
import { Images } from '../../../../imports/collection/image';

class ClubSidePanel extends Component {
	constructor(props) {
		super(props);
		this.mapPropsToState(props);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.club._id === this.props.club._id) {
			return;
		}
		this.mapPropsToState(nextProps);
	}
	mapPropsToState(props) {
		const { club: { avatarURL } } = props;
		this.state = { avatarURL };
	}
	onImageUploadFinished(url) {
		const clubId = this.props.club._id;
		const club = {avatarURL: url};
		updateClub(clubId, club, () => {
			this.setState({
				avatarURL: url
			});
		});
	}
	onImageUpload(files) {
		createImageFiles(files, (imageURL) => {
			this.onImageUploadFinished(imageURL);
		});
	}
	render() {
		return (
			<div className='col-md-6'>
				<div>{this.props.club.name}</div>
				<AvatarUploader onImageUpload={this.onImageUpload.bind(this)} avatarURL={this.state.avatarURL} />
				<ClubDescriptionPanel club={this.props.club} />
				<ClubMembersSidepanelContainer club={this.props.club} />
			</div>
		)
	}
}

export default ClubSidePanel;
