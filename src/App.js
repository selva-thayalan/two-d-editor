import { useRef, useState } from 'react';
import './App.css';
import './Common.css';

function App() {
  const isMouseDown = useRef(false);//To save the current state of the mouse down to prevent the mouse move function updating the width of the left panel.

  const [leftPanelWidth, setLeftPanelWidth] = useState("50%");//To update the width of the left panel div when resize with the handler.

  const onMouseDownHandler = function () {//We need to set the isMouseDown flag true to mouse move handler update the left panel width.
    isMouseDown.current = true;
  };
  const onMouseUpHandler = function () {//We need to set the isMouseDown flag false to prevent the mouse move handler update the left panel width unnecessarily.
    isMouseDown.current = false;
  };

  const onMouseMoveHandler = function (e) {
    if(isMouseDown.current){//If the mouse is down then only we need to update the width of the left panel.
      const newLeftWidth = (e.clientX * 100) /  e.view.innerWidth;
      setLeftPanelWidth(`${newLeftWidth}%`);
    }
  };

  return (
    <div className="app flex" onMouseMove={onMouseMoveHandler} onMouseUp={onMouseUpHandler}>
      <div className="left-panel" style={{width: leftPanelWidth}}>

      </div>

      <div className="resize-handle" onMouseDown={onMouseDownHandler}></div>

      <div className="right-panel">

      </div>
    </div>
  );
}

export default App;
