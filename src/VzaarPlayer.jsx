import { useState, useEffect, useRef } from "react";
import { useKeyPress } from "./useKeyPressed";
import "./vzPlayer";

export const VzaarPlayer = ({
  videoHeight,
  videoWidth,
  start,
  setPlayerTime,
  videoId,
}) => {
  // eslint-disable-next-line no-undef
  const player = useRef(null);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    if (start !== startTime) {
      setStartTime(start);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  useEffect(() => {
    if (startTime && player.current && player.current) {
      player.current.seekTo(start);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, player.current]);

  useEffect(() => {
    player.current = null;
    // eslint-disable-next-line no-undef
    const vzp = new vzPlayer(`vzvd-${videoId}`);
    vzp.ready(function () {
      vzp.seekTo(start);
      player.current = vzp;
    });
    return () => {
      vzp.removeEventListener("ready");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (player.current) {
        player.current.getTime(function (time) {
          setPlayerTime(time);
        });
      }
    }, 100);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useKeyPress("ArrowLeft", () =>
    player.current.getTime((time) => {
      player.current.seekTo(Math.floor(time - 5));
    })
  );
  useKeyPress("ArrowRight", () =>
    player.current.getTime((time) => {
      player.current.seekTo(Math.floor(time + 5));
    })
  );

  return (
    <iframe
      width={videoWidth}
      height={videoHeight}
      src={`//view.vzaar.com/${videoId}/player?autoplay=true`}
      frameborder="0"
      allowfullscreen="true"
      allowtransparency="true"
      allow="autoplay"
      id={`vzvd-${videoId}`}
      name={`vzvd-${videoId}`}
      title="video"
    ></iframe>
  );
};
