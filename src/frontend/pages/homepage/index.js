import './homepage.css';
import { Fragment, useState, useEffect } from 'react';
import { PageTemplate, EditNoteModal } from '../../components';
import { NewNote } from './NewNote';
import { Notes } from './Notes';
import { useSelector, useDispatch } from 'react-redux';
import { updatePostHandler } from '../../actions/noteActions';

export default function Homepage() {
  const [usernotes, setuserNotes] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [formObject, setFormObject] = useState({});
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setuserNotes(user?.notes);
  }, [user]);

  const handleNewNote = (newNote) => {
    dispatch(
      updatePostHandler({
        uid: user?.uid,
        note: { ...user, notes: [...usernotes, newNote] }
      })
    );
  };

  return (
    <Fragment>
      {editModal && (
        <EditNoteModal setEditModal={setEditModal} formObject={formObject} />
      )}
      <PageTemplate>
        <NewNote handleNewNote={handleNewNote} />
        <Notes
          notes={usernotes}
          setEditModal={setEditModal}
          setFormObject={setFormObject}
        />
      </PageTemplate>
    </Fragment>
  );
}
