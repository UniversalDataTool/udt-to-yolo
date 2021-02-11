import test from "ava"
import exampleUDTFile from "./example.udt"
import {Region} from "../src/types"
import getImpliedVideoRegions from "../src/get-implied-video-regions";

test("getImpliedVideoRegions test", async (t) => {

  const result = await getImpliedVideoRegions(
      exampleUDTFile.samples[0].annotation.keyframes as Record<string, { regions: Array<Region> }>,
      1
  )

  t.like(result[0], {
    regionType: 'bounding-box',
    id: '9874843197152985',
    classification: 'some_classification',
    centerX: 0.2819778277208604,
    centerY: 0.5673007986583865,
    width: 0.2404788003862084,
    height: 0.4353498136433524,
    color: '#ff0000',
    highlighted: false,
    editingLabels: false
  })
})
