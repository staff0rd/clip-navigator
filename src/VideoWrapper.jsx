import { makeStyles } from 'tss-react/mui';

export const videoWidth = 640;
export const videoHeight = 360;

const useStyles = makeStyles()((theme) => ({
  videoWrapper: {
    marginTop: theme.spacing(0.5),
    position: "relative",
    paddingBottom: "56.25%" /* 16:9 */,
    height: 0,
    "& iframe": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  },
}));

export const VideoWrapper = ({ children }) => {
  const { classes } = useStyles();
  return <div className={classes.videoWrapper}>{children}</div>;
};
