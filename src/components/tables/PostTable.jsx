const PostTable = props => (
	<table className="wp-list-table widefat fixed striped pages">
		<thead>
			<tr>
				<td id="cb" className="manage-column column-cb check-column">
					<label className="screen-reader-text" for="cb-select-all-1">Select All</label>
					<input id="cb-select-all-1" type="checkbox"/>
				</td>
				<th scope="col" id="title" class="manage-column column-title column-primary sorted asc"><a href=""><span>Title</span><span class="sorting-indicator"></span></a></th>
				<th scope="col" id="author" className="manage-column">Author</th>
			</tr>
		</thead>

		<tbody id="the-list">
			{props.posts.length > 0 ? (
				props.posts.map(post => (
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
							<strong><a className="row-title" href="" aria-label="“{post.title}” (Edit)">{post.title}</a> — <span className="post-state">post state here</span></strong>
							<div className="row-actions">
								<span className="edit"><a href="" aria-label="Edit “{post.title}”"
									onClick={(event) => {
										event.preventDefault()
										props.editRow(post)
									}}
								>Edit</a> | </span>
								<span className="trash"><a href="#" className="submitdelete" aria-label="Delete post"
									onClick={(event) => {
										event.preventDefault()
										if (window.confirm('Are you sure to delete this item?')) {
											props.deletePost(post.id)
										}
									}}
								>Trash</a> | </span>
							</div>
							<button type="button" className="toggle-row">
								<span className="screen-reader-text">Show more details</span>
							</button>
						</td>
						<td className="column-author" data-colname="Author"><a href="#">{post.author}</a></td>
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
				<th scope="col" className="manage-column column-author">Author</th>
			</tr>
		</tfoot>

	</table>
)

export default PostTable
