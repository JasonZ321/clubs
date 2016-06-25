import { composeWithTracker } from 'react-komposer';
import { Chats } from '../../../../imports/collection/chats';
import { getIdByURL } from '../../../../imports/util/common_util';
import MessageChat from './message_chat';
function composer(props, onData) {
	const url = props.location.pathname;
	const senderId = getIdByURL(url, "/user/");
	const receiverId = getIdByURL(url, "/messages/");
	if (Meteor.subscribe("users", [senderId, receiverId]).ready()) {
		const sender = Meteor.users.findOne({'_id': senderId});
		const receiver = Meteor.users.findOne({'_id': receiverId});
		if (Meteor.subscribe("chat", sender._id, receiverId).ready()) {
			const chat = Chats.findOne({sender: sender._id, receiver: receiverId});
			if (chat) {
				onData(null, {sender, receiver, messages: chat.messages});
			} else {
				onData(null, {sender, receiver, messages: []});
			}
		}
	}
}

export default composeWithTracker(composer)(MessageChat);
