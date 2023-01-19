import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import IconButton from "@mui/material/IconButton";

export const ClipNavigator = (props) => {
  const { currentClipNumber, setCurrentClipNumber, clips } = props;
  const nextClip = () => {
    console.log("setting to ", currentClipNumber + 1);
    if (clips.length > currentClipNumber) {
      setCurrentClipNumber(currentClipNumber);
      setCurrentClipNumber(currentClipNumber + 1);
    }
  };

  const previousClip = () => {
    if (currentClipNumber > 1) setCurrentClipNumber(currentClipNumber - 1);
  };
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
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
          {clips.map((d, ix) => (
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
