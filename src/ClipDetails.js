import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export const ClipDetails = (props) => {
  const { clip, playerTime } = props;
  return (
    <Grid container>
      <Grid item xs={6} sm={3}>
        <Typography variant="h6">Special</Typography>
        <Typography variant="body1">
          {clip && clip.special ? clip.special : "-"}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography variant="h6">Score</Typography>
        <Typography variant="body1">
          {clip && clip.score ? clip.score.toLocaleString() : ""}/
          {clip && clip.totalscore ? clip.totalscore.toLocaleString() : ""}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography variant="h6">Comments</Typography>
        <Typography variant="body1">
          {clip && clip.comments ? clip.comments : "-"}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography variant="h6">Time</Typography>
        <Typography variant="body1">{playerTime}</Typography>
      </Grid>
    </Grid>
  );
};
