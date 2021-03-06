import React from 'react';
import './Popup.scss';

const Popup = ({ content, closePopup }) => {
  const stop = (e) => {
    e.stopPropagation();
  };
  return (
    <div className='popup-outer-background' onClick={closePopup}>
      <div className='popup-inner-background' onClick={(e) => stop(e)}>
        <button className='popup__close' onClick={closePopup}><i className='fa fa-close'/></button>
        { content }
      </div>
    </div>
  );
};

Popup.propTypes = {
  closePopup: React.PropTypes.func.isRequired,
  content: React.PropTypes.object.isRequired
};

export default Popup;
