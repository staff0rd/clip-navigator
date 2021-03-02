import { useState, useEffect } from "react";
import { YoutubePlayer } from "./YoutubePlayer";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import data from "./bubble-bobble";
import Skeleton from "@material-ui/lab/Skeleton";
import { ClipNavigator } from "./ClipNavigator";
import { ClipTools } from "./ClipTools";
import { ClipDetails } from "./ClipDetails";
import { getClipNumberFromPlayerTime } from "./getClipNumberFromPlayerTime";

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
  const [playerTime, setPlayerTime] = useState(null);
  const [currentVideo, setCurrentVideoState] = useState(
    data.find((v) => v.videoId === videoId)
  );
  const setCurrentVideo = (video) => {
    setCurrentVideoState(video);
    setCurrentClipNumber(playerInferredClipNumber);
    setPlayerTime(null);
  };
  const [currentClipNumber, setCurrentClipNumberState] = useState(1);
  const setCurrentClipNumber = (clipNumber) => {
    setCurrentClipNumberState(clipNumber);
    setPlayerTime(null);
  };
  const clip = currentVideo
    ? currentVideo.clips.find((d) => d.level === currentClipNumber)
    : "";

  const playerInferredClipNumber = currentVideo
    ? getClipNumberFromPlayerTime(currentVideo.clips, playerTime) ||
      currentClipNumber
    : currentClipNumber;

  useEffect(() => {
    const video = data.find((v) => v.videoId === videoId);
    setCurrentVideo(video);
    window.localStorage.setItem("video", JSON.stringify(video));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

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
        {currentVideo && (
          <>
            <ClipTools
              setCurrentClip={setCurrentClipNumber}
              currentVideo={currentVideo}
              setCurrentVideo={setCurrentVideo}
              playerTime={playerTime}
            />
            <ClipNavigator
              currentClipNumber={playerInferredClipNumber}
              setCurrentClipNumber={setCurrentClipNumber}
              currentVideo={currentVideo}
            />
          </>
        )}
      </div>
      {currentVideo ? (
        <>
          <YoutubePlayer
            videoId={videoId}
            clip={clip}
            videoWidth={videoWidth}
            videoHeight={videoHeight}
            start={clip?.timestamp || 0}
            setPlayerTime={setPlayerTime}
          />
          <ClipDetails
            clip={clip}
            playerTime={Math.round(
              playerTime - currentVideo.clips[0].timestamp
            )}
          />
        </>
      ) : (
        <Skeleton variant="rect" width={videoWidth} height={videoHeight} />
      )}
    </div>
  );
}

export default App;
