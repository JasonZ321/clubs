import { Images } from '../collection/image';
import { IMAGE_BASE_URL } from '../util/constants';
export function createImageFiles(files, callback) {
	_.each(files, function(file) {
		file.owner = Meteor.userId();
		Images.insert(file, function(err, fileObj){
			if (err) {
				console.log(err);
			} else {
				const imageURL = IMAGE_BASE_URL + fileObj._id;

				fileObj.on('uploaded', Meteor.bindEnvironment(function() {
					// TODO: image still not uploaded at this point for some reason.
					// work around set time out
					if (callback) {
						setTimeout(function () {
								callback(imageURL);
						}, 1000);
					}
				}));
			}
		});
	});
}
