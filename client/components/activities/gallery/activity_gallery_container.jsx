import { composeWithTracker } from 'react-komposer';
import { ActivityImage } from '../../../../imports/collection/activity_image';
import ActivityGallery from './activity_gallery';

function composer(props, onData) {
	const activityId = props.activityId;
	if (Meteor.subscribe("activityGallery", activityId).ready()) {
		const activityImages = ActivityImage.find({activityId}, { sort: {'start_date': -1 }}).fetch();
		onData(null, {activityId, activityImages});
	}
}

export default composeWithTracker(composer)(ActivityGallery);
