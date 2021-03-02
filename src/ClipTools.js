import IconButton from "@material-ui/core/IconButton";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import DeleteIcon from "@material-ui/icons/Delete";

export const ClipTools = (props) => {
  const {
    setCurrentClipNumber,
    currentClipNumber,
    currentVideo,
    setCurrentVideo,
    playerTime,
  } = props;

  const showTools =
    currentClipNumber ===
    currentVideo.clips[currentVideo.clips.length - 1].level;

  const newClip = (clip) => {
    const newVideo = {
      ...currentVideo,
      clips: [...currentVideo.clips, clip],
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

  const stamp = () => {
    const time = Math.floor(playerTime);
    navigator.clipboard.writeText(time);
    newClip({ level: currentVideo.clips.length + 1, timestamp: time });
  };

  const deleteLast = () => {
    setCurrentClipNumber(currentVideo.clips.length - 1);
    deleteClip();
  };
  return (
    <div>
      {showTools && (
        <>
          <IconButton aria-label="stamp" onClick={stamp}>
            <AccessAlarmIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={deleteLast}>
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </div>
  );
};
