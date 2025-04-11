import { useState, useRef } from 'react';
import ImageDisplay from './components/ImgDisplay';
import { validateClick } from './services/coordinatesApi';
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

  // Close the box when clicking outside of it
  const handleToggleBox = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isBoxVisible) {
      setIsBoxVisible(false);
      setMessage('');
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
      const response = await validateClick(
        selectedCharacter,
        normalizedX,
        normalizedY
      );
      setMessage(response.message);

      if (response.success) {
        setAvailableCharacters((prevChar) =>
          prevChar.filter((char) => char !== selectedCharacter)
        );
      }
      setSelectedCharacter('');
    } catch (error) {
      setMessage('An error occurred', error);
      setSelectedCharacter('');
      console.error('Error validating click:', error);
    }

    setIsBoxVisible(false);
  };

  return (
    <>
      {/* image display */}
      <ImageDisplay imgRef={imgRef} OnImageClick={handleToggleBox} />

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
