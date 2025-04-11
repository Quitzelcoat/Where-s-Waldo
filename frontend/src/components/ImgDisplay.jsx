import PropTypes from 'prop-types';

const ImageDisplay = ({ imgRef, OnImageClick }) => {
  return (
    <div className="img-container" onClick={OnImageClick}>
      <div className="photo">
        <img
          ref={imgRef}
          src="./beach.jpg"
          alt="Find Waldo"
          className="photo-img"
        />
      </div>
    </div>
  );
};

ImageDisplay.propTypes = {
  imgRef: PropTypes.object.isRequired,
  OnImageClick: PropTypes.func.isRequired,
};

export default ImageDisplay;
