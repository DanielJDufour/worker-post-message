# worker-post-message
Post a Message to a Web Worker while Automatically Detecting Transferable Objects

# install
```bash
npm install worker-post-message
```

# usage
```
const postMessage = require("worker-post-message");

const worker = new Worker(url);

postMessage({
  debug: true,
  message: {
    text: "some random text here",
    data: new ArrayBuffer(100)
  },
  worker
});
```