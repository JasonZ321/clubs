import React from 'react';
import ActivityCommentCellContainer from './activity_comment_cell_container';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

function renderCommentList(comments) {
	return comments.map(comment => <ActivityCommentCellContainer key={comment._id} comment={comment}/>);
}

const ActivityCommentList = (props) =>  {

	return (
		<div>
			<List>
	      <Subheader>评论</Subheader>
	  		{renderCommentList(props.comments)}
			</List>
	  </div>
	);
}

export default ActivityCommentList;
