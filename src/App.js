import { useState } from "react";
import { YoutubePlayer } from "./YoutubePlayer";
import { VzaarPlayer } from "./VzaarPlayer";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
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
import { VideoWrapper } from "./VideoWrapper";

const dataSorted = data.sort(function (a, b) {
  return a.name.localeCompare(b.name);
});

const useStyles = makeStyles((theme) => ({
  selectors: {
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  topTools: {
    marginTop: theme.spacing(1),
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
      <Grid container justify="space-between">
        <Grid item xs={12} sm={5} className={classes.topTools}>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.selectVideo}
          >
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
        </Grid>
        {currentVideo && (
          <>
            <Grid item className={classes.topTools}>
              <ClipNavigator
                currentClipNumber={playerInferredClipNumber}
                setCurrentClipNumber={setCurrentClipNumber}
                clips={currentVideo.clips}
              />
            </Grid>
            <Grid item className={classes.topTools}>
              <ClipTools
                setCurrentClipNumber={setCurrentClipNumber}
                currentClipNumber={playerInferredClipNumber}
                currentVideo={currentVideo}
                playerTime={playerTime}
                setVideos={setVideos}
                videos={videos}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          {currentVideo ? (
            <>
              {currentVideo.type === "YouTube" && (
                <YoutubePlayer
                  videoId={videoId}
                  start={clip?.timestamp || 0}
                  setPlayerTime={setPlayerTime}
                />
              )}
              {currentVideo.type === "Vzaar" && (
                <VzaarPlayer
                  videoId={videoId}
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
            <VideoWrapper>
              <Skeleton variant="rect" width={1} height={1} />
            </VideoWrapper>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
