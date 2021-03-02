import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import IconButton from "@material-ui/core/IconButton";

export const ClipNavigator = (props) => {
  const { currentClip, setCurrentClip, currentVideo } = props;
  const nextClip = () => {
    console.log("setting to ", currentClip + 1);
    if (currentVideo.clips.length > currentClip) {
      setCurrentClip(currentClip + 1);
    }
  };

  const previousClip = () => {
    if (currentClip > 1) setCurrentClip(currentClip - 1);
  };
  return (
    <div>
      <IconButton aria-label="previous" onClick={previousClip}>
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
          {currentVideo.clips.map((d, ix) => (
            <MenuItem
              key={`clip-${ix}`}
              value={d.level}
            >{`Level ${d.level}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton aria-label="next" onClick={nextClip}>
        <SkipNextIcon />
      </IconButton>
    </div>
  );
};
