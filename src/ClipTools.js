import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import MenuIcon from "@material-ui/icons/Menu";
import copy from "copy-to-clipboard";
import Snackbar from "@material-ui/core/Snackbar";
import { useKeyPress } from "./useKeyPressed";

export const ClipTools = (props) => {
  const {
    setCurrentClipNumber,
    currentVideo,
    playerTime,
    videos,
    setVideos,
  } = props;

  useKeyPress("n", () => {
    newClip();
  });
  useKeyPress("d", () => {
    deleteLastClip();
  });
  useKeyPress("x", () => {
    exportJson();
  });

  const newClip = () => {
    const time = Math.floor(playerTime);
    const clip = { level: currentVideo.clips.length + 1, timestamp: time };
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

  const deleteLastClip = () => {
    setCurrentClipNumber(currentVideo.clips.length - 1);
    const newVideo = {
      ...currentVideo,
      clips: [...currentVideo.clips.slice(0, currentVideo.clips.length - 1)],
    };
    setVideos([...videos.map((v) => (v === currentVideo ? newVideo : v))]);
  };

  const [showSnackbar, setShowSnackbar] = useState(false);

  const exportJson = () => {
    setShowSnackbar(true);
    copy("");
    const payload = JSON.stringify(videos);
    copy(payload);
    videos.forEach((v) => {
      console.log(v.name, v.clips.length);
    });
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            newClip();
          }}
        >
          <ListItemIcon>
            <AccessAlarmIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">
            <u>N</u>ew clip
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            deleteLastClip();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">
            <u>D</u>elete last clip
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleClose() && exportJson()}>
          <ListItemIcon>
            <SaveAltIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">
            E<u>x</u>port data
          </Typography>
        </MenuItem>
      </Menu>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={showSnackbar}
        autoHideDuration={1000}
        onClose={() => setShowSnackbar(false)}
        message="JSON copied to clipboard"
      />
    </>
  );
};
