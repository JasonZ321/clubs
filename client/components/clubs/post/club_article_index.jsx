import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

function renderArticles(articles) {
	return articles.map(article => <ListItem primaryText={article.title}/>);
}

const ClubArticleIndex = (props) => {
	return (
		<div>
			<List>
				<Subheader>文章</Subheader>
				{renderArticles(props.articles)}
			</List>
		</div>
	);
}

export default ClubArticleIndex;
