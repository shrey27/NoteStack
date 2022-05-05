import './archive.css';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePostHandler } from '../../actions/noteActions';
import { Loader, PageTemplate } from '../../components';
import { Notes } from '../homepage/Notes';

export default function Archive() {
  const [archiveNotes, setArchiveNotes] = useState([]);
  const { user, authLoader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
      let temp = user.notes.filter((item) => item.archive);
      setArchiveNotes(temp);
    }
  }, [user]);

  return (
    <Fragment>
      <PageTemplate>
        {authLoader === 'pending' ? (
          <Loader />
        ) : (
          <Notes
            notes={archiveNotes}
            handleNewNote={handleNewRestore}
          />
        )}
      </PageTemplate>
    </Fragment>
  );
}
