import React, {Component} from 'react';
import Modal from 'react-modal';
import { Images } from '../../../../imports/collection/image';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

class PostCreatePopup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			articleSelected: true
		};
	}
	submitNewPost(event) {
		event.preventDefault();
		const { titleRef, contentRef } = this.refs;

		const title = titleRef.getValue();
		const	content = contentRef.getValue();
		
		if (title && content) {
			this.props.onSubmit(title, content, this.state.articleSelected);
		} else {
			alert("Must fill all fields");
		}
		this.state = {
			articleSelected: true
		};

	}
	cancel(event) {
		event.preventDefault();
		this.state = {
			articleSelected: true
		};
		this.props.onCancel();
	}
	onToggle() {
		this.setState({
			articleSelected: !this.state.articleSelected
		});
	}
	render() {
		return (
			<div>
				<Modal isOpen={this.props.isOpen}>
          <h1>创建</h1>
					<Toggle ref='articleSelectRef' label="作为公告发布" onToggle={this.onToggle.bind(this)} />
					<form className="form-signin">
							<TextField hintText="标题" ref='titleRef'/><br />
							<TextField hintText="内容"
						      multiLine={true}
									ref="contentRef"
						      rows={5}
						    /><br />
							<RaisedButton onClick={this.submitNewPost.bind(this)} label="发布" primary={true} />
							<RaisedButton onClick={this.cancel.bind(this)} label="取消" secondary={true} />
					</form>
        </Modal>
			</div>
		);
	}

}

export default PostCreatePopup;
