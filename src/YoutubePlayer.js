import { useEffect, useRef, useState, useCallback } from "react";
import YouTube from "react-youtube";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

export const YoutubePlayer = (props) => {
  const player = useRef(null);
  const { video } = props;
  const [currentClip, setCurrentClip] = useState(1);
  const [currentTime, setCurrentTime] = useState(null);
  const clip = video.clips.find((d) => d.level === currentClip);

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

  const echo = () => {
    setCurrentTime(Math.floor(player.current.getCurrentTime()));
  };

  return (
    <>
      <YouTube
        videoId={video.videoId}
        onReady={onReady}
        opts={{ playerVars: { autoPlay: 1 } }}
      />
      <Typography variant="h4">{video.name}</Typography>
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
          {video.clips.map((d) => (
            <MenuItem value={d.level}>{`Level ${d.level}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton aria-label="next" onClick={next}>
        <SkipNextIcon />
      </IconButton>
      <IconButton aria-label="next" onClick={echo}>
        <AccessAlarmIcon />
      </IconButton>
      <span>{currentTime}</span>
      <Typography variant="h6">Special</Typography>
      <Typography variant="body1">
        {clip.special ? clip.special : "-"}
      </Typography>
      <Typography variant="h6">Score</Typography>
      <Typography variant="body1">
        {clip.score.toLocaleString()}/{clip.totalscore.toLocaleString()}
      </Typography>
      <Typography variant="h6">Comments</Typography>
      <Typography variant="body1">
        {clip.comments ? clip.comments : "-"}
      </Typography>
    </>
  );
};
