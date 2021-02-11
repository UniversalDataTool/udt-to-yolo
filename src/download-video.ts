import tmp from "tmp"

export const downloadVideo = async (videoUrl: string) => {
  // TODO NOTE: you can cache the video here for development, use an
  // enviornment variable to indicate if the video should be cached
  // e.g. if (process.env.CACHE_VIDEOS) { ... }

  // TODO download the video to temp
  return {
    videoPath: "path/to/video",
    deleteVideo: async () => {
      // TODO delete downloaded video (unless cached)
    },
  }
}

export default downloadVideo
