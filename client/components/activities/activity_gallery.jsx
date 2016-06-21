import React, {Component} from 'react';
import ActivityImageGrid from './activity_image_grid';
import {GridList} from 'material-ui/GridList';
import Dropzone from 'react-dropzone';
import { Images } from '../../../imports/collection/image';
import {createActivityImage, removeActivityImage} from '../../../imports/api/activity_api';

const styles = {
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
    marginBottom: 24,
  }
};

class ActivityGallery extends Component {
	constructor(props) {
		super(props);
		this.mapPropsToState(props);
	}
	mapPropsToState(props) {
		const images = props.activityImages;
		const baseUrl = 'http://localhost:3000/cfs/files/images/';
		const activityImages = props.activityImages ? props.activityImages.map(activityImage => { return {imageURL: baseUrl + activityImage.imageId, imageId: activityImage.imageId}}) : [];
		this.state = {
			images: activityImages
		}
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.activityImages.length !== nextProps.activityImages.length) {
			this.mapPropsToState(nextProps);
		}
	}
	onImageUpload(files) {
		let component = this;
		files.map(file => {
			createActivityImage(file, component.props.activityId)
		});
	}
	onImageRemoved(removedImage) {
		removeActivityImage(removedImage.imageId, this.props.activityId);
		// const newImages = this.state.images.filter(image => image.imageId !== removedImage.imageId);
		// this.setState({
		// 	images: newImages
		// });
	}

	renderImages() {
		const images = this.state.images;
		let displayedImages = [
			...images.map(image => this.getImageGrid(this.onImageRemoved.bind(this), image)),
		];

		if (displayedImages.length > 0) {
			return (
				<GridList
				 cellHeight={200}
				 style={styles.gridList} >
				 	{[...displayedImages]}
				</GridList>
			);
		} else {
			return <div style={{height: 200}}><h3 className='text-center text-warning'>图片墙还是空的，想上传点图片吗？</h3></div>
		}

	}
	getImageGrid(removeCallback, image) {
		return <ActivityImageGrid key={image.imageId} onImageRemoved={removeCallback} image={image} />;
	}
	render() {
		return (
			<div>
				<h2>图片墙</h2>
				<div className='panel-thumbnail'>
					{this.renderImages()}
					<Dropzone onDrop={this.onImageUpload.bind(this)}>
							<div className='text-center'>上传图片</div>
					</Dropzone>
				</div>
			</div>
		);
	}
}

export default ActivityGallery;
