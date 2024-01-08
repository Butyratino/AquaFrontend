import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const ChangeAvatarForm = () => {
  const { user } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpdateAvatar = async () => {
    try {
      console.log('User:', user); // Log the user information

      // Use user information from local storage if not available in context
      const userId = user?.userid || localStorage.getItem('userid');

      if (!userId) {
        console.error('User ID is undefined.');
        return;
      }

      // Convert the selected file to base64
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        const base64Image = reader.result.split(',')[1]; // Get the base64 content

        // Make API request to update the user's picture
        axios.post(`http://localhost:8090/api/profile/img/${userId}`, base64Image, {
          headers: {
            'Content-Type': 'text/plain', // Set content type to text/plain for the base64 string
          },
        });
      };
    } catch (error) {
      console.error('Error updating user picture:', error);
    }
  };

  return (
    <div className="change-avatar-form">
      <h2>Change Avatar</h2>
      <form>
        {/* Input for File */}
        <label>New Avatar:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <div className="form-buttons">
          <button type="button" onClick={handleUpdateAvatar}>
            Change Avatar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeAvatarForm;
