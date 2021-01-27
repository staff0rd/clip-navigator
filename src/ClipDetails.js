import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export const ClipDetails = (props) => {
  const { clip } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <Typography variant="h6">Special</Typography>
        <Typography variant="body1">
          {clip && clip.special ? clip.special : "-"}
        </Typography>
      </div>
      <div className={classes.item}>
        <Typography variant="h6">Score</Typography>
        <Typography variant="body1">
          {clip && clip.score ? clip.score.toLocaleString() : ""}/
          {clip && clip.totalscore ? clip.totalscore.toLocaleString() : ""}
        </Typography>
      </div>
      <div className={classes.item}>
        <Typography variant="h6">Comments</Typography>
        <Typography variant="body1">
          {clip && clip.comments ? clip.comments : "-"}
        </Typography>
      </div>
    </div>
  );
};
