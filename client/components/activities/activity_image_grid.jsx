import React, { Component } from 'react';
import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
class ActivityImageGrid extends Component {
	render() {
		const image = this.props.image;
		return (
			<GridTile
					key={image.imageURL}
          actionIcon={<IconButton onClick={this.props.onImageRemoved(image)}><DeleteIcon /></IconButton>} >
   			<img src={image.imageURL} />
   		</GridTile>
		);
	}
}

export default ActivityImageGrid;
