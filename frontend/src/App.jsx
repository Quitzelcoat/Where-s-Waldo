import { useState, useRef } from 'react';
import axios from 'axios';
import './app.css';

function App() {
  // State for the box visibility and position
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState('');

  // State for characters selection and character removal
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [availableCharacters, setAvailableCharacters] = useState([
    'Red Shorts Guy',
    'Briefcase Lady',
    'Beach Dog',
  ]);

  // Ref for the target box and the image
  const boxRef = useRef(null);
  const imgRef = useRef(null);

  // const characters = ['Red Shorts Guy', 'Briefcase Lady', 'Beach Dog'];

  // Close the box when clicking outside of it
  const handleToggleBox = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isBoxVisible) {
      setIsBoxVisible(false);
    } else {
      if (!imgRef.current) return;
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setBoxPosition({ x, y });
      setIsBoxVisible(true);
      setMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCharacter) {
      setMessage('Please select a character');
      return;
    }

    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();

    const normalizedX = boxPosition.x / rect.width;
    const normalizedY = boxPosition.y / rect.height;

    try {
      const response = await axios.post('http://localhost:3000/validate', {
        character: selectedCharacter,
        x: normalizedX,
        y: normalizedY,
      });
      setMessage(response.data.message);

      if (response.data.success) {
        setAvailableCharacters((prevChar) =>
          prevChar.filter((char) => char !== selectedCharacter)
        );
        setSelectedCharacter('');
      }
    } catch (error) {
      setMessage('An error occurred', error);
    }

    setIsBoxVisible(false);
  };

  return (
    <>
      {/* image display */}
      <div className="img-container" onClick={handleToggleBox}>
        <div className="photo">
          <img
            ref={imgRef}
            src="./beach.jpg"
            alt="Find Waldo"
            className="photo-img"
          />
        </div>
      </div>

      {/* box display */}
      {isBoxVisible && (
        <div
          ref={boxRef}
          className="box"
          style={{
            top: boxPosition.y + 'px',
            left: boxPosition.x + 'px',
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
      )}

      {message && <div className="message">{message}</div>}
    </>
  );
}

export default App;
