import './newnote.css';
import { Fragment } from 'react';
import { useLocation } from 'react-router';
import { ARCHIVE, HOMEPAGE, LABEL, TRASH } from '../../routes';
import { Empty } from '../../components';

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

  const handleArchive = (note) => {
    if (notes.some((item) => item.archive)) {
      handleNewNote({ ...note, archive: false });
    } else {
      handleNewNote({ ...note, archive: true });
    }
  };

  const handlePinned = (note) => {
    handleNewNote({ ...note, pinned: !note.pinned ? true : !note.pinned });
  };

  const handleRestoreFromTrash = (note) => {
    if (notes.some((item) => item.trash)) {
      handleNewNote({ ...note, trash: false });
    }
  };

  return (
    <Fragment>
      {!notes?.length ? (
        <Empty />
      ) : (
        <>
          {notes?.some((item) => item.pinned) && (
            <h1 className='pinned'>Pinned Notes</h1>
          )}
          {/* Pinned notes */}
          <div className='notes'>
            {notes
              ?.filter((item) => item.pinned)
              ?.map((note, index) => {
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
                        <button
                          className='btn--icon'
                          onClick={handlePinned.bind(this, note)}
                        >
                          <i
                            className={`fa-solid fa-thumbtack ${
                              note.pinned && 'icon__pinned'
                            }`}
                          ></i>
                        </button>
                      )}
                      {(pathname === HOMEPAGE ||
                        pathname === ARCHIVE ||
                        pathname === LABEL) && (
                        <button
                          className='btn--icon'
                          onClick={handleArchive.bind(this, note)}
                        >
                          <i className='fa-solid fa-box-archive'></i>
                        </button>
                      )}
                      {(pathname === HOMEPAGE ||
                        pathname === TRASH ||
                        pathname === LABEL) && (
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
                      {(pathname === HOMEPAGE || pathname === LABEL) && (
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
          {/* Unpinned notes */}
          <div className='notes'>
            {notes
              ?.filter((item) => !item.pinned)
              ?.map((note, index) => {
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
                        <button
                          className='btn--icon'
                          onClick={handlePinned.bind(this, note)}
                        >
                          <i className='fa-solid fa-thumbtack'></i>
                        </button>
                      )}
                      {(pathname === HOMEPAGE ||
                        pathname === ARCHIVE ||
                        pathname === LABEL) && (
                        <button
                          className='btn--icon'
                          onClick={handleArchive.bind(this, note)}
                        >
                          <i className='fa-solid fa-box-archive'></i>
                        </button>
                      )}
                      {(pathname === HOMEPAGE ||
                        pathname === TRASH ||
                        pathname === LABEL) && (
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
                      {(pathname === HOMEPAGE || pathname === LABEL) && (
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
        </>
      )}
    </Fragment>
  );
}
