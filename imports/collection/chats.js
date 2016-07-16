import { Mongo } from 'meteor/mongo';

function addMessage(sender, receiver, content, recordSender) {
	const message = Chats.findOne({sender, receiver});
	if (message) {
		Chats.update({sender, receiver},  { $addToSet : { "messages" :  {sender: recordSender, content, date: new Date()}}});
	} else {
		const data = {createdAt: new Date(), sender, receiver};
		Chats.schema.validate(data);
		Chats.insert(data, function(error, result) {
			if (error) {
				console.log("error", error);
			} else {
				Chats.update({_id: result},  { $addToSet : { "messages" :  {sender: recordSender, content, date: new Date()}}});
			}
		});
	}
}

Meteor.methods({
	'message.send': function({receiver, content}){
		const sender = this.userId;
		addMessage(sender, receiver, content, sender);
		addMessage(receiver, sender, content, sender);
	},
	'chats.remove': function(receiver) {
		Chats.remove({sender: this.userId, receiver});
	}
});
// structure like this
// {
// 	sender: current userId,
// 	receiver: user id that receive the message
// 	messages: [
// 		{sender: the user send the message, content: message content },
// 		...
// 	]
// }
export const Chats = new Mongo.Collection('chats');
Chats.schema = new SimpleSchema({
	sender: {type: String},
	receiver: {type: String},
	createdAt: {type: Date},
	messages: {type: [Object], optional: true}
});
