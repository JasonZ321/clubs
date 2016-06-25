import { composeWithTracker } from 'react-komposer';
import MessageListCell from './message_list_cell';

function composer(props, onData) {
	const chat = props.chat;
	if (Meteor.subscribe("user", chat.receiver).ready()) {
		const senderId = chat.sender;
		const receiver = Meteor.users.findOne({receiver: chat.receiver});
		const lastMesssage = chat.messages[chat.messages.length - 1];
		onData(null, {senderId, receiver, lastMesssage});
	}
}

export default composeWithTracker(composer)(MessageListCell);
