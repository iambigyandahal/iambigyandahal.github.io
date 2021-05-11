import React, { Fragment } from 'react'

const Bookmarks = (props) => {	
	const addFavicon = (link) => {
			return link + "favicon.ico"
	}
	const data = props.bookmarks.map((bookmark, i) => {
		return  (
			<div key={i}>
				<div><img src={addFavicon(bookmark.link)} /></div>
				<div><a href={bookmark.link} target="_blank">{bookmark.name}</a></div>
			</div>
		)
	})

	return (
		<Fragment>
			{data}
		</Fragment>
	)
}

export default Bookmarks