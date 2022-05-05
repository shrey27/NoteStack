import './homepage.css';
import { Fragment, useState, useEffect } from 'react';
import { PageTemplate, EditNoteModal, Loader } from '../../components';
import { NewNote } from './NewNote';
import { Notes } from './Notes';
import { useSelector, useDispatch } from 'react-redux';
import { updatePostHandler } from '../../actions/noteActions';

export default function Homepage() {
  const [usernotes, setuserNotes] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [formObject, setFormObject] = useState({});
  const { user, authLoader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    let temp = user?.notes?.filter((item) => !item.trash && !item.archive);
    setuserNotes(temp);
  }, [user]);

  const handleDeleteNote = (note) => {
    let temp = usernotes.filter((curr) => curr.id !== note.id);
    dispatch(
      updatePostHandler({
        uid: user?.uid,
        note: { ...user, notes: temp }
      })
    );
  };

  const handleNewNote = (newNote) => {
    if (usernotes.some((item) => item.id === newNote.id)) {
      let temp = usernotes.reduce(
        (acc, curr) =>
          curr.id === newNote.id ? [...acc, { ...newNote }] : [...acc, curr],
        []
      );
      dispatch(
        updatePostHandler({
          uid: user?.uid,
          note: { ...user, notes: temp }
        })
      );
    } else {
      dispatch(
        updatePostHandler({
          uid: user?.uid,
          note: { ...user, notes: [...usernotes, newNote] }
        })
      );
    }
  };

  return (
    <Fragment>
      {editModal && (
        <EditNoteModal
          setEditModal={setEditModal}
          formObject={formObject}
          handleNewNote={handleNewNote}
        />
      )}
      <PageTemplate>
        <div className={`${authLoader === 'pending' && 'pointerEvents'}`}>
          <NewNote handleNewNote={handleNewNote} />
          {authLoader === 'pending' ? (
            <Loader />
          ) : (
            <Notes
              notes={usernotes}
              setEditModal={setEditModal}
              setFormObject={setFormObject}
              handleNewNote={handleNewNote}
              handleDeleteNote={handleDeleteNote}
            />
          )}
        </div>
      </PageTemplate>
    </Fragment>
  );
}
