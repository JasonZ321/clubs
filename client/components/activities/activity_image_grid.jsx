import React, { Component } from 'react';
import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';

class ActivityImageGrid extends Component {
	onImageRemoved() {
		this.props.onImageRemoved(this.props.image);
	}
	render() {
		const image = this.props.image;
		const onImageRemoved = this.props.onImageRemoved;

		return (
			<GridTile
					key={image._id}
					title={image.imageURL}
          actionIcon={<IconButton onClick={this.onImageRemoved.bind(this)}><ActionDelete /></IconButton>} >
   			<img src={image.imageURL} />
   		</GridTile>
		);
	}
}

export default ActivityImageGrid;
