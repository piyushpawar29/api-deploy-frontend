import React, { useState } from 'react';

const App = () => {
  const [secretKey, setSecretKey] = useState('');
  const [numberList, setNumberList] = useState('');
  const [statsKey, setStatsKey] = useState('');
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    const numbers = numberList
      .split(',')
      .map(num => parseFloat(num.trim()))
      .filter(num => !isNaN(num));

    const response = await fetch('https://api-deploy-c527.onrender.com/upload-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secretKey,
        numbers,
      }),
    });

    const data = await response.json();
    console.log('Upload:', data);
    alert(data.message || 'Upload complete');
  };

  const handleGetStats = async () => {
    const response = await fetch('https://api-deploy-c527.onrender.com/get-stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secretKey: statsKey,
      }),
    });

    const data = await response.json();
    console.log('Stats:', data);
    if (data.success) {
      setResult(data.data);
    } else {
      alert(data.message || 'Something went wrong');
    }
  };

  return (
    <div style={{
  padding: '2rem',
  fontFamily: 'Arial',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}}>
  <h2 style={{ marginBottom: '1rem' }}>Stat Operations</h2>

  <div style={{ alignItems: 'center', marginBottom: '2rem', backgroundColor: '#f7f7f7', padding: '1rem', borderRadius: '5px' }}>
    <h4 style={{  marginBottom: '0.5rem' }}>Upload Data</h4>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Enter secret key"
        value={secretKey}
        onChange={e => setSecretKey(e.target.value)}
        style={{ marginRight: '0.5rem', padding: '0.5rem', border: '1px solid #ccc' }}
      />
      <input
        type="text"
        placeholder="Enter numbers separated by commas"
        value={numberList}
        onChange={e => setNumberList(e.target.value)}
        style={{ width: '300px', padding: '0.5rem', border: '1px solid #ccc' }}
      />
    </div>
    <button onClick={handleUpload} style={{ width: '100%', padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px' }}>Upload Data</button>
  </div>

  <div style={{ marginBottom: '2rem', backgroundColor: '#f7f7f7', padding: '1rem', borderRadius: '5px' }}>
    <h4 style={{ marginBottom: '0.5rem' }}>Get Stats</h4>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Enter secret key"
        value={statsKey}
        onChange={e => setStatsKey(e.target.value)}
        style={{ marginRight: '0.5rem', padding: '0.5rem', border: '1px solid #ccc' }}
      />
      <button onClick={handleGetStats} style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px' }}>Get Stats</button>
    </div>
  </div>

  {result && (
    <div style={{ marginTop: '1rem', backgroundColor: '#f7f7f7', padding: '1rem', borderRadius: '5px' }}>
      <h4 style={{ marginBottom: '0.5rem' }}>Result</h4>
      <p style={{ marginBottom: '0.5rem' }}>Min: {result.min}</p>
      <p style={{ marginBottom: '0.5rem' }}>Max: {result.max}</p>
      <p style={{ marginBottom: '0.5rem' }}>Count: {result.count}</p>
    </div>
  )}
</div>
  );
};

export default App;
