import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Images } from '../../../imports/api/image';
import _ from 'lodash';
import { Clubs } from '../../../imports/api/clubs';
import { browserHistory } from 'react-router';
import ClubHeader from './club_header';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

class ClubMain extends TrackerReact(Component) {
	render() {
		return <div>Main page</div>
	}
}

export default ClubMain;
