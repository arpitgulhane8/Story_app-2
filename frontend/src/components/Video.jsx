import React from "react";

const VideoPlayer = ({ videoUrl }) => {
  const isEmbeddedVideo = (url) => {
    return (
      url.includes("youtube.com/embed") ||
      url.includes("youtu.be") ||
      url.includes("vimeo.com") ||
      url.includes("dailymotion.com") ||
      url.includes("facebook.com") ||
      url.includes("tiktok.com")
    );
  };

  const isDirectVideo = (url) => {
    return (
      url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg")
    );
  };

  const getEmbedUrl = (url) => {
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("vimeo.com/")) {
      const videoId = url.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    if (url.includes("dailymotion.com/video/")) {
      const videoId = url.split("/video/").pop();
      return `https://www.dailymotion.com/embed/video/${videoId}`;
    }
    if (url.includes("facebook.com/") && url.includes("videos/")) {
      const videoId = url.split("videos/").pop();
      return `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/video.php?v=${videoId}`;
    }
    if (url.includes("tiktok.com")) {
      const videoId = url.split("/").pop();
      return `https://www.tiktok.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <div className="video-player">
      {isEmbeddedVideo(videoUrl) ? (
        <iframe
          width="100%"
          height="315"
          src={getEmbedUrl(videoUrl)}
          title="Embedded Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : isDirectVideo(videoUrl) ? (
        <video
          src={videoUrl}
          autoPlay
          style={{ width: "100%" }}
          aria-label="Direct Video"
        />
      ) : (
        <p>Unsupported video URL</p>
      )}
    </div>
  );
};

export default VideoPlayer;
