import './modal.css';

export const SignoutModal = ({ setSignoutModal, handleDispatch }) => {
  const handleSignoutFunction = () => {
    setSignoutModal(false);
    handleDispatch();
  };

  return (
    <div className='modal modal__open flex-ct-ct'>
      <div
        className='modal__background'
        onClick={() => setSignoutModal(false)}
      ></div>
      <div className='modal__content modal__content__signout'>
        <h1 className='md sb cen mg--full'>
          Are you sure you want to signout ?
        </h1>
        <div className='flex-ct-ct mg--full'>
          <button className='btn btn--red' onClick={handleSignoutFunction}>
            Yes
          </button>
          <button
            className='btn btn--auth--solid btn--modal'
            onClick={() => setSignoutModal(false)}
          >
            No
          </button>
        </div>
      </div>
      <span className='modal__close' onClick={() => setSignoutModal(false)}>
        <i className='fas fa-times-circle'></i>
      </span>
    </div>
  );
};
