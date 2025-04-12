/* eslint-disable react/prop-types */
const TargetBox = ({
  position,
  availableCharacters,
  selectedCharacter,
  setSelectedCharacter,
  onSubmit,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedCharacter, position);
  };

  return (
    <div
      //   ref={boxRef}
      className="box"
      style={{
        top: position.y + 'px',
        left: position.x + 'px',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="box-content">
        <form onSubmit={handleSubmit}>
          <label htmlFor="character">Select a character:</label>
          <select
            id="character"
            value={selectedCharacter}
            onChange={(e) => setSelectedCharacter(e.target.value)}
          >
            <option value="">-- Select --</option>
            {availableCharacters.map((char) => (
              <option key={char} value={char}>
                {char}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default TargetBox;
