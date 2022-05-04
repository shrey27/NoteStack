import { useState, useEffect } from 'react';
import { colors } from '../../utility/constants';
import './modal.css';

export const EditNoteModal = ({ setEditModal, formObject, handleNewNote }) => {
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    label: '',
    color: ''
  });
  useEffect(() => {
    setForm({ ...formObject });
  }, [formObject]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    handleNewNote(form);
    setEditModal(false);
  };

  return (
    <div className='modal modal__open flex-ct-ct'>
      <div
        className='modal__background'
        onClick={() => setEditModal(false)}
      ></div>
      <div className='modal__content modal__content__edit'>
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
      <span className='modal__close' onClick={() => setEditModal(false)}>
        <i className='fas fa-times-circle'></i>
      </span>
    </div>
  );
};
