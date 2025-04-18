import { useState, useRef, useEffect } from 'react';
import ImageDisplay from './ImgDisplay';
import TargetBox from './TargetBox';

import Timer from './Timer';
import HighScore from './HighScore';

import { validateClick } from '../services/coordinatesApi';

const GameBoard = () => {
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

  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [elapseTime, setElapseTime] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Ref for the target box and the image
  const imgRef = useRef(null);

  // Close the box when clicking outside of it
  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!gameStarted) {
      setGameStarted(true);
    }

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

  const handleSubmit = async (selectedCharacter, position) => {
    if (!selectedCharacter) {
      setMessage('Please select a character');
      return;
    }

    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    const normalizedX = position.x / rect.width;
    const normalizedY = position.y / rect.height;

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
      console.error('Error validating click:', error);
      setMessage('An error occurred', error);
      setSelectedCharacter('');
    }

    setIsBoxVisible(false);
  };

  useEffect(() => {
    if (gameStarted && availableCharacters.length === 0) {
      setGameFinished(true);
      setShowModal(true);
    }
  }, [availableCharacters, gameStarted]);

  return (
    <>
      {gameStarted && !gameFinished && (
        <Timer start={gameStarted} onTick={setElapseTime} />
      )}

      {/* image display */}
      <ImageDisplay imgRef={imgRef} OnImageClick={handleImageClick} />

      {/* box display */}
      {isBoxVisible && (
        <TargetBox
          position={boxPosition}
          availableCharacters={availableCharacters}
          selectedCharacter={selectedCharacter}
          setSelectedCharacter={setSelectedCharacter}
          onSubmit={handleSubmit}
        />
      )}

      {message && <div className="message">{message}</div>}

      {showModal && (
        <HighScore
          score={elapseTime}
          onClose={() => setShowModal(false)}
          onSaved={() => {}}
        />
      )}
    </>
  );
};

export default GameBoard;
