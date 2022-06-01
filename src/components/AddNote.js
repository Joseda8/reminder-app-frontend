import { useState } from 'react';

const AddNote = ({ handleAddNote }) => {
	const [noteText, setNoteText] = useState('');
	const [imgPath, setImgPath] = useState();
	const characterLimit = 200;

	const getBase64 = file => {
		return new Promise(resolve => {
		  let baseURL = "";
		  // Make new FileReader
		  let reader = new FileReader();
	
		  // Convert the file to base64 text
		  reader.readAsDataURL(file);
	
		  // on reader load somthing...
		  reader.onload = () => {
			// Make a fileInfo Object
			baseURL = reader.result;
			resolve(baseURL);
		  };
		});
	  };

	const onImageChange = (e) => {
		const [file] = e.target.files;
		getBase64(file)
		.then(result => {
		  file["base64"] = result;
		  setImgPath(result);
		})
		.catch(err => {
		  console.log(err);
		});
	  };

	const handleChange = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setNoteText(event.target.value);
		}
	};

	const handleSaveClick = () => {
		if (noteText.trim().length > 0) {
			handleAddNote(noteText, imgPath);
			setNoteText('');
			setImgPath();
		}
	};

	return (
		<div className='note new'>
			<textarea
				rows='8'
				cols='10'
				placeholder='Type to add a note...'
				value={noteText}
				onChange={handleChange}
			></textarea>
			<div>
				<input type="file" onChange={onImageChange} />
				<img src={imgPath} alt="" style={{maxWidth: 50}}/>
			</div>
			<div className='note-footer'>
				<small>
					{characterLimit - noteText.length} Remaining
				</small>
				<button className='save' onClick={handleSaveClick}>
					Save
				</button>
			</div>
		</div>
	);
};

export default AddNote;
