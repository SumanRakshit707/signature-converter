import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">
      <button className="btn" onClick={() => navigate('/draw')}>Draw Your Signature</button>
      <button className="btn" onClick={() => navigate('/upload')}>Upload Your Signature</button>
    </main>
  );
}

export default Home;

