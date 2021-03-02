import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import IconButton from "@material-ui/core/IconButton";

export const ClipNavigator = (props) => {
  const { currentClipNumber, setCurrentClipNumber, currentVideo } = props;
  const nextClip = () => {
    console.log("setting to ", currentClipNumber + 1);
    if (currentVideo.clips.length > currentClipNumber) {
      setCurrentClipNumber(currentClipNumber);
      setCurrentClipNumber(currentClipNumber + 1);
    }
  };

  const previousClip = () => {
    if (currentClipNumber > 1) setCurrentClipNumber(currentClipNumber - 1);
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
          value={currentClipNumber}
          onChange={(e) => {
            setCurrentClipNumber(e.target.value);
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
