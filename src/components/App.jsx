// import React, { useState, Fragment } from 'react'
import { useState, Fragment } from '@wordpress/element'

import AddPostForm from '@components/forms/AddPostForm'
import EditPostForm from '@components/forms/EditPostForm'
import PostTable from '@components/tables/PostTable'

const App = () => {
	// Data
	const postsData = [
		{ id: 1, title: 'Lafif Astahdziq', author: 'qutek' },
		{ id: 2, title: 'Lisal Cahya', author: 'monyong' },
		{ id: 3, title: 'Ben Kasyafani', author: 'eben' },
	]

	const initialFormState = { id: null, title: '', author: '' }

	// Setting state
	const [ posts, setPosts ] = useState(postsData)
	const [ currentPost, setCurrentPost ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// CRUD operations
	const addPost = post => {
		setEditing(false)
		post.id = posts.length + 1
		setPosts([ ...posts, post ])
	}

	const deletePost = id => {
		setEditing(false)

		setPosts(posts.filter(post => post.id !== id))
	}

	const updatePost = (id, updatedPost) => {
		setEditing(false)

		setPosts(posts.map(post => (post.id === id ? updatedPost : post)))
	}

	const editRow = post => {
		setEditing(true)

		setCurrentPost({ id: post.id, title: post.title, author: post.author })
	}

	return (
		<Fragment>
			{editing ? (
				<Fragment>
					{currentPost.id ? (
						<Fragment>
							<h1>Edit post</h1>
							<EditPostForm
								editing={editing}
								setEditing={setEditing}
								currentPost={currentPost}
								updatePost={updatePost}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h1>Add post</h1>
							<AddPostForm
								setEditing={setEditing}
								addPost={addPost}
							/>
						</Fragment>
					)}
				</Fragment>
			) : (
				<Fragment>
					<h1 className="wp-heading-inline">View posts</h1>
					<a className="page-title-action"
						onClick={() => {
							setCurrentPost(initialFormState);
							setEditing(true);
						}}
					>Add New</a>
					<hr className="wp-header-end" />
					<ul className="subsubsub"/>

					<PostTable posts={posts} editRow={editRow} deletePost={deletePost} />
				</Fragment>
			)}
		</Fragment>
	)
}
export default App