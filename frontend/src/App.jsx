import { useState, useEffect, useRef } from "react";
import "./app.css";

function App() {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const boxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(boxRef.current && !boxRef.current.contains(event.target) && isBoxVisible) {
        setIsBoxVisible(false);
      }
    };

    if(isBoxVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isBoxVisible]);

  const handleShowBox = (e) => {
    e.preventDefault();

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setBoxPosition({ x, y });
    setIsBoxVisible(true);
  };

  const handleCloseBox = (e) => {
    e.preventDefault();
    setIsBoxVisible(false);
  };

  return (
    <>
      <div className='img-container'>
        <div className='photo' onClick={handleShowBox}>
          <img src='./beach.jpg' alt='Find Waldo' className='photo-img' />
        </div>
      </div>

      {isBoxVisible && (
        <div
          ref={boxRef}
          className='box'
          style={{
            top: boxPosition.y + "px",
            left: boxPosition.x + "px",
          }}
        >
          <div className='box-content'>
            <h2>Insert Character</h2>
            <button onClick={handleCloseBox}>close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
