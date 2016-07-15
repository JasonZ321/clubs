import React from 'react';
import {composeWithTracker} from 'react-komposer';
import {Announcements} from '../../../../imports/collection/announcements';
import {Articles} from '../../../../imports/collection/articles';
import ClubPostIndex from './club_post_index';
import { getIdByURL } from '../../../../imports/util/common_util';

function composer(props, onData) {
	const url = props.location.pathname;
	const clubId = getIdByURL(url, "/club/");
	if(Meteor.subscribe("announcements", clubId)) {
		const announcements = Announcements.find({clubId}, { sort: {'createdAt': -1 }}).fetch();
		if (Meteor.subscribe("articles", clubId)) {
			const articles = Articles.find({clubId}, { sort: {'createdAt': -1 }}).fetch();
			onData(null, {announcements, articles, clubId});
		}
	}
}

export default composeWithTracker(composer)(ClubPostIndex);
