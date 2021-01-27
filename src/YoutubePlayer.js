import { useEffect, useRef, useCallback } from "react";
import YouTube from "react-youtube";
import { useKeyPress } from "./useKeyPressed";
import { ClipDetails } from "./ClipDetails";

export const YoutubePlayer = (props) => {
  const player = useRef(null);
  const { videoId, clip, videoHeight, videoWidth } = props;

  useKeyPress("ArrowLeft", () =>
    player.current.seekTo(Math.floor(player.current.getCurrentTime()) - 5, true)
  );
  useKeyPress("ArrowRight", () =>
    player.current.seekTo(Math.floor(player.current.getCurrentTime()) + 5, true)
  );

  const playCurrentClip = useCallback(() => {
    if (player.current) {
      if (clip) {
        console.log(`playing clip ${clip.level}`);
        player.current.seekTo(clip.timestamp);
        player.current.playVideo();
      } else console.warn("Nothing to play");
    }
  }, [clip]);

  useEffect(() => {
    playCurrentClip();
  }, [playCurrentClip]);

  const onReady = (event) => {
    console.log("ready");
    player.current = event.target;
  };

  return (
    <>
      <YouTube
        videoId={videoId}
        onReady={onReady}
        opts={{
          height: videoHeight,
          width: videoWidth,
          playerVars: { autoPlay: 1, modestbranding: 1 },
        }}
      />
      <ClipDetails clip={clip} />
    </>
  );
};
