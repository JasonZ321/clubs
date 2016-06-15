import React from 'react';
import Dropzone from 'react-dropzone';


const EmptyAvartar = () => (
	<div className='text-center'>上传社团头像</div>
)

const Content = ({avatarURL}) => (
	avatarURL != null ? <img src={avatarURL} className='img-responsive' /> : <EmptyAvartar />
)
const ClubAvartarUploader = ({onImageUpload, avatarURL}) => {
	debugger;
	return (
		<div className='panel-thumbnail'>
			<Dropzone onDrop={onImageUpload}>
				<Content avatarURL={avatarURL} />
			</Dropzone>
		</div>
	);
}

export default ClubAvartarUploader;
