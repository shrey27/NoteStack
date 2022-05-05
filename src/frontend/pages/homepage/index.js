import './homepage.css';
import { Fragment, useState } from 'react';
import { PageTemplate, EditNoteModal } from '../../components';
import { NewNote } from './NewNote';
import { Notes } from './Notes';

export default function Homepage() {
  const [notes, setNotes] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [formObject, setFormObject] = useState({});
  return (
    <Fragment>
      {editModal && (
        <EditNoteModal setEditModal={setEditModal} formObject={formObject} />
      )}
      <PageTemplate>
        <NewNote setNotes={setNotes} />
        <Notes
          notes={notes}
          setEditModal={setEditModal}
          setFormObject={setFormObject}
        />
      </PageTemplate>
    </Fragment>
  );
}
