import { useRef, useState } from 'react';
import './App.css';
import './Common.css';
import ColorSelector from './components/ColorSelector';

function App() {
  const isMouseDown = useRef(false);//To save the current state of the mouse down to prevent the mouse move function updating the width of the left panel.

  const [leftPanelWidth, setLeftPanelWidth] = useState("50%");//To update the width of the left panel div when resize with the handler.
  const [canvasBG, setCanvasBG] = useState("black");

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
        <div className="left-view-port flex flex-cntr">
          <canvas width="200" height="100" style={{backgroundColor: canvasBG}}>
          </canvas>
        </div>
        <div className="element-details absolute">
          <span>
            <p className="inline_block v_align_m">Background {canvasBG}</p>
            <div className="inline_block v_align_m selected-bg m_l_5" style={{backgroundColor: canvasBG}}></div>
          </span>
        </div>
      </div>

      <div className="resize-handle flex flex-cntr" onMouseDown={onMouseDownHandler}>||</div>

      <div className="right-panel">
        <div className="style-edit-cont  p_10">
          <div className="style-option-cont m_5">
            <label htmlFor="bg-clr-picker">Background</label>
            <ColorSelector customId="bg-clr-picker" customClass="inline_block v_align_m m_l_5" defaultValue={canvasBG} onChange={setCanvasBG}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
