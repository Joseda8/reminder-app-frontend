import { useState, useEffect } from 'react';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';
import axios from 'axios';
import { urlAPI } from "./helpers/constants";

const App = () => {
	const [notes, setNotes] = useState([]);

	const [searchText, setSearchText] = useState('');
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		axios.get(urlAPI + '').then(
			response => {
			  setNotes(response.data.notes);
			}
		  );
	}, []);

	const addNote = (text, img) => {
		const date = new Date();
		const newNote = {
			text: text,
			date: date.toString().substr(4, 20),
			img: img,
		};
		axios.post(`${urlAPI}new_post`, newNote).then(function (response) {
			newNote._id = response.data;
			const newNotes = [...notes, newNote];
			setNotes(newNotes);
		  });
	};

	const deleteNote = (_id) => {
		const newNotes = notes.filter((note) => note._id !== _id);
		setNotes(newNotes);
		axios.post(`${urlAPI}delete_post`, {_id});
	};

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
				/>
			</div>
		</div>
	);
};

export default App;
