// import React, { useState } from 'react'
import { useState, useEffect } from '@wordpress/element'

const AddPostForm = props => {
	const initialFormState = { id: null, title: '', author: '' }
	const [ post, setPost ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setPost({ ...post, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!post.title || !post.author) return

				props.addPost(post)
				setPost(initialFormState)
			}}
		>
			<label>Title</label>
			<input type="text" name="title" value={post.title} onChange={handleInputChange} />
			<label>Author</label>
			<input type="text" name="author" value={post.author} onChange={handleInputChange} />
			<hr/>
			<button
        		type='submit'
				className="button button-primary">Add new post</button>
        	<span> | </span>
			<button
        		type='button'
        		onClick={() => props.setEditing(false)} className="button muted-button">Cancel
      		</button>
		</form>
	)
}

export default AddPostForm
