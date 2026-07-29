import { FaHeart, FaRegHeart, FaBookmark, FaRegComment } from "react-icons/fa";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../../styles/Saved.css";

const Saved = () => {
  const [foods, setFoods] = useState([]);
  const [likedVideos, setLikedVideos] = useState({});
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchSavedFoods = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/food/saved",
          {
            withCredentials: true,
          },
        );

        setFoods(response.data.foods);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchSavedFoods();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.7,
      },
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [foods]);

  const handleLike = async (foodId) => {
    try {
      await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId },
        { withCredentials: true },
      );

      const wasLiked = likedVideos[foodId];

      setLikedVideos((prev) => ({
        ...prev,
        [foodId]: !wasLiked,
      }));

      setFoods((prevFoods) =>
        prevFoods.map((food) =>
          food._id === foodId
            ? {
                ...food,
                likeCount: food.likeCount + (wasLiked ? -1 : 1),
              }
            : food,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (foodId) => {
    try {
      await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId },
        { withCredentials: true },
      );

      setFoods((prev) => prev.filter((food) => food._id !== foodId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="saved-container">
      <div className="saved-header">
        <Link to="/" className="back-btn">
          ←
        </Link>

        <h2 className="saved-title">Saved Videos</h2>
      </div>

      {foods.length === 0 ? (
        <div className="empty-saved">
          <h2>No Saved Videos</h2>
          <p>Save your favourite food videos to see them here.</p>
        </div>
      ) : (
        foods.map((food, index) => (
          <section className="saved-reel" key={food._id}>
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={food.video}
              muted
              loop
              playsInline
            />

            <div className="saved-overlay">
              <h3>{food.name}</h3>

              <p>{food.description}</p>

              <Link
                className="saved-visit-btn"
                to={"/food-partner/" + food.foodPartner}
              >
                Visit Store
              </Link>
            </div>

            <div className="actions">
              <button onClick={() => handleLike(food._id)}>
                {likedVideos[food._id] ? (
                  <FaHeart className="liked-icon" />
                ) : (
                  <FaRegHeart />
                )}

                <span>{food.likeCount}</span>
              </button>

              <button onClick={() => handleRemove(food._id)}>
                <FaBookmark className="saved-icon" />
              </button>

              <button>
                <FaRegComment />
              </button>
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default Saved;
