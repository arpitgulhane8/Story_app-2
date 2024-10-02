import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { load } from "./redux/actions/authActions";
import { getUserlikeStories } from "./redux/actions/storyAction";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Bookmark from "./pages/Bookmark";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import NotFoundPage from "./pages/Errorpage";
import Loadingpage from "./components/Loadingpage";
import StoryDetails21 from "./components/StoryDetails";

function App() {
  const token = localStorage.getItem("token");
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.story);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(load(token));
      dispatch(getUserlikeStories(token));
    }
  }, [dispatch, token]);

  return (
    <>
      {loading && <Loadingpage />}
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {isAuthenticated ? (
              <Route path="/bookmark" element={<Bookmark />} />
            ) : (
              <Route path="/bookmark" element={<Navigate to="/" replace />} />
            )}

            <Route path="/stories/:id" element={<StoryDetails21 />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
