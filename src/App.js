import { useState, useEffect } from "react";
import { YoutubePlayer } from "./YoutubePlayer";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import data from "./data";

function App() {
  const [currentVideoId, setCurrentVideoId] = useState(data[0].videoId);
  const [currentVideo, setCurrentVideo] = useState(
    data.find((v) => v.videoId === currentVideoId)
  );

  useEffect(() => {
    const video = data.find((v) => v.videoId === currentVideoId);
    setCurrentVideo(video);
    window.localStorage.setItem("video", JSON.stringify(video));
  }, [currentVideoId]);

  const newClipCallback = (newClip) => {
    const newVideo = {
      ...currentVideo,
      clips: [...currentVideo.clips, newClip],
    };
    window.localStorage.setItem("video", JSON.stringify(newVideo));
    setCurrentVideo(newVideo);
  };

  const deleteClipCallback = () => {
    const newVideo = {
      ...currentVideo,
      clips: [...currentVideo.clips.slice(0, currentVideo.clips.length - 1)],
    };
    window.localStorage.setItem("video", JSON.stringify(newVideo));
    setCurrentVideo(newVideo);
  };

  return (
    <div>
      <FormControl variant="outlined">
        <InputLabel id="video-label">Video</InputLabel>
        <Select
          labelId="video-label"
          id="video-select"
          value={currentVideoId}
          onChange={(e) => {
            setCurrentVideoId(e.target.value);
          }}
          label="Video"
        >
          {data.map((v, ix) => (
            <MenuItem key={`video-${ix}`} value={v.videoId}>
              {v.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <YoutubePlayer
        video={currentVideo}
        newClip={newClipCallback}
        deleteClip={deleteClipCallback}
      />
    </div>
  );
}

export default App;
