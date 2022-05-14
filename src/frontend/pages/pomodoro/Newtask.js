import { Fragment, useState } from 'react';
import './pomodoro.css';
import { v4 as uuid } from 'uuid';

const defaultValue = {
  title: '',
  description: '',
  time: 0,
  completed: false
};

export default function Newtask({ handleNewTask }) {
  const [showEditor, setShowEditor] = useState(false);
  const [form, setForm] = useState(defaultValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.title && form.description && form.time > 0) {
      handleNewTask({ ...form, id: uuid() });
    }
    setShowEditor(false);
    setForm(defaultValue);
  };

  return (
    <Fragment>
      {!showEditor ? (
        <div className='newTask box-shadow' onClick={() => setShowEditor(true)}>
          <span>Create a Task</span>
          <span>
            <i className='fa-solid fa-plus'></i>
          </span>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit} className='newTask_note'>
            <input
              type='text'
              className='newTask__title'
              placeholder='Enter Title'
              name='title'
              value={form?.title}
              onChange={handleChange}
            />
            <textarea
              className='newTask__textarea'
              placeholder='Enter Description'
              name='description'
              value={form?.description}
              onChange={handleChange}
            ></textarea>
            <div className='label__ctr'>
              <label
                className={`label_time ${form?.time === '2' ? 'checked' : ''}`}
              >
                2 mins
                <input
                  type='radio'
                  className='note__radio'
                  name='time'
                  checked={form?.time === '2'}
                  value={2}
                  onChange={handleChange}
                />
              </label>
              <label
                className={`label_time ${form?.time === '30' ? 'checked' : ''}`}
              >
                30 mins
                <input
                  type='radio'
                  className='note__radio'
                  name='time'
                  checked={form?.time === '30'}
                  value={30}
                  onChange={handleChange}
                />
              </label>
              <label
                className={`label_time ${form?.time === '60' ? 'checked' : ''}`}
              >
                60 mins
                <input
                  type='radio'
                  className='note__radio'
                  name='time'
                  checked={form?.time === '60'}
                  value={60}
                  onChange={handleChange}
                />
              </label>
              <label
                className={`label_time ${form?.time === '90' ? 'checked' : ''}`}
              >
                90 mins
                <input
                  type='radio'
                  className='note__radio'
                  name='time'
                  checked={form?.time === '90'}
                  value={90}
                  onChange={handleChange}
                />
              </label>
              <label
                className={`label_time ${
                  form?.time === '120' ? 'checked' : ''
                }`}
              >
                120 mins
                <input
                  type='radio'
                  name='time'
                  className='note__radio'
                  checked={form?.time === '120'}
                  value={120}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className='note__buttons'>
              <button
                className={`btn ${
                  form?.title && form?.description && form?.time
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
