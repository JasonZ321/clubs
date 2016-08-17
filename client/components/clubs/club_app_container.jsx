import React from 'react'
import { Clubs } from '../../../imports/collection/clubs';
import ClubApp from './club_app';
import { composeWithTracker } from 'react-komposer';
import { getIdByURL } from '../../../imports/util/common_util';

/**
 * composer
 * @summary 获取社团数据，确认当前登录的用户是否是该社团的管理员用户
 *
 * @param  {type} props  component的props
 * @param  {type} onData 用作设置component数据的回调函数
 */
function composer(props, onData) {
  if (Meteor.subscribe('currentClub').ready()) {
    var club = Clubs.findOne({});
    const url = props.location.pathname;
    const clubIdFromURL = getIdByURL(url, "/club/");

		if (club && club._id === clubIdFromURL) {
			onData(null, {club, 'authorized': true});
		} else {
			if (Meteor.subscribe("club", clubIdFromURL).ready()) {
				club = Clubs.findOne({'_id': clubIdFromURL});
				onData(null, {club, 'authorized': false});
			}
		}
  };
}

export default composeWithTracker(composer)(ClubApp);
