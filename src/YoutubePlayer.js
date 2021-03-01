import { useRef } from "react";
import YouTube from "react-youtube";
import { useKeyPress } from "./useKeyPressed";
import { ClipDetails } from "./ClipDetails";

export const YoutubePlayer = (props) => {
  const player = useRef(null);
  const { videoId, clip, videoHeight, videoWidth, start } = props;

  useKeyPress("ArrowLeft", () =>
    player.current.seekTo(Math.floor(player.current.getCurrentTime()) - 5, true)
  );
  useKeyPress("ArrowRight", () =>
    player.current.seekTo(Math.floor(player.current.getCurrentTime()) + 5, true)
  );

  const onReady = (event) => {
    console.warn("onReady");
    player.current = event.target;
  };

  const onStateChange = ({ target, data }) => {
    switch (data) {
      case YouTube.PlayerState.UNSTARTED: {
        break;
      }
      case YouTube.PlayerState.ENDED: {
        break;
      }
      case YouTube.PlayerState.PLAYING: {
        break;
      }
      case YouTube.PlayerState.PAUSED: {
        break;
      }
      case YouTube.PlayerState.BUFFERING: {
        break;
      }
      case YouTube.PlayerState.CUED: {
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <>
      <YouTube
        videoId={videoId}
        onReady={onReady}
        onStateChange={onStateChange}
        opts={{
          height: videoHeight,
          width: videoWidth,
          playerVars: { autoplay: 1, modestbranding: 1, start },
        }}
      />
      <ClipDetails clip={clip} />
    </>
  );
};
