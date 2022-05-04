import './newnote.css';
import { Fragment } from 'react';

export function Notes({ notes, setEditModal, setFormObject }) {
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
                <i className='fa-solid fa-thumbtack'></i>
                <i className='fa-solid fa-box-archive'></i>
                <i className='fa-solid fa-trash'></i>
              </section>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}
