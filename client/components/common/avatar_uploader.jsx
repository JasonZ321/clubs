import React from 'react';
import Dropzone from 'react-dropzone';


const EmptyAvartar = () => (
	<div className='text-center'>上传图片</div>
)

const Content = ({avatarURL}) => (
	avatarURL != null ? <img src={avatarURL} className='img-responsive' /> : <EmptyAvartar />
)
const AvatarUploader = ({onImageUpload, avatarURL}) => {
	return (
		<div className='panel-thumbnail'>
			<Dropzone onDrop={onImageUpload}>
				<Content avatarURL={avatarURL} />
			</Dropzone>
		</div>
	);
}

export default AvatarUploader;
