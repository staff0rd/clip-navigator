import { useState, useEffect } from "react";
import { YoutubePlayer } from "./YoutubePlayer";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import data from "./data";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import IconButton from "@material-ui/core/IconButton";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import DeleteIcon from "@material-ui/icons/Delete";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  selectors: {
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  selectVideo: {
    minWidth: 200,
  },
}));

function App() {
  const classes = useStyles();
  const videoWidth = 640;
  const videoHeight = 360;
  const [videoId, setVideoId] = useState("");
  const [currentVideo, setCurrentVideo] = useState(
    data.find((v) => v.videoId === videoId)
  );
  const [currentClip, setCurrentClip] = useState(1);
  const clip = currentVideo
    ? currentVideo.clips.find((d) => d.level === currentClip)
    : "";

  useEffect(() => {
    const video = data.find((v) => v.videoId === videoId);
    setCurrentVideo(video);
    window.localStorage.setItem("video", JSON.stringify(video));
  }, [videoId]);

  const newClip = (newClip) => {
    const newVideo = {
      ...currentVideo,
      clips: [...currentVideo.clips, newClip],
    };
    window.localStorage.setItem("video", JSON.stringify(newVideo));
    setCurrentVideo(newVideo);
  };

  const deleteClip = () => {
    const newVideo = {
      ...currentVideo,
      clips: [...currentVideo.clips.slice(0, currentVideo.clips.length - 1)],
    };
    window.localStorage.setItem("video", JSON.stringify(newVideo));
    setCurrentVideo(newVideo);
  };

  const nextClip = () => {
    console.log("setting to ", currentClip + 1);
    if (currentVideo.clips.length > currentClip + 1) {
      setCurrentClip(currentClip + 1);
    }
  };

  const previousClip = () => {
    if (currentClip > 1) setCurrentClip(currentClip - 1);
  };

  const stamp = () => {
    // const time = Math.floor(player.current.getCurrentTime());
    // navigator.clipboard.writeText(time);
    // newClip({ level: currentVideo.clips.length + 1, timestamp: time });
  };

  const deleteLast = () => {
    setCurrentClip(currentVideo.clips.length - 1);
    deleteClip();
  };

  return (
    <div className={classes.root}>
      <div className={classes.selectors}>
        <FormControl variant="outlined" className={classes.selectVideo}>
          <InputLabel id="video-label">Choose video</InputLabel>
          <Select
            labelId="video-label"
            id="video-select"
            value={videoId}
            onChange={(e) => {
              setVideoId(e.target.value);
            }}
            label="Choose video"
          >
            <MenuItem value={""} disabled>
              Choose video...
            </MenuItem>
            {data.map((v, ix) => (
              <MenuItem key={`video-${ix}`} value={v.videoId}>
                {v.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={classes.cliptools}>
          <IconButton aria-label="stamp" onClick={stamp}>
            <AccessAlarmIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={deleteLast}>
            <DeleteIcon />
          </IconButton>
        </div>
        {currentVideo && (
          <div className={classes.navigate}>
            <IconButton aria-label="previous" onClick={previousClip}>
              <SkipPreviousIcon />
            </IconButton>
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Level
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={currentClip}
                onChange={(e) => {
                  setCurrentClip(e.target.value);
                }}
                label="Level"
              >
                {currentVideo.clips.map((d, ix) => (
                  <MenuItem
                    key={`clip-${ix}`}
                    value={d.level}
                  >{`Level ${d.level}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton aria-label="next" onClick={nextClip}>
              <SkipNextIcon />
            </IconButton>
          </div>
        )}
      </div>
      {currentVideo ? (
        <YoutubePlayer
          videoId={videoId}
          newClip={newClip}
          deleteClip={deleteClip}
          clip={clip}
          videoWidth={videoWidth}
          videoHeight={videoHeight}
          start={clip?.timestamp || 0}
        />
      ) : (
        <Skeleton variant="rect" width={videoWidth} height={videoHeight} />
      )}
    </div>
  );
}

export default App;
