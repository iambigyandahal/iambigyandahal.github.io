import React, { Fragment, useState } from 'react'
import ReactDOM from 'react-dom'
import Dexie from 'dexie'

import Bookmarks from './components/Bookmarks'

const App = () => {
	const db = new Dexie("Bookmarks")
	db.version(1).stores({
		bookmarks: "++id, name, link"
	})
	db.open().then(() => {
		db.bookmarks.toArray().then((bookmarkData) => {
			return setBookmarks(bookmarkData);
		});
	}).catch((err) => {
		return console.log(err.stack || err)
	})

	const [bookmarks, setBookmarks] = useState([{name: "", link: ""}])

	const [tempBookmark, settempBookmark] = useState({name: "", link: ""})

	const linkSanitize = (link) => {
		if(!link.startsWith("https://")) {
			link = "https://" + link
		}
		if(!link.endsWith("/"))
		return link + "/"
	}

	const handleChange = (e) => {
		if(e.target.id == "name") {
			return settempBookmark({...tempBookmark, name: e.target.value});
		}
		if(e.target.id == "link") {
			return settempBookmark({...tempBookmark, link: linkSanitize(e.target.value)});
		}
	}

	const handleClick = (data) => {
		// let oldData = bookmarks;
		// let newData = [...oldData, data];
		// setBookmarks(newData);
		// settempBookmark({name: "", link: ""})
		// console.log(db.bookmarks.count());
		db.bookmarks.toCollection().count().then((count) => {
			data.id = count + 1;
			db.bookmarks.add(data);
			return db.bookmarks.toArray().then((bookmarkData) => {
				return setBookmarks(bookmarkData);
			});
		})
	}

	return (
		<Fragment>
			<nav>
				<a href="#">Bookman</a>
			</nav>
			<div>
				<h1>Add Bookmark</h1>
				<input id="name" type="text" placeholder="Name" onChange={handleChange} />
				<input id="link" type="text" placeholder="Name" onChange={handleChange} />
				<button onClick={() => handleClick(tempBookmark)}>Add</button>
			</div>
			<hr />
			<Bookmarks bookmarks={bookmarks} />
		</Fragment>
	)
}

ReactDOM.render(
	<App />,
	document.getElementById("root")
)