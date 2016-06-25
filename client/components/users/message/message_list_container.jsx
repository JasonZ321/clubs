import { composeWithTracker } from 'react-komposer';
import MessageList from './message_list';
import { Chats } from '../../../../imports/collection/chats';
function composer(props, onData) {
	const sender = Meteor.userId();
	if (Meteor.subscribe("chats", sender).ready()) {
		const chats = Chats.find({sender}, {sort: {'createdAt': -1}});
		onData(null, {chats});
	}
}

export default composeWithTracker(composer)(MessageList);
