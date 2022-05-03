import { Fragment } from 'react';
import './pagetemplate.css';
import { Sidebar } from './Sidebar';

export function PageTemplate({ children }) {
  return (
    <Fragment>
      <div className='main__grid'>
        <Sidebar />
        <div className='main'>{children}</div>
      </div>
    </Fragment>
  );
}
