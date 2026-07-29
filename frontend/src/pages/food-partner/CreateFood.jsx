import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Create-food.css";

const CreateFood = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
  });

  const [video, setVideo] = useState(null);
  const [videoName, setVideoName] = useState("");

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setVideo(file);
      setVideoName(file.name);
    }
  };

  const handleChange = (e) => {
    setFoodData({
      ...foodData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");

    try {
      const formData = new FormData();

      formData.append("name", foodData.name);
      formData.append("description", foodData.description);
      formData.append("video", video);

      const response = await axios.post(
        "http://localhost:3000/api/food",
        formData,
        {
          withCredentials: true,
        },
      );

      setSuccessMessage(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 2000);

      //alert(response.data.message);

      setFoodData({
        name: "",
        description: "",
      });

      setVideo(null);
      setVideoName("");
      document.getElementById("video").value = "";
    } catch (error) {
      console.log(error.response?.data);

      alert(error.response?.data?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-food-page">
      <div className="create-food-card">
        <h2>Create Food</h2>
        <p className="subtitle">
          Upload a short food video, give it a name and add a description.
        </p>

        <form className="food-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Food Video</label>

            <label htmlFor="video" className="upload-box">
              <span className="upload-icon">📁</span>

              <h4>Tap to upload or drag & drop</h4>

              <p>MP4, WEBM, MOV • Up to 100MB</p>

              {videoName && <span className="selected-file">{videoName}</span>}
            </label>

            <input
              type="file"
              id="video"
              accept="video/*"
              onChange={handleVideoChange}
            />
          </div>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={foodData.name}
              onChange={handleChange}
              placeholder="e.g. Spicy Paneer Wrap"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="5"
              name="description"
              value={foodData.description}
              onChange={handleChange}
              placeholder="Write a short description, ingredients, taste, spice level etc."
              required
            ></textarea>
          </div>

          {successMessage && (
            <div className="success-message">✅ {successMessage}</div>
          )}

          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Uploading...
              </>
            ) : (
              "Save Food"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
