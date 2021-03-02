export const getClipNumberFromPlayerTime = (clips, playerTime) => {
  const allClipsBeforePlayerTime = clips.filter(
    (c) => c.timestamp <= playerTime
  );
  if (allClipsBeforePlayerTime.length) {
    return allClipsBeforePlayerTime[allClipsBeforePlayerTime.length - 1].level;
  }
};
