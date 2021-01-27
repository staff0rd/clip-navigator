import { useEffect, useRef, useState, useCallback } from "react";
import YouTube from "react-youtube";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import DeleteIcon from "@material-ui/icons/Delete";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { useKeyPress } from "./useKeyPressed";

export const YoutubePlayer = (props) => {
  const player = useRef(null);
  const { video, newClip, deleteClip } = props;
  const [currentClip, setCurrentClip] = useState(1);
  const [currentTime, setCurrentTime] = useState(null);
  const clip = video.clips.find((d) => d.level === currentClip);

  useKeyPress("ArrowLeft", () =>
    player.current.seekTo(Math.floor(player.current.getCurrentTime()) - 5, true)
  );
  useKeyPress("ArrowRight", () =>
    player.current.seekTo(Math.floor(player.current.getCurrentTime()) + 5, true)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTime(null);
    }, 2500);
    return () => clearTimeout(timer);
  }, [currentTime]);

  const playCurrentClip = useCallback(() => {
    if (player.current) {
      if (clip) {
        console.log(`playing clip ${clip.level}`);
        player.current.seekTo(clip.timestamp);
        player.current.playVideo();
      } else console.warn("Nothing to play");
    }
  }, [clip]);

  useEffect(() => {
    playCurrentClip();
  }, [playCurrentClip]);

  const onReady = (event) => {
    console.log("ready");
    player.current = event.target;
  };

  const next = () => {
    console.log("setting to ", currentClip + 1);
    if (video.clips.length > currentClip + 1) {
      setCurrentClip(currentClip + 1);
    }
  };

  const previous = () => {
    if (currentClip > 1) setCurrentClip(currentClip - 1);
  };

  const stamp = () => {
    const time = Math.floor(player.current.getCurrentTime());
    navigator.clipboard.writeText(time);
    setCurrentTime(time);
    newClip({ level: video.clips.length + 1, timestamp: time });
  };

  const deleteLast = () => {
    setCurrentClip(video.clips.length - 1);
    deleteClip();
  };

  console.log("player: " + video.videoId);

  return (
    <>
      <YouTube
        videoId={video.videoId}
        onReady={onReady}
        opts={{ playerVars: { autoPlay: 1, modestbranding: 1 } }}
      />
      <IconButton aria-label="previous" onClick={previous}>
        <SkipPreviousIcon />
      </IconButton>
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Level</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={currentClip}
          onChange={(e) => {
            setCurrentClip(e.target.value);
          }}
          label="Level"
        >
          {video.clips.map((d, ix) => (
            <MenuItem
              key={`clip-${ix}`}
              value={d.level}
            >{`Level ${d.level}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton aria-label="next" onClick={next}>
        <SkipNextIcon />
      </IconButton>
      <IconButton aria-label="stamp" onClick={stamp}>
        <AccessAlarmIcon />
      </IconButton>
      <span>{currentTime}</span>
      <IconButton aria-label="delete" onClick={deleteLast}>
        <DeleteIcon />
      </IconButton>
      <Typography variant="h6">Special</Typography>
      <Typography variant="body1">
        {clip.special ? clip.special : "-"}
      </Typography>
      <Typography variant="h6">Score</Typography>
      <Typography variant="body1">
        {clip.score ? clip.score.toLocaleString() : ""}/
        {clip.totalscore ? clip.totalscore.toLocaleString() : ""}
      </Typography>
      <Typography variant="h6">Comments</Typography>
      <Typography variant="body1">
        {clip.comments ? clip.comments : "-"}
      </Typography>
    </>
  );
};
