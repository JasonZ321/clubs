import React from 'react';
import JoinButton from '../../common/join_button';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

function renderJoinButton(authorized, joined, callbacks, activityId, clubId) {
	if (authorized) {
		return <JoinButton joined={joined} callbacks={callbacks} activityId={activityId} clubId={clubId} />
	}
}


const ActivityIndexCell = ({club ,activity, callbacks, authorized, joined}) => {
	const activityURL = `/club/${activity.clubId}/activity/${activity._id}`;
	return (
	  <Card style={{'marginBottom': 20}}>
	    <CardHeader
	      title={club.name}
				subtitle={club.city}
	      avatar={club.avatarURL}
	    />
	    <CardMedia>
	      <img src={activity.avatarURL} />
	    </CardMedia>
	    <CardTitle title={activity.name} subtitle={activity.location} />
	    <CardText>
	      <span>开始时间: {activity.start_date.toDateString()}</span><br />
				<span>结束时间: {activity.end_date.toDateString()}</span>
	    </CardText>
	    <CardActions>
	      <FlatButton label="查看详细" linkButton={true} href={activityURL}/>
	      {renderJoinButton(authorized, joined, callbacks, activity._id, club._id)}
	    </CardActions>
	  </Card>
	);

}

export default ActivityIndexCell;
