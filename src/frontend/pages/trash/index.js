import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePostHandler } from '../../actions/noteActions';
import { Loader, PageTemplate } from '../../components';
import { Notes } from '../homepage/Notes';
import './trash.css';

export default function Trash() {
  const [trashNotes, setTrashNotes] = useState([]);
  const { user, authLoader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDeleteNote = (note) => {
    let temp = user?.notes?.filter((curr) => curr.id !== note.id);
    dispatch(
      updatePostHandler({
        uid: user?.uid,
        note: { ...user, notes: temp }
      })
    );
    setTrashNotes(temp)
  };

  const handleNewRestore = (newNote) => {
    let temp = user?.notes?.reduce(
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
  };

  useEffect(() => {
    if (user?.notes?.length) {
      let temp = user.notes.filter((item) => item.trash);
      setTrashNotes(temp);
    }
  }, [user]);

  return (
    <Fragment>
      <PageTemplate>
        {authLoader === 'pending' ? (
          <Loader />
        ) : (
          <Notes
            notes={trashNotes}
            handleNewNote={handleNewRestore}
            handleDeleteNote={handleDeleteNote}
          />
        )}
      </PageTemplate>
    </Fragment>
  );
}
