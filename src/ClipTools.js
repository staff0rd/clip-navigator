import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import copy from "copy-to-clipboard";
import Snackbar from "@material-ui/core/Snackbar";
import { useKeyPress } from "./useKeyPressed";

export const ClipTools = (props) => {
  const {
    setCurrentClipNumber,
    currentClipNumber,
    currentVideo,
    playerTime,
    videos,
    setVideos,
  } = props;

  useKeyPress("z", () => {
    stamp();
  });
  useKeyPress("x", () => {
    deleteLast();
  });

  const showTools =
    currentClipNumber ===
    currentVideo.clips[currentVideo.clips.length - 1].level;

  const newClip = (clip) => {
    const clips = [...currentVideo.clips, clip];
    const newVideo = {
      ...currentVideo,
      clips,
    };

    setVideos([...videos.map((v) => (v === currentVideo ? newVideo : v))]);
    videos.forEach((v) => {
      console.log(v.name, v.clips.length);
    });
  };

  const deleteClip = () => {
    const newVideo = {
      ...currentVideo,
      clips: [...currentVideo.clips.slice(0, currentVideo.clips.length - 1)],
    };
    setVideos([...videos.map((v) => (v === currentVideo ? newVideo : v))]);
  };

  const stamp = () => {
    const time = Math.floor(playerTime);
    newClip({ level: currentVideo.clips.length + 1, timestamp: time });
  };

  const deleteLast = () => {
    setCurrentClipNumber(currentVideo.clips.length - 1);
    deleteClip();
  };

  const [open, setOpen] = useState(false);
  const exportJson = () => {
    setOpen(true);
    copy("");
    const payload = JSON.stringify(videos);
    copy(payload);
    videos.forEach((v) => {
      console.log(v.name, v.clips.length);
    });
  };
  return (
    <div>
      {showTools && (
        <>
          <IconButton
            aria-label="stamp"
            onClick={stamp}
            title="New clip here (z)"
          >
            <AccessAlarmIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={deleteLast}
            title="Delete (x)"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="export" onClick={exportJson}>
            <SaveAltIcon />
          </IconButton>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={open}
            autoHideDuration={1000}
            onClose={() => setOpen(false)}
            message="JSON copied to clipboard"
          />
        </>
      )}
    </div>
  );
};
