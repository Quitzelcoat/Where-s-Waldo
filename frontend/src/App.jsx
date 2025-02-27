import { useState, useRef } from "react";
import "./app.css";

function App() {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const boxRef = useRef(null);

  const handleToggleBox = (e) => {
    e.preventDefault();

    e.stopPropagation();

    if(isBoxVisible) {
      setIsBoxVisible(false);
    } else {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setBoxPosition({ x, y });
      setIsBoxVisible(true);
    }
  }

  const handleCloseBox = (e) => {
    e.stopPropagation();
    setIsBoxVisible(false);
  }

  return (
    <>
      <div className='img-container' onClick={handleToggleBox}>
        <div className='photo'>
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
          onClick={(e) => e.stopPropagation()}
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