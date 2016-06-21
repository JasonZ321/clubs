import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { submitComment } from '../../../../imports/api/activity_api';
class ActivityCommentEditor extends Component {
	onSubmitComment(e) {
		e.preventDefault();
		if (this.refs.commentInput.getValue()) {
			submitComment(this.props.activityId, this.refs.commentInput.getValue());
			this.refs.commentInput.getInputNode().value = null;
		}
	}
	render() {
		return (
			<div>
				<form>
					<TextField
			      floatingLabelText="写下你的评论"
			      multiLine={true}
						ref="commentInput"
			      rows={5}
			    /><br/>
					<RaisedButton onClick={this.onSubmitComment.bind(this)} label="提交" primary={true} />
    		</form>
   		</div>
		)
	}
}

export default ActivityCommentEditor;
