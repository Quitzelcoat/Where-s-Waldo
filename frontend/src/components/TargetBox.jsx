import PropTypes from 'prop-types';

const TargetBox = ({
  position,
  availableCharacters,
  selectedCharacter,
  setSelectedCharacter,
  onSubmit,
}) => {
  const style = {
    top: position.y,
    left: position.x,
  };

  return (
    <div className="target-box" style={{ ...style, position: 'absolute' }}>
      <select
        value={selectedCharacter}
        onChange={(e) => setSelectedCharacter(e.target.value)}
      >
        <option value="">Choose a character</option>
        {availableCharacters.map((char) => (
          <option key={char} value={char}>
            {char}
          </option>
        ))}
      </select>
      <button onClick={() => onSubmit(selectedCharacter, position)}>
        Confirm
      </button>
    </div>
  );
};

TargetBox.propTypes = {
  position: PropTypes.object.isRequired,
  availableCharacters: PropTypes.array.isRequired,
  selectedCharacter: PropTypes.string.isRequired,
  setSelectedCharacter: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TargetBox;
