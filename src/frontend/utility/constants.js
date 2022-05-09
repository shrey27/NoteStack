export const navlinks = [
  {
    id: 'N1',
    name: 'Notes',
    path: '/homepage',
    class: 'fa-solid fa-clipboard'
  },
  {
    id: 'N2',
    name: 'Labels',
    path: '/label',
    class: 'fa-solid fa-tag'
  },
  {
    id: 'N3',
    name: 'Archive',
    path: '/archive',
    class: 'fa-solid fa-box-archive'
  },
  {
    id: 'N4',
    name: 'Trash',
    path: '/trash',
    class: 'fa-solid fa-trash'
  }
];

export const colors = [
  { id: 'c1', color: '#f28b82', className: 'red' },
  { id: 'c2', color: '#ccff90', className: 'green' },
  { id: 'c3', color: '#fbbc04', className: 'orange' },
  { id: 'c4', color: '#cbf0f8', className: 'blue' },
  { id: 'c5', color: '#e6c9a8', className: 'brown' },
  { id: 'c6', color: '#fff475', className: 'yellow' },
  { id: 'c7', color: '#d7aefb', className: 'purple' },
  { id: 'c8', color: '#fdcfe8', className: 'pink' }
];

export const regexArray = {
  email:
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
};
