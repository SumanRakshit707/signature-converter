import React, { useState } from 'react';
import axios from 'axios';

function UploadSignature() {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState('#000000');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('color', color);
    setLoading(true);

    try {
      const res = await axios.post(
        'https://digital-signature-creator-by-suman.onrender.com/api/process-signature',
        formData,
        { responseType: 'blob' }
      );
      const blob = new Blob([res.data], { type: 'image/png' });
      setResult(URL.createObjectURL(blob));
    } catch {
      alert('Failed to process signature.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="upload-page">
      <form onSubmit={handleUpload}>
        <label>
          Upload Signature:
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <label>
          Select Ink Color:
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating PNG...' : 'Create'}
        </button>
      </form>

      {result && (
        <div className="result">
          <img src={result} alt="Signature" />
          <a href={result} download="signature.png">
            <button>Download</button>
          </a>
        </div>
      )}
    </main>
  );
}

export default UploadSignature;

