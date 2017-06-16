const MjpegProxy = require('mjpeg-proxy').MjpegProxy;
const express = require('express');
const cors = require('cors')
const _ = require('lodash')
const app = express()
app.use(cors())
const cams = [];

_.each(process.env, (v, k) => {
  if (k.substr(0, 4) === "CAM_") {
    app.get(`/${k}.jpg`, new MjpegProxy(v).proxyRequest);
    console.info(`/${k}.jpg --> ${v}`)
    cams.push(`/${k}.jpg`)
  }
})
app.get('/', (req, res) =>
  res.json(cams)
)
app.listen(3000);
