import './newnote.css';
import { Fragment, useState } from 'react';
import { colors } from '../../utility/constants';
import { v4 as uuid } from 'uuid';

const defaultValue = {
  title: '',
  description: '',
  color: '#f3f3f3',
  label: ''
};

export function NewNote({ handleNewNote }) {
  const [showEditor, setShowEditor] = useState(false);
  const [form, setForm] = useState(defaultValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.title && form.description) {
      handleNewNote({ ...form, id: uuid() });
    }
    setShowEditor(false);
    setForm(defaultValue);
  };

  return (
    <Fragment>
      {!showEditor ? (
        <div className='newnote box-shadow' onClick={() => setShowEditor(true)}>
          <span>Create a note</span>
          <span>
            <i className='fa-solid fa-plus'></i>
          </span>
        </div>
      ) : (
        <div>
          <form
            onSubmit={handleSubmit}
            className='note'
            style={{
              backgroundColor: form?.color
            }}
          >
            <input
              type='text'
              className='note__title'
              placeholder='Enter Title'
              name='title'
              value={form?.title}
              onChange={handleChange}
            />
            <textarea
              className='note__textarea'
              placeholder='Enter Description'
              name='description'
              value={form?.description}
              onChange={handleChange}
            ></textarea>
            <input
              type='text'
              className='note__label'
              placeholder='Enter Label'
              name='label'
              value={form?.label}
              onChange={handleChange}
            />
            <div className='note__buttons'>
              <section className='color__ctr'>
                <div className='color__tab'></div>
                <div className='colors'>
                  {colors.map((e) => {
                    return (
                      <span
                        key={e.id}
                        className={`color ${e.className}`}
                        onClick={() => setForm({ ...form, color: e.color })}
                      ></span>
                    );
                  })}
                </div>
              </section>
              <button
                className={`btn ${
                  form?.title && form?.description
                    ? 'btn--auth--solid'
                    : 'btn--cancel--solid'
                } btn--note`}
                type='submit'
              >
                {form?.title && form?.description ? 'Create' : 'Close'}
              </button>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
}
