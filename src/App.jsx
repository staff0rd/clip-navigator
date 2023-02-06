import { useEffect, useState } from "react";
import { YoutubePlayer } from "./YoutubePlayer";
import { VzaarPlayer } from "./VzaarPlayer";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "tss-react/mui";
import Skeleton from "@mui/material/Skeleton";
import { ClipNavigator } from "./ClipNavigator";
import { ClipTools } from "./ClipTools";
import { ClipDetails } from "./ClipDetails";
import { getClipNumberFromPlayerTime } from "./getClipNumberFromPlayerTime";
import { VideoWrapper } from "./VideoWrapper";

const useStyles = makeStyles()((theme) => ({
  topTools: {
    marginTop: theme.spacing(1),
  },
}));

function App() {
  const { classes } = useStyles();
  useEffect(() => {
    const getData = async () => {
      const data = await fetch("/static/bubble-bobble.json");
      const json = await data.json();
      const dataSorted = json.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      setVideos(dataSorted);
    };
    getData();
  }, []);
  const [videos, setVideos] = useState([]);
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
      <Grid container sx={{ justifyContent: "space-between" }}>
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
              {videos.map((v, ix) => (
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
            <Grid
              item
              className={classes.topTools}
              sx={{ display: "flex", alignItems: "center" }}
            >
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
