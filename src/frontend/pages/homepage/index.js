import './homepage.css';
import { Fragment, useState } from 'react';
import { PageTemplate } from '../../components';
import { NewNote } from './NewNote';
import { Notes } from './Notes';

export default function Homepage() {
  const [notes, setNotes] = useState([]);
  return (
    <Fragment>
      <PageTemplate>
        <NewNote setNotes={setNotes} />
        <Notes notes={notes} />
      </PageTemplate>
    </Fragment>
  );
}
