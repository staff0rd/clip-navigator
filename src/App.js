import { useState } from "react";
import { YoutubePlayer } from "./YoutubePlayer";
import { VzaarPlayer } from "./VzaarPlayer";
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

const videoWidth = 640;
const videoHeight = 360;

const dataSorted = data.sort(function (a, b) {
  return a.name.localeCompare(b.name);
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    width: videoWidth,
  },
  selectors: {
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  selectVideo: {
    minWidth: 200,
    maxWidth: 290,
  },
}));

function App() {
  const classes = useStyles();
  const [videos, setVideos] = useState(dataSorted);
  const [videoId, setVideoId] = useState("");
  const [playerTime, setPlayerTime] = useState(null);
  const currentVideo = videos.find((v) => v.videoId === videoId);
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
              setCurrentClipNumber(playerInferredClipNumber);
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
              setCurrentClipNumber={setCurrentClipNumber}
              currentClipNumber={playerInferredClipNumber}
              currentVideo={currentVideo}
              playerTime={playerTime}
              setVideos={setVideos}
              videos={videos}
            />
            <ClipNavigator
              currentClipNumber={playerInferredClipNumber}
              setCurrentClipNumber={setCurrentClipNumber}
              clips={currentVideo.clips}
            />
          </>
        )}
      </div>
      {currentVideo ? (
        <>
          {currentVideo.type === "YouTube" && (
            <YoutubePlayer
              videoId={videoId}
              videoWidth={videoWidth}
              videoHeight={videoHeight}
              start={clip?.timestamp || 0}
              setPlayerTime={setPlayerTime}
            />
          )}
          {currentVideo.type === "Vzaar" && (
            <VzaarPlayer
              videoId={videoId}
              videoWidth={videoWidth}
              videoHeight={videoHeight}
              start={clip?.timestamp || 0}
              setPlayerTime={setPlayerTime}
            />
          )}
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
