import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Images } from '../../../imports/collection/image';
import _ from 'lodash';
import { Clubs } from '../../../imports/collection/clubs';
import { browserHistory } from 'react-router';
import ClubHeader from './header/club_header';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

class ClubMain extends TrackerReact(Component) {
	render() {
		if (this.context.authorized) {
			return <div>Authorized page</div>
		}
		return <div>unauthorized page</div>
	}
}

ClubMain.contextTypes = {
  authorized: React.PropTypes.bool
};

export default ClubMain;
