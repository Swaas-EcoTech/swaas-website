'use client';

import { useState, useEffect } from 'react';

// This helper function is now updated for the standard AQI scale (0-500+).
const getAqiInfo = (aqi) => {
  if (aqi <= 50) return { level: 'Good', color: '#4CAF50', gradient: 'linear-gradient(135deg, #66BB6A, #43A047)' };
  if (aqi <= 100) return { level: 'Fair', color: '#FFEB3B', gradient: 'linear-gradient(135deg, #FFEE58, #FDD835)' };
  if (aqi <= 150) return { level: 'Moderate', color: '#FF9800', gradient: 'linear-gradient(135deg, #FFA726, #FB8C00)' };
  if (aqi <= 200) return { level: 'Poor', color: '#F44336', gradient: 'linear-gradient(135deg, #EF5350, #E53935)' };
  if (aqi <= 300) return { level: 'Very Poor', color: '#9C27B0', gradient: 'linear-gradient(135deg, #AB47BC, #8E24AA)' };
  return { level: 'Hazardous', color: '#795548', gradient: 'linear-gradient(135deg, #8D6E63, #6D4C41)' };
};

// Helper to format the Unix timestamp
const formatTimestamp = (unixTime) => {
  const date = new Date(unixTime * 1000);
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
};


const AQIDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/aqi');
        if (!response.ok) { throw new Error('Network response was not ok'); }
        const aqiData = await response.json();
        setData(aqiData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="aqi-container loading-state"><div className="spinner"></div></div>;
  if (error) return <div className="aqi-container error-state"> <p>Where ecology meets technology.</p></div>;

  // Use the new data structure
  const aqiInfo = getAqiInfo(data?.aqi);
  const lastUpdated = formatTimestamp(data?.time?.s);
  const cityName = data?.city?.name.split(',')[0] || 'Local Area';

  return (
    <div className="aqi-container" style={{'--aqi-color': aqiInfo.color}}>
      <div className="header">
        <h6>Guru Tegh Bahadur Institute of Technology</h6>
        <span>AQI</span>
      </div>
      
      <div className="aqi-display">
        <div className="aqi-level">{aqiInfo.level}</div>
        <div className="aqi-value" style={{ background: aqiInfo.gradient }}>
          {/* Use the direct AQI value */}
          <span>{data.aqi}</span>
        </div>
      </div>
      
      <div className="pollutants-grid">
        <div className="pollutant-item">
          <span>PM2.5</span>
          {/* Use the new data structure path with optional chaining for safety */}
          <span>{data.iaqi?.pm25?.v?.toFixed(1) || '-'}</span>
        </div>
        <div className="pollutant-item">
          <span>NO₂</span>
          <span>{data.iaqi?.no2?.v?.toFixed(1) || '-'}</span>
        </div>
        <div className="pollutant-item">
          <span>O₃</span>
          <span>{data.iaqi?.o3?.v?.toFixed(1) || '-'}</span>
        </div>
      </div>

      <style jsx>{`
        .aqi-container { background-color: #454851; border-radius: 12px; padding: 0.4rem; text-align: center; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; opacity: 0; animation: fadeIn 0.5s forwards; }
        @keyframes fadeIn { to { opacity: 1; } }
        .loading-state, .error-state { align-items: center; justify-content: center; color: #ffffff; font-size: 0.8rem; }
        .spinner { border: 3px solid rgba(0,0,0,0.1); width: 24px; height: 24px; border-radius: 50%; border-left-color: #0070f3; animation: spin 1s ease infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .header h6 { margin: 0; font-size: 0.8rem; color: #ffffff; font-weight: 600; }
        .header span { font-size: 0.7rem; color: #ffffff; }
        .aqi-display { display: flex; justify-content: space-around; align-items: center; margin-bottom: 0.75rem; }
        .aqi-level { font-size: 1.25rem; font-weight: 700; color: var(--aqi-color); }
        .aqi-value { font-size: 1.75rem; font-weight: 700; color: white; width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-shadow: 1px 1px 1px rgba(0,0,0,0.2); }
        .pollutants-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; border-top: 1px solid #f0f0f0; padding-top: 0.5rem; }
        .pollutant-item { text-align: center; font-size: 0.7rem; color: #ffffff; }
        .pollutant-item span { display: block; }
        .pollutant-item span:first-child { font-weight: 600; }
      `}</style>
    </div>
  );
};

export default AQIDashboard;