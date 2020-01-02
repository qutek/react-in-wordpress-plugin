import { useState, useEffect } from '@wordpress/element'
import parse from 'html-react-parser';
import request from '@/utils/request'

const PostTable = (props) => {
	const [posts, setPosts] = useState([]);

	const getPosts = async () => {
		try {
			const result = await request.get('/posts', {
				params: {
		      		status: 'any'
			    }
			});
			setPosts( result.data );
		} catch (error) {
		}
	};

	useEffect(() => {
		// console.log('PostTable:mount');
		getPosts();

		// cleanup on component unmount
		return () => {
			// console.log('PostTable:unmount');
		}
	}, []) // listen to some vars

	const deletePost = (id) => {
		request.delete('/posts/' + id).then((response) => {
			if(response.status === 200){
				setPosts(posts.filter(post => post.id !== id));
			}
		});

	}

	return (
		<table className="wp-list-table widefat fixed striped pages">
			<thead>
				<tr>
					<td id="cb" className="manage-column column-cb check-column">
						<label className="screen-reader-text" for="cb-select-all-1">Select All</label>
						<input id="cb-select-all-1" type="checkbox"/>
					</td>
					<th scope="col" id="title" class="manage-column column-title column-primary sorted asc"><a href=""><span>Title</span><span class="sorting-indicator"></span></a></th>
					<th scope="col" id="author" className="manage-column">Content</th>
				</tr>
			</thead>

			<tbody id="the-list">
				{posts.length > 0 ? (
					posts.map(post => (
						<tr key={post.id} id="{post.id}" className="iedit">
							<th scope="row" className="check-column">
								<label className="screen-reader-text" for="cb-select-{post.id}">Select</label>
								<input id="cb-select-{post.id}" type="checkbox" />
								<div className="locked-indicator">
									<span className="locked-indicator-icon" aria-hidden="true"></span>
									<span className="screen-reader-text">Locked</span>
								</div>
							</th>
							<td className="column-name column-primary has-row-actions" data-colname="Name">
								<div className="locked-info"><span className="locked-avatar"></span> <span className="locked-text"></span></div>
								<strong><a className="row-title" href="" aria-label="“{post.title.rendered}” (Edit)">{post.title.rendered}</a> — <span className="post-state">{post.status}</span></strong>
								<div className="row-actions">
									<span className="edit"><a href="" aria-label="Edit “{post.title.rendered}”"
										onClick={(event) => {
											event.preventDefault()
											props.editRow(post)
										}}
									>Edit</a> | </span>
									<span className="trash"><a href="#" className="submitdelete" aria-label="Delete post"
										onClick={(event) => {
											event.preventDefault()
											if (window.confirm('Are you sure to delete this item?')) {
												deletePost(post.id)
											}
										}}
									>Trash</a> | </span>
								</div>
								<button type="button" className="toggle-row">
									<span className="screen-reader-text">Show more details</span>
								</button>
							</td>
							<td className="column-author" data-colname="Content">{ parse(post.content.rendered) }</td>
						</tr>
					))
				) : (
					<tr>
					  <td colSpan={3}>No posts</td>
					</tr>
				)}
			</tbody>

			<tfoot>
				<tr>
					<td className="manage-column column-cb check-column">
						<label className="screen-reader-text" for="cb-select-all-2">Select All</label>
						<input id="cb-select-all-2" type="checkbox" />
					</td>
					<th scope="col" className="manage-column column-name column-primary sorted asc"><a href=""><span>Name</span><span className="sorting-indicator"></span></a></th>
					<th scope="col" className="manage-column column-author">Content</th>
				</tr>
			</tfoot>

		</table>
	)
}

export default PostTable
