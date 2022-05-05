import './newnote.css';
import { Fragment } from 'react';
import { useLocation } from 'react-router';
import { HOMEPAGE, TRASH } from '../../routes';

export function Notes({
  notes,
  setEditModal,
  setFormObject,
  handleNewNote,
  handleDeleteNote
}) {
  const { pathname } = useLocation();
  const handleEdit = (note) => {
    setFormObject(note);
    setEditModal(true);
  };
  const handleDelete = (note) => {
    if (notes.some((item) => item.trash)) {
      handleDeleteNote(note);
    } else {
      handleNewNote({ ...note, trash: true });
    }
  };

  const handleRestoreFromTrash = (note) => {
    if (notes.some((item) => item.trash)) {
      handleNewNote({ ...note, trash: false });
    }
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
                {pathname === HOMEPAGE && (
                  <button className='btn--icon'>
                    <i className='fa-solid fa-thumbtack'></i>
                  </button>
                )}
                <button className='btn--icon'>
                  <i className='fa-solid fa-box-archive'></i>
                </button>
                {(pathname === HOMEPAGE || pathname === TRASH) && (
                  <button
                    className='btn--icon'
                    onClick={handleDelete.bind(this, note)}
                  >
                    <i className='fa-solid fa-trash'></i>
                  </button>
                )}
                {pathname === TRASH && (
                  <button
                    className='btn--icon'
                    onClick={handleRestoreFromTrash.bind(this, note)}
                  >
                    <i className='fa-solid fa-arrow-rotate-left'></i>
                  </button>
                )}
                {pathname === HOMEPAGE && (
                  <button
                    className='btn--icon btn--rt'
                    onClick={handleEdit.bind(this, note)}
                  >
                    <i className='fa-solid fa-pencil'></i>
                  </button>
                )}
              </section>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}
