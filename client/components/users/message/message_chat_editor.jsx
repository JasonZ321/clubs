import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { sendMessage } from '../../../../imports/api/user_api';
class MessageChatEditor extends Component {
	onSubmitMessage(e) {
		e.preventDefault();
		if (this.refs.messageInput.getValue()) {
			sendMessage(this.props.receiverId, this.refs.messageInput.getValue());
			this.refs.messageInput.getInputNode().value = null;
		}
	}
	render() {
		return (
			<div>
				<form>
					<TextField
			      floatingLabelText="说点什么"
			      multiLine={true}
						ref="messageInput"
			      rows={3}
			    /><br/>
					<RaisedButton onClick={this.onSubmitMessage.bind(this)} label="提交" primary={true} />
    		</form>
   		</div>
		)
	}
}

export default MessageChatEditor;
