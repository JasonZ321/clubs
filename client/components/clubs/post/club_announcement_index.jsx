import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';


function renderAnnouncements(announcements) {
	return announcements.map(announcement => <ListItem primaryText={announcement.title}/>);
}

const ClubAnnouncementIndex = (props) => {
	return (
		<div>
			<List>
      <Subheader>公告</Subheader>
      {renderAnnouncements(props.announcements)}
    </List>
  	</div>
	);
}

export default ClubAnnouncementIndex;
