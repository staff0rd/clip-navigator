import { useRef, useEffect } from "react";
import YouTube from "react-youtube";
import { useKeyPress } from "./useKeyPressed";
import { VideoWrapper, videoHeight, videoWidth } from "./VideoWrapper";

export const YoutubePlayer = (props) => {
  const player = useRef(null);
  const { videoId, start, setPlayerTime } = props;

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        player.current &&
        player.current.getPlayerState() === YouTube.PlayerState.PLAYING
      ) {
        setPlayerTime(player.current.getCurrentTime());
      }
    }, 100);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useKeyPress("ArrowLeft", () =>
    player.current.seekTo(Math.floor(player.current.getCurrentTime()) - 5, true)
  );
  useKeyPress("ArrowRight", () =>
    player.current.seekTo(Math.floor(player.current.getCurrentTime()) + 5, true)
  );

  const onReady = (event) => {
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
    <VideoWrapper>
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
    </VideoWrapper>
  );
};
