import React, { useRef, useState } from 'react';

function DrawSignature() {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#000000');

  const downloadSignature = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    const draw = (event) => {
      ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      ctx.stroke();
    };

    const stop = () => {
      canvasRef.current.removeEventListener('mousemove', draw);
      canvasRef.current.removeEventListener('mouseup', stop);
    };

    canvasRef.current.addEventListener('mousemove', draw);
    canvasRef.current.addEventListener('mouseup', stop);
  };

  return (
    <main className="draw-page">
      <label>
        Choose the color of your: 
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </label>
      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        className="signature-canvas"
        onMouseDown={startDrawing}
      ></canvas>
      <div className="draw-actions">
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={downloadSignature}>Download</button>
      </div>
    </main>
  );
}

export default DrawSignature;

