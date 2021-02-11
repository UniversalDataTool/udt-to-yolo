import test from "ava"
import exampleUDTFile from "./example.udt"
import { Region } from "../src/types"
import getImpliedVideoRegions from "../src/get-implied-video-regions"

test("getImpliedVideoRegions should be return the frame regions if t=frame_ms", async (t) => {
  const endFrame = getImpliedVideoRegions(
    exampleUDTFile.samples[0].annotation.keyframes as Record<
      string,
      { regions: Array<Region> }
    >,
    2677
  )

  t.is(
    endFrame[0],
    (exampleUDTFile as any).samples[0].annotation.keyframes[2677].regions[0]
  )
})

test.skip("getImpliedVideoRegions should be return an interpolated frame regions if t=middle", async (t) => {
  // TODO create a regions representation that is simply interpolated, NOT using the example
})
