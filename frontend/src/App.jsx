import { useState } from "react";
import "./app.css";

function App() {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });

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
