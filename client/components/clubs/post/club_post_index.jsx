import React, { Component } from 'react';
import ClubAnnouncementIndex from './club_announcement_index';
import ClubArticleIndex from './club_article_index';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PostCreatePopup from './post_create_popup';
import { createArticle, createAnnouncement } from '../../../../imports/api/post_api';

class ClubPostIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			popupOpen: false
		};
		this.openPopup = this.openPopup.bind(this);
		this.closePopup = this.closePopup.bind(this);
	}
	openPopup() {
		this.setState({
			popupOpen: true
		});
	}
	closePopup() {
		this.setState({
			popupOpen: false
		});
	}
	onCreatePost(title, content, articleSelected) {
		const {clubId} = this.props;
		if (articleSelected) {
			createArticle({title, content, clubId}, () => {
				this.closePopup();
			});
		} else {

			createAnnouncement({title, content, clubId}, () => {
				this.closePopup();
			});
		}
	}
	cancelPostCreate() {
		this.closePopup();
	}
	renderAddPostButton() {
		if (this.context.authorized) {
				return (
					<div style={{'text-align': 'right', 'marginBottom': 20}} >
						<FloatingActionButton onClick={this.openPopup} ><ContentAdd /></FloatingActionButton>
						<PostCreatePopup isOpen={this.state.popupOpen} onCancel={this.cancelPostCreate.bind(this)} onSubmit={this.onCreatePost.bind(this)}/>
			    </div>
				);
		}
	}
	render() {
		return (
			<div className='col-md-6'>
				{this.renderAddPostButton()}
   			<ClubAnnouncementIndex announcements={this.props.announcements}/>
				<ClubArticleIndex articles={this.props.articles}/>
   		</div>
		);
	}
}

ClubPostIndex.contextTypes = {
	authorized: React.PropTypes.bool
};

export default ClubPostIndex;
