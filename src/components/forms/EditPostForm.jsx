// import React, { useState, useEffect } from 'react'
import { useState, useEffect } from '@wordpress/element'
import { TextControl, TextareaControl, Button } from '@wordpress/components';
import request from '@/utils/request'

const EditPostForm = (props) => {
	const [ post, setPost ] = useState(props.currentPost);

	const handleInputChange = (name, value) => {
		setPost({ ...post, [name]: value });
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		// console.log(post);
		request.post('/posts/' + post.id, post).then((response) => {
			if(response.status === 200){
				// console.log(response);
				props.setEditing(false);
			}
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			<TextControl
				label="Name"
			    value={ post.title }
			    onChange={ value => { handleInputChange('title', value) } }
		  	/>
			<TextareaControl
			    label="Content"
			    help="Enter some text"
			    value={ post.content }
			    onChange={ value => { handleInputChange('content', value) } }
		  	/>
			<hr/>
			<Button isLarge isPrimary type='submit'>Update post</Button>
			<span> | </span>
			<Button isLarge isDestructive
				onClick={() => props.setEditing(false)}
			>Cancel</Button>
		</form>
	)
}

export default EditPostForm
