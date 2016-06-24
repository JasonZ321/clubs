import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'messages.send': function({receiver, content}){
		const message = Messages.findOne({sender: this.userId, receiver});
		if (message) {
			Messages.update({sender: this.userId, receiver},  { $addToSet : { "messages" :  content}});
		} else {
			Messages.insert({createdAt: new Date(), sender: this.userId, receiver}, function(error, result) {
				if (error) {
					console.log("error", error);
				} else {
					Messages.update({_id: result},  { $addToSet : { "messages" :  content}});
				}
			});
		}
	},
	'messages.remove': function(receiver) {
		Messages.remove({sender: this.userId, receiver});
	}
});

export const Messages = new Mongo.Collection('messages');
