import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/profile.css";

const Profile = () => {
  const { id } = useParams();

  const [partner, setPartner] = useState(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/food-partner/${id}`,
          {
            withCredentials: true,
          },
        );

        console.log("Profile Response:", res.data);

        setPartner(res.data.foodPartner);
      } catch (err) {
        console.log(err);
      }
    }

    fetchProfile();
  }, [id]);

  // <-- Loading check will go here

  if (!partner) {
    return (
      <div className="loading-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  /*hover play */

  const handleMouseEnter = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === index) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  };

  const handleMouseLeave = (index) => {
    const video = videoRefs.current[index];

    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-image">
              <img src="https://picsum.photos/200" alt="Restaurant" />
            </div>

            <div className="profile-details">
              <h2>{partner.ResturantName}</h2>
              <p>{partner.ResturentAddress}</p>
            </div>
          </div>

          <div className="stats">
            <div className="stat-box">
              <h3>{partner.foodItems.length}</h3>
              <span>Total Meals</span>
            </div>

            <div className="stat-box">
              <h3>15K</h3>
              <span>Customer Served</span>
            </div>
          </div>
        </div>

        {/*Video portion */}

        <div className="video-slider">
          {partner.foodItems.map((food, index) => (
            <div
              className="video-item"
              key={food._id}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={food.video}
                muted
                loop
                playsInline
                preload="metadata"
              />

              <div className="video-info">
                <h4>{food.name}</h4>
                <p>{food.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
