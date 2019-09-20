// import React, { useState, Fragment } from 'react'
import { useState, Fragment } from '@wordpress/element'

import AddPostForm from '@components/forms/AddPostForm'
import EditPostForm from '@components/forms/EditPostForm'
import PostTable from '@components/tables/PostTable'

const App = () => {

	const initialFormState = { id: null, title: '', content: '' }

	const [ currentPost, setCurrentPost ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	const editRow = post => {
		setEditing(true)
		setCurrentPost({ id: post.id, title: post.title.rendered, content: post.content.rendered })
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
							/>
						</Fragment>
					) : (
						<Fragment>
							<h1>Add post</h1>
							<AddPostForm
								setEditing={setEditing}
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

					<PostTable editRow={editRow}/>
				</Fragment>
			)}
		</Fragment>
	)
}
export default App