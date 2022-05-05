import './label.css';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePostHandler } from '../../actions/noteActions';
import { Loader, PageTemplate, EditNoteModal } from '../../components';
import { Notes } from '../homepage/Notes';

export default function Label() {
  const [usernotes, setuserNotes] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [formObject, setFormObject] = useState({});
  const { user, authLoader, search } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    let temp = user?.notes
      ?.filter((item) => item.label)
      .filter((item) => !item.archive)
      .filter((item) => !item.trash);
      
    if (search) {
      temp = temp.filter((item) => item.label === search);
    }
    setuserNotes(temp);
  }, [user?.notes, search]);

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
      </PageTemplate>
    </Fragment>
  );
}
