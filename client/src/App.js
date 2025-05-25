
// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [image, setImage] = useState(null);
//   const [color, setColor] = useState('#000000');
//   const [resultUrl, setResultUrl] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//     setResultUrl(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!image) return alert('Please upload a signature image');

//     const formData = new FormData();
//     formData.append('image', image);
//     formData.append('color', color);

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/api/process-signature',
//         formData,
//         { responseType: 'blob' }
//       );

//       const url = URL.createObjectURL(new Blob([response.data]));
//       setResultUrl(url);
//     } catch (err) {
//       alert('Failed to process signature');
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   const handleDownload = () => {
//     const a = document.createElement('a');
//     a.href = resultUrl;
//     a.download = 'signature.png';
//     a.click();
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>Signature Converter</h1>

//       <form onSubmit={handleSubmit} style={styles.form}>
//         <input type="file" accept="image/*" onChange={handleImageChange} style={styles.input} />
//         <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={styles.colorPicker} />
//         <button type="submit" disabled={loading} style={styles.button}>
//           {loading ? 'Processing...' : 'Convert Signature'}
//         </button>
//       </form>

//       {resultUrl && (
//         <div style={styles.result}>
//           <h3>Preview:</h3>
//           <img src={resultUrl} alt="Converted Signature" style={styles.image} />
//           <button onClick={handleDownload} style={styles.downloadButton}>Download PNG</button>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: { textAlign: 'center', padding: 40, fontFamily: 'Arial' },
//   header: { fontSize: '2rem', marginBottom: 20 },
//   form: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 },
//   input: { fontSize: 16 },
//   colorPicker: { width: 60, height: 40 },
//   button: { padding: '10px 20px', fontSize: 16, cursor: 'pointer' },
//   result: { marginTop: 30 },
//   image: { maxWidth: '100%', height: 'auto', marginTop: 10, background: '#f4f4f4', padding: 10 },
//   downloadButton: { marginTop: 10, padding: '8px 16px', fontSize: 14, cursor: 'pointer' },
// };

// export default App;
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState('#000000');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('color', color);
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/process-signature', formData, {
        responseType: 'blob',
      });

      const blob = new Blob([res.data], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      setResult(url);
    } catch (err) {
      alert('Failed to process signature');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>PNG Signature Creator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Upload Signature:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <label>
          Select Ink Color:
          <div className="color-picker">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <span className="hex-code">{color.toUpperCase()}</span>
          </div>
        </label>


        <button type="submit" disabled={loading}>
          {loading ? 'Creating PNG' : 'Create'}
        </button>
      </form>

      {result && (
        <div className="result">
          <h2>Your Signature is Ready</h2>
          <img src={result} alt="Processed Signature" />
          <a href={result} download="signature.png">
            <button>Download</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
