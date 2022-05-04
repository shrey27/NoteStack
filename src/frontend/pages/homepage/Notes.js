import './newnote.css';
import { Fragment } from 'react';

export function Notes({ notes, setEditModal, setFormObject }) {
  const handleEdit = (note) => {
    setFormObject(note);
    setEditModal(true);
  };
  return (
    <Fragment>
      <div className='notes'>
        {notes?.map((note, index) => {
          return (
            <div
              className='singlenote'
              key={note.id}
              style={{ backgroundColor: note.color }}
            >
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              {note.label && <h2>{note.label}</h2>}
              <section className='note__section'>
                <button className='btn--icon'>
                  <i className='fa-solid fa-thumbtack'></i>
                </button>
                <button className='btn--icon'>
                  <i className='fa-solid fa-box-archive'></i>
                </button>
                <button className='btn--icon'>
                  <i className='fa-solid fa-trash'></i>
                </button>
                <button
                  className='btn--icon btn--rt'
                  onClick={handleEdit.bind(this, note)}
                >
                  <i className='fa-solid fa-pencil'></i>
                </button>
              </section>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}
