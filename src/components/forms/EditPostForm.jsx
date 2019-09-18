// import React, { useState, useEffect } from 'react'
import { useState, useEffect } from '@wordpress/element'

const EditPostForm = props => {
	const [ post, setPost ] = useState(props.currentPost)

	useEffect(
		() => {
			setPost(props.currentPost)
		},
		[ props ]
	)
	// You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

	const handleInputChange = event => {
		const { name, value } = event.target

		setPost({ ...post, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()

				props.updatePost(post.id, post)
			}}
		>
			<label>Name</label>
			<input type="text" name="title" value={post.title} onChange={handleInputChange} />
			<label>Author</label>
			<input type="text" name="author" value={post.author} onChange={handleInputChange} />
			<hr/>
			<button
				type='submit'
				className="button button-primary">Update post
			</button>
			<span> | </span>
			<button
				type='button'
				onClick={() => props.setEditing(false)} className="button muted-button">
				Cancel
			</button>
		</form>
	)
}

export default EditPostForm
