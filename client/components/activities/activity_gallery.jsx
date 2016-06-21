import React, {Component} from 'react';
import ActivityImageGrid from './activity_image_grid';
import {GridList} from 'material-ui/GridList';
import Dropzone from 'react-dropzone';
import { Images } from '../../../imports/collection/image';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
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
		const images = this.props.activityImages;
		const baseUrl = 'http://localhost:3000/cfs/files/images/';
		const activityImages = this.props.activityImages ? this.props.activityImages.map(activityImage => { return {imageURL: baseUrl + activityImage.imageId, status: 'exist'}}) : [];
		this.state = {
			existImages: activityImages,
			newImages: []
		}
	}
	onImageUpload(files) {
		let newFiles = files.map(file => {
			return {...file, status: 'new'}
		});
		this.setState({
			newImages: [...this.state.newImages, ...newFiles]
		});
	}
	onImageRemoved(oldImage) {
		debugger;
		const removedImage = {...oldImage, status: 'removed'};

		if (oldImage.status === 'normal') {
			const images = this.state.existImages.map((image) => {
				if (image.imageURL === removedImage.imageURL) {
					return {...image, status: 'removed'};
				} else {
					return image;
				}
			});
			this.setState({
				existImages: images
			});
		} else if (oldImage.status === 'new') {
			const images = this.state.newImages.map((image) => {
				if (image.preview === removedImage.imageURL) {
					return {...image, status: 'removed'};
				} else {
					return image;
				}
			});
			this.setState({
				newImages: images
			});
		} else {
			console.log("error", "status should be either new or normal");
		}
	}

	renderImages() {
		const existImages = this.state.existImages;
		const newImages = this.state.newImages;
		debugger;
		const displayFilter = function(image) {
			if (image && image.status) {
				return image.status !== 'removed';
			}
			return true;
		}
		let displayedImages = [
			...newImages.filter(displayFilter).map(image => this.getImageGrid(this.onImageRemoved.bind(this), {imageURL: image.preview, status: 'new'})),
			...existImages.filter(displayFilter).map(image => this.getImageGrid(this.onImageRemoved.bind(this), image))
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
		return <ActivityImageGrid key={image.imageURL} onImageRemoved={removeCallback} image={image} />;
	}
	render() {
		return (
			<div className='panel-thumbnail'>
				{this.renderImages()}
				<Dropzone onDrop={this.onImageUpload.bind(this)}>
						<div className='text-center'>上传图片</div>
				</Dropzone>
			</div>
		);
	}
}

export default ActivityGallery;
