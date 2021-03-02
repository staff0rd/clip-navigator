import IconButton from "@material-ui/core/IconButton";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import DeleteIcon from "@material-ui/icons/Delete";

export const ClipTools = (props) => {
  const { setCurrentClip, currentVideo, setCurrentVideo } = props;

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
    <div>
      <IconButton aria-label="stamp" onClick={stamp}>
        <AccessAlarmIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={deleteLast}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
