import React from 'react'
import { UserButton } from '@clerk/clerk-react';
import * as DashboardService from './DashboardService'
import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import ProtectedRoute from '../Authentication/ProtectedRoute';

function Dashboard() {
  const { getToken } = useAuth();
  const [file, setFile] = useState(null);
  const [videos, setVideos] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        alert("Please select a video first.");
        return;
      }

      const token = await getToken()
      const data = await DashboardService.uploadVideo(file, token)

      alert(data.message || "Upload successful!");
      setFile(null);
      fetchVideos();
    } catch (error) {
      console.log("Error uploading video:", error);
      alert(error.message || "Something went wrong uploading the video.");
    }
  };

  const fetchVideos = async () => {
    const token = await getToken()
    const response = await DashboardService.fetchVideos(token)
    setVideos(response.videos || [])
  };

  const fetchUserData = async () => {
    try {
      const token = await getToken()
      const data = await DashboardService.getUserData(token)
      console.log("User data:", data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // useEffect(() => {
  //   if (isLoaded && isSignedIn && user) {
  //     fetchUserData();
  //     fetchVideos();
  //   }
  // }, [isLoaded, isSignedIn, user]);

  return (
    <div>
      <h1>Dashboard</h1>
      <ProtectedRoute>
        <UserButton />
      <div style={{ marginBottom: "20px" }}>
        <h2>Upload a Video</h2>
        <input
          type="file"
          accept="video/mp4, video/quicktime"
          onChange={handleFileChange}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <div>
        <h2>Your Uploaded Videos</h2>
        {videos.length === 0 ? (
          <p>No videos found.</p>
        ) : (
          videos.map((video) => (
            <div key={video.id} style={{ marginBottom: "1rem" }}>
              <video src={video.url} controls width="320" height="240" />
            </div>
          ))
        )}
      </div>
      </ProtectedRoute>
    </div>
  );
}

export default Dashboard;
