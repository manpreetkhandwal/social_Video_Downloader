import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import logo from './assets/main_fav.png';

const App = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [platform, setPlatform] = useState('youtube');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [webIcon, setWebIcon] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);

  // Determine icon and platform based on URL
  const determinePlatform = (url) => {
    if (url.includes('youtu.be') || url.includes('youtube.com')) {
      setPlatform('youtube');
      return <FontAwesomeIcon icon={faYoutube} style={{ color: "#fa0000" }} />;
    } else if (url.includes('instagram.com')) {
      setPlatform('instagram');
      return <FontAwesomeIcon icon={faInstagram} style={{ color: "#E1306C" }} />;
    } else if (url.includes('facebook.com')) {
      setPlatform('facebook');
      return <FontAwesomeIcon icon={faFacebook} style={{ color: "#0171da" }} />;
    }
    return null;
  };

  useEffect(() => {
    setWebIcon(determinePlatform(videoUrl));
  }, [videoUrl]);

  const handleDownload = async () => {
    if (!videoUrl) {
      setMessage('Please enter a valid URL.');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setDownloadLink(null);

    try {
      // In a real app, you would call your backend API here
      const response = await mockApiCall(videoUrl, platform);
      
      if (response.success) {
        setDownloadLink(response.downloadUrl);
        setMessage('Video ready for download!');
      } else {
        setMessage(response.message || 'Failed to process the video');
      }
    } catch (err) {
      setMessage('An error occurred while processing your request');
    } finally {
      setIsLoading(false);
    }
  };

  const mockApiCall = (url, platform) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          downloadUrl: `https://download?url=${encodeURIComponent(url)}&platform=${platform}`,
          message: 'Video ready for download'
        });
      }, 1500);
    });
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen">
      <img src={logo} className='w-[5vw] h-[8vh] absolute m-6' alt="Logo" />
      <div className="flex items-center justify-center h-screen">
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg w-[80vw] min-h-[60vh]"
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {webIcon} Social Video Downloader
          </h1>

          <div className="flex flex-col items-center gap-5">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Enter Video URL"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleDownload}
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Processing...' : 'Download Video'}
            </button>
          </div>

          {message && (
            <div className={`mt-4 text-center ${
              message.includes('ready') ? 'text-green-500' : 'text-red-500'
            }`}>
              {message}
            </div>
          )}

          {downloadLink && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
              <a
                href={downloadLink}
                download
                className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition duration-300"
              >
                Download Now
              </a>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Supported Platforms:</h3>
            <div className="flex justify-center gap-4">
              <FontAwesomeIcon icon={faYoutube} size="2x" style={{ color: "#fa0000" }} />
              <FontAwesomeIcon icon={faInstagram} size="2x" style={{ color: "#E1306C" }} />
              <FontAwesomeIcon icon={faFacebook} size="2x" style={{ color: "#0171da" }} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default App;