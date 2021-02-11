export default {
  interface: {
    type: "video_segmentation",
    labels: ["some_classification"],
  },
  samples: [
    {
      _id: "strrd0xkr",
      videoUrl:
        "https://s3.amazonaws.com/asset.workaround.online/SampleVideo_1280x720_1mb.mp4",
      annotation: {
        keyframes: {
          "0": {
            regions: [
              {
                regionType: "bounding-box",
                id: "9874843197152985",
                classification: "some_classification",
                centerX: 0.2819672131147541,
                centerY: 0.5673345476624165,
                width: 0.24043715846994537,
                height: 0.4352155434122647,
                color: "#ff0000",
              },
            ],
          },
          "2677": {
            regions: [
              {
                regionType: "bounding-box",
                id: "9874843197152985",
                classification: "some_classification",
                centerX: 0.3103825136612022,
                centerY: 0.47698846387370974,
                width: 0.3519125683060109,
                height: 0.7946569520340012,
                color: "#ff0000",
              },
            ],
          },
        },
      },
    },
  ],
}
