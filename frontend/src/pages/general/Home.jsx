import {
  FaHome,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

import { FaRegComment } from "react-icons/fa6";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import CommentSection from "./CommentSection";
import "../../styles/Home.css";

const Home = () => {
  const [foods, setFoods] = useState([]);

  const [likedVideos, setLikedVideos] = useState({});
  const [savedVideos, setSavedVideos] = useState({});
  const [selectedFood, setSelectedFood] = useState(null);

  const videoRefs = useRef([]);

  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/food", {
        withCredentials: true,
      });

      console.log(response.data);

      setFoods(response.data.fooditems);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchFoods();
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

      setLikedVideos((prev) => ({
        ...prev,
        [foodId]: !prev[foodId],
      }));

      setFoods((prevFoods) =>
        prevFoods.map((food) =>
          food._id === foodId
            ? {
                ...food,
                likeCount: food.likeCount + (likedVideos[foodId] ? -1 : 1),
              }
            : food,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (foodId) => {
    try {
      await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId },
        { withCredentials: true },
      );

      setSavedVideos((prev) => ({
        ...prev,
        [foodId]: !prev[foodId],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="reels-container">
        {foods.map((food, index) => (
          <section className="reel" key={food._id}>
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={food.video}
              muted
              loop
              playsInline
              preload="metadata"
            />

            <div className="overlay">
              <h3>{food.name}</h3>

              <p className="description">{food.description}</p>

              <Link
                className="visit-btn"
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

              <button onClick={() => handleSave(food._id)}>
                {savedVideos[food._id] ? (
                  <FaBookmark className="saved-icon" />
                ) : (
                  <FaRegBookmark />
                )}
              </button>

              <button onClick={() => setSelectedFood(food._id)}>
                <FaRegComment />
                <span>{food.commentCount}</span>
              </button>
            </div>
          </section>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <Link to="/">
          <FaHome />
          <span>Home</span>
        </Link>

        <Link to="/save">
          <FaBookmark />
          <span>Saved</span>
        </Link>
      </nav>

      {selectedFood && (
        <CommentSection
          foodId={selectedFood}
          closeComments={() => setSelectedFood(null)}
          refreshFoods={fetchFoods}
        />
      )}
    </>
  );
};

export default Home;

/*
import {
  FaHome,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

import { FaRegComment } from "react-icons/fa6";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import CommentSection from "./CommentSection";
import "../../styles/Home.css";

const Home = () => {
  const [foods, setFoods] = useState([]);

  const [likedVideos, setLikedVideos] = useState({});
  const [savedVideos, setSavedVideos] = useState({});
  const [selectedFood, setSelectedFood] = useState(null);

  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/food", {
          withCredentials: true,
        });

        console.log(response.data);

        setFoods(response.data.fooditems);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchFoods();
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

      setLikedVideos((prev) => ({
        ...prev,
        [foodId]: !prev[foodId],
      }));

      setFoods((prevFoods) =>
        prevFoods.map((food) =>
          food._id === foodId
            ? {
                ...food,
                likeCount: food.likeCount + (likedVideos[foodId] ? -1 : 1),
              }
            : food,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (foodId) => {
    try {
      await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId },
        { withCredentials: true },
      );

      setSavedVideos((prev) => ({
        ...prev,
        [foodId]: !prev[foodId],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="reels-container">
        {foods.map((food, index) => (
          <section className="reel" key={food._id}>
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={food.video}
              muted
              loop
              playsInline
              preload="metadata"
            />

            <div className="overlay">
              <h3>{food.name}</h3>

              <p className="description">{food.description}</p>

              <Link
                className="visit-btn"
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

              <button onClick={() => handleSave(food._id)}>
                {savedVideos[food._id] ? (
                  <FaBookmark className="saved-icon" />
                ) : (
                  <FaRegBookmark />
                )}
              </button>

              <button onClick={() => setSelectedFood(food._id)}>
                <FaRegComment />
              </button>
            </div>
          </section>
        ))}
      </div>

      



      <nav className="bottom-nav">
        <Link to="/">
          <FaHome />
          <span>Home</span>
        </Link>

        <Link to="/save">
          <FaBookmark />
          <span>Saved</span>
        </Link>
      </nav>

      {selectedFood && (
        <CommentSection
          foodId={selectedFood}
          closeComments={() => setSelectedFood(null)}
        />
      )}
    </>
  );
};

export default Home;

*/
