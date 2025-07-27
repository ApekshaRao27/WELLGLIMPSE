""// DailyChallenges.js

import React, { useState, useEffect, useRef } from 'react';
import meditationVideo from '../assets/inhale-exhale.mp4';
import alarmSound from '../assets/alarm.mp3';

const DailyChallenges = () => {
  const [waterGoal, setWaterGoal] = useState(0);
  const [waterDrank, setWaterDrank] = useState(0);
  const [waterPopup, setWaterPopup] = useState(false);

  const [stepsGoal, setStepsGoal] = useState(0);
  const [stepsWalked, setStepsWalked] = useState(0);
  const [stepsPopup, setStepsPopup] = useState(false);

  const [isWalking, setIsWalking] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);
  const watchId = useRef(null);
  const lastCoords = useRef(null);

  const [meditationPopup, setMeditationPopup] = useState(false);
  const [meditationTime, setMeditationTime] = useState(null);
  const [showMeditationVideo, setShowMeditationVideo] = useState(false);
  const [videoLoopsLeft, setVideoLoopsLeft] = useState(0);

  const videoRef = useRef(null);

  const [activities, setActivities] = useState([]);
  const [activityPopup, setActivityPopup] = useState(false);
  const [activityTimePopup, setActivityTimePopup] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const [showTimer, setShowTimer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timerRef = useRef(null);
  const audioRef = useRef(new Audio(alarmSound));

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('✅ Location permission granted:', position);
        },
        (error) => {
          console.error('❌ Location permission denied:', error);
          alert(
            'Please allow location access from browser settings (Settings > Site Settings > Location).'
          );
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (showTimer && timerSeconds > 0) {
      timerRef.current = setTimeout(() => {
        setTimerSeconds(timerSeconds - 1);
      }, 1000);
    } else if (showTimer && timerSeconds === 0) {
      audioRef.current.play();
      setShowTimer(false);
    }

    return () => clearTimeout(timerRef.current);
  }, [timerSeconds, showTimer]);

  useEffect(() => {
    if (videoRef.current && videoLoopsLeft === 0) {
      setShowMeditationVideo(false);
    }
  }, [videoLoopsLeft]);

  const handleVideoEnd = () => {
    if (videoLoopsLeft > 1) {
      setVideoLoopsLeft((prev) => prev - 1);
      videoRef.current.play();
    } else {
      setVideoLoopsLeft(0);
      setShowMeditationVideo(false);
    }
  };

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371e3;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const startWalking = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsWalking(true);
    setStepsWalked(0);
    setTotalDistance(0);
    lastCoords.current = null;

    const id = navigator.geolocation.watchPosition(
      (position) => {
        console.log('📍 New position:', position.coords);
        const { latitude, longitude } = position.coords;

        if (lastCoords.current) {
          const dist = haversineDistance(
            lastCoords.current.lat,
            lastCoords.current.lon,
            latitude,
            longitude
          );

          setTotalDistance((prev) => {
            const newTotal = prev + dist;
            const newSteps = Math.floor(newTotal / 0.75);
            setStepsWalked(newSteps);
            return newTotal;
          });
        }
        lastCoords.current = { lat: latitude, lon: longitude };
      },
      (error) => {
        console.error('❌ Geolocation error:', error.message);
        alert('Location access denied or unavailable.');
        stopWalking();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
    watchId.current = id;
  };

  const stopWalking = () => {
    if (watchId.current) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
    setIsWalking(false);
  };

  const timeOptions = [
    { label: '10 min', value: 600 },
    { label: '30 min', value: 1800 },
    { label: '1 hr', value: 3600 },
    { label: '2 hr', value: 7200 },
  ];

   return (
    <>
      <div style={styles.card}>
        <h2 style={styles.title}>Daily Challenges</h2>

        {/* Water */}
        <div style={styles.challengeRow}>
          <span style={styles.challengeText}>
            {waterGoal > 0  ? `Drink ${waterGoal} Glass${waterGoal > 1 ? 'es' : ''} (${waterDrank}/${waterGoal})` : 'Drink Water'}
          </span>
          <div style={styles.buttonGroup}>
            <button style={styles.setBtn} onClick={() => setWaterPopup(true)}>Set</button>
            {waterGoal > 0 && waterDrank < waterGoal && (
              <button style={styles.tickBtn} onClick={() => setWaterDrank(waterDrank + 1)}>✔</button>
            )}
          </div>
        </div>

        {/* Steps */}
        <div style={styles.challengeRow}>
          <span style={styles.challengeText}>
            {stepsGoal > 0
              ? `Walk ${stepsGoal} Steps (${stepsWalked}/${stepsGoal})`
              : 'Walk'}
          </span>
          <div style={styles.buttonGroup}>
            <button style={styles.setBtn} onClick={() => setStepsPopup(true)}>Set</button>
            {stepsGoal > 0 && (
              !isWalking ? (
                <button style={styles.startBtn} onClick={startWalking}>Start Walk</button>
              ) : (
                <button style={styles.tickBtn} onClick={stopWalking}>Stop</button>
              )
            )}
          </div>
        </div>

        {stepsGoal > 0 && (
          <p style={{ fontSize: '12px', color: '#ccc', marginTop: '-8px', marginBottom: '12px' }}>
            Distance: {(totalDistance / 1000).toFixed(2)} km
          </p>
        )}

        {/* Meditation */}
        <div style={styles.challengeRow}>
          <span style={styles.challengeText}>
            {meditationTime ? `Meditate for ${meditationTime} min` : 'Do Meditation'}
          </span>
          <div style={styles.buttonGroup}>
            <button style={styles.setBtn} onClick={() => setMeditationPopup(true)}>Set</button>
            {meditationTime && (
              <button
                style={styles.startBtn}
                onClick={() => {
                  setShowMeditationVideo(true);
                  setVideoLoopsLeft(meditationTime);
                }}
              >
                Start
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Activities */}
        {activities.map((activity, index) => (
          <div style={styles.challengeRow} key={index}>
            <span style={styles.challengeText}>{activity.name}</span>
            <button
              style={styles.setBtn}
              onClick={() => {
                setSelectedActivity(activity.name);
                setActivityTimePopup(true);
              }}
            >
              Set
            </button>
          </div>
        ))}

        <button style={styles.addBtn} onClick={() => setActivityPopup(true)}>+ Add Activity</button>
      </div>

      {/* Popups */}
      {waterPopup && (
        <div style={styles.fullScreenPopup}>
          <button style={styles.closeBtn} onClick={() => setWaterPopup(false)}>❌</button>
          <h3>Set Water Goal</h3>
          {[4, 6, 8, 10].map(num => (
            <button key={num} style={styles.optionBtn} onClick={() => {
              setWaterGoal(num); setWaterDrank(0); setWaterPopup(false);
            }}>{num}</button>
          ))}
        </div>
      )}

      {stepsPopup && (
        <div style={styles.fullScreenPopup}>
          <button style={styles.closeBtn} onClick={() => setStepsPopup(false)}>❌</button>
          <h3>Set Step Goal</h3>
          {[3000, 5000, 7000, 10000].map(num => (
            <button key={num} style={styles.optionBtn} onClick={() => {
              setStepsGoal(num); setStepsWalked(0); setTotalDistance(0); setStepsPopup(false);
            }}>{num}</button>
          ))}
        </div>
      )}

      {meditationPopup && (
        <div style={styles.fullScreenPopup}>
          <button style={styles.closeBtn} onClick={() => setMeditationPopup(false)}>❌</button>
          <h3>Select Meditation Time</h3>
          {[1, 2, 5, 10].map(min => (
            <button key={min} style={styles.optionBtn} onClick={() => {
              setMeditationTime(min); setMeditationPopup(false);
            }}>{min} min</button>
          ))}
        </div>
      )}

      {activityPopup && (
        <div style={styles.fullScreenPopup}>
          <button style={styles.closeBtn} onClick={() => setActivityPopup(false)}>❌</button>
          <h3>Select an Activity</h3>
          {['Yoga', 'Cycling', 'Swimming', 'Basketball'].map(activity => (
            <button key={activity} style={styles.optionBtn} onClick={() => {
              setActivities([...activities, { name: activity }]);
              setActivityPopup(false);
            }}>{activity}</button>
          ))}
        </div>
      )}

      {activityTimePopup && selectedActivity && (
        <div style={styles.fullScreenPopup}>
          <button style={styles.closeBtn} onClick={() => setActivityTimePopup(false)}>❌</button>
          <h3>Set time for {selectedActivity}</h3>
          {timeOptions.map(opt => (
            <button key={opt.value} style={styles.optionBtn} onClick={() => {
              setActivityTimePopup(false);
              setTimerSeconds(opt.value);
              setShowTimer(true);
            }}>{opt.label}</button>
          ))}
        </div>
      )}

      {showMeditationVideo && (
        <div style={styles.videoOverlay}>
          <video
            ref={videoRef}
            src={meditationVideo}
            autoPlay
            onEnded={handleVideoEnd}
            style={styles.video}
          />
        </div>
      )}

      {showTimer && (
        <div style={styles.timerOverlay}>
          <h1 style={styles.timerText}>
            {Math.floor(timerSeconds / 60).toString().padStart(2, '0')}:
            {(timerSeconds % 60).toString().padStart(2, '0')}
          </h1>
        </div>
      )}
    </>
  );
};

const styles = {
 card: {
    backgroundColor: '#2e2e2e',
    padding: '20px',
    borderRadius: '12px',
    color: 'white',
    overflowY: 'auto',
    position: 'relative',
  },
  title: { fontSize: '18px', marginBottom: '16px', fontWeight: '500' },
  challengeRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: '12px', gap: '10px',
  },
  buttonGroup: { display: 'flex', gap: '6px' },
  setBtn: {
    padding: '6px 12px', backgroundColor: '#007bff', color: 'white',
    border: 'none', borderRadius: '6px', cursor: 'pointer',
  },
  startBtn: {
    padding: '6px 12px', backgroundColor: '#ffc107', color: '#000',
    border: 'none', borderRadius: '6px', cursor: 'pointer',
  },
  tickBtn: {
    padding: '6px 10px', backgroundColor: '#28a745', color: 'white',
    border: 'none', borderRadius: '6px', cursor: 'pointer',
  },
  fullScreenPopup: {
    position: 'fixed', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)', backgroundColor: '#1a1a1a',
    padding: '24px', borderRadius: '12px', zIndex: 9999,
    boxShadow: '0 0 20px rgba(0,0,0,0.5)', textAlign: 'center', color: 'white',
    width: '300px',
  },
  optionBtn: {
    display: 'inline-block', margin: '8px', padding: '10px 16px',
    backgroundColor: '#444', color: 'white', border: 'none',
    borderRadius: '6px', cursor: 'pointer',
  },
  addBtn: {
    marginTop: '10px', padding: '8px 14px',
    backgroundColor: '#00bcd4', color: 'white',
    border: 'none', borderRadius: '6px', cursor: 'pointer',
    width: '100%',
  },
  challengeText: { flex: 1 },
  videoOverlay: {
    position: 'fixed', top: 0, left: 0, height: '100vh',
    width: '100vw', backgroundColor: 'black', zIndex: 99999,
  },
  video: { height: '100%', width: '100%', objectFit: 'cover' },
  timerOverlay: {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: '#000000e6', display: 'flex',
    alignItems: 'center', justifyContent: 'center', zIndex: 99999,
  },
  timerText: {
    fontSize: '64px', fontWeight: 'bold', color: 'white',
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '14px',
    background: 'transparent',
    color: '#fff',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default DailyChallenges;
