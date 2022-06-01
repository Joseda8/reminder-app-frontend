import { MdDeleteForever } from 'react-icons/md';

function zoom_in(e) {
    e.target.style.transform = "scale(2)";
	e.target.style.transition = "transform .2s";
  }

  function zoom_out(e) {
    e.target.style.transform = "scale(1.0)";
  }

const Note = ({ id, text, date, img, handleDeleteNote }) => {
	return (
		<div className='note'>
			<span>{text}</span>
			<br></br>

			{(() => {
				if (img) {
					return (
						<img src={img} alt="Note" style={{maxWidth: 200}} onMouseOver={zoom_in} onMouseOut={zoom_out}/>
					)
				}
			})()}

			<div className='note-footer'>
				<small>{date}</small>
				<MdDeleteForever
					onClick={() => handleDeleteNote(id)}
					className='delete-icon'
					size='1.3em'
				/>
			</div>
		</div>
	);
};

export default Note;
