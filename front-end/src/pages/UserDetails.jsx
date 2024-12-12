import React, { useState, useEffect } from 'react';
import { getCookiesAsJson } from '../utils/cookieHelper.js';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const UserDetails = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [description, setDescription] = useState('');
  const [currentlyEmployedAt, setCurrentlyEmployedAt] = useState('');
  const [location, setLocation] = useState('');
  const [education, setEducation] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [technologies, setTechnologies] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);

  const [imageUrl, setImageUrl] = useState('');
  const cookies = getCookiesAsJson();
  const authToken = cookies.token;
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login'); // Redirect if no token
    }
  }, [authToken, navigate]);

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file); // Ensure the key matches the backend's expectation
      
      try {
        const response = await axios.post(
          'http://localhost:8080/user/uploadImage',
          formData,
          {
            headers: {
              token: authToken, // Include the token for authentication
            },
          }
        );
        if (response.data && response.data.imageUrl) {
          console.log( response.data.imageUrl || "No URL returned");
          
          setImageUrl(response.data.imageUrl); // Update state with the returned image URL
        } else {
          console.error('Image upload successful, but no URL returned:', response.data);
        }
      } catch (error) {
        console.error('Error uploading image:', error.response?.data || error.message);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      profileUrl: imageUrl,
      description,
      currentlyEmployedAt,
      location,
      education,
      websiteUrl,
      githubUrl,
      linkedinUrl,
      technologies,
      skills,
      projects,
    };

    axios.post('http://localhost:8080/user/details', userDetails, {
      headers: {
        'token': `${authToken}`,
      },
    })
    .then(response => {
      console.log('User details updated:', response.data);
      navigate('/profile');
    })
    .catch(error => {
      console.error('Error updating user details:', error);
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-start min-h-screen pt-16 px-6 scrollbar-hidden  ">
        <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-y-auto max-h-screen scrollbar-hidden">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium" htmlFor="profile-picture">Profile Picture</label>
              <input
                type="file"
                id="profile-picture"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="mt-2 p-2 border rounded-lg w-full"
              />
              {imageUrl && <img src={imageUrl} alt="Profile" className="mt-4 max-w-xs" />}
            </div>

            <div>
              <label className="block text-lg font-medium" htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 p-2 border rounded-lg w-full text-black"
              />
            </div>

            <div>
              <label className="block text-lg font-medium" htmlFor="currently-employed-at">Currently Employed At</label>
              <input
                type="text"
                id="currently-employed-at"
                value={currentlyEmployedAt}
                onChange={(e) => setCurrentlyEmployedAt(e.target.value)}
                className="mt-2 p-2 border rounded-lg w-full text-black"
              />
            </div>

            <div>
              <label className="block text-lg font-medium" htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2 p-2 border rounded-lg w-full text-black"
              />
            </div>

            <div>
              <label className="block text-lg font-medium" htmlFor="education">Current Education</label>
              <input
                type="text"
                id="education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="mt-2 p-2 border rounded-lg w-full text-black"
              />
            </div>

            <div>
              <label className="block text-lg font-medium" htmlFor="website-url">Website URL</label>
              <input
                type="url"
                id="website-url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="mt-2 p-2 border rounded-lg w-full text-black"
              />
            </div>

            <div>
              <label className="block text-lg font-medium" htmlFor="github-url">GitHub URL</label>
              <input
                type="url"
                id="github-url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="mt-2 p-2 border rounded-lg w-full text-black"
                pattern="https://github.com/.*"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium" htmlFor="linkedin-url">LinkedIn URL</label>
              <input
                type="url"
                id="linkedin-url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="mt-2 p-2 border rounded-lg w-full text-black"
                pattern="https://linkedin.com/.*"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium" htmlFor="technologies">Technologies</label>
              <input
                type="text"
                id="technologies"
                value={technologies.join(', ')}
                onChange={(e) => setTechnologies(e.target.value.split(',').map((tech) => tech.trim()))}
                placeholder="e.g. JavaScript, React, Node.js"
                className="mt-2 p-2 border rounded-lg w-full text-black"
              />
            </div>

            <div>
              <label className="block text-lg font-medium" htmlFor="skills">Skills</label>
              <input
                type="text"
                id="skills"
                value={skills.join(', ')}
                onChange={(e) => setSkills(e.target.value.split(',').map((skill) => skill.trim()))}
                placeholder="e.g. Web Development, Backend"
                className="mt-2 p-2 border rounded-lg w-full text-black"
              />
            </div>

            <div>
              <label className="block text-lg font-medium" htmlFor="projects">Projects</label>
              <input
                type="text"
                id="projects"
                value={projects.join(', ')}
                onChange={(e) => setProjects(e.target.value.split(',').map((project) => project.trim()))}
                placeholder="e.g. Project A, Project B"
                className="mt-2 p-2 border rounded-lg w-full text-black"
              />
            </div>

            <div className="mt-4">
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg">
                Save Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
