// import React, { useState } from 'react'
import { useState, useEffect } from '@wordpress/element'
import { TextControl, TextareaControl, Button } from '@wordpress/components';
import request from '@/utils/request'

const AddPostForm = (props) => {
	const initialFormState = { id: null, title: '', content: '' };
	const [ post, setPost ] = useState(initialFormState);

	const handleInputChange = (name, value) => {
		setPost({ ...post, [name]: value });
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		if (!post.title || !post.content) return;

		request.post('/posts', {
			...post,
			status: 'publish'
		}).then((response) => {
			if(response.status === 201){
				// reset
				setPost(initialFormState);
				props.setEditing(false);
			}
		});
	}

	return (
		<form onSubmit={handleSubmit} >
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

export default AddPostForm
