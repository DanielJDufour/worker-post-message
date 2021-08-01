const isTransferable = data => {
  try {
    if (data instanceof ArrayBuffer) {
      return true;
    }
  } catch (error) {
    // pass
  }
  
  try {
    if (typeof Buffer !== "undefined" && Buffer.isBuffer(data)) {
      return true;
    }
  } catch (error) {
    // pass
  }
};

const getTransferables = (inpt, { debug = false } = { debug: false }) => {
  const results = [];
  if (isTransferable(inpt)) results.push(inpt);
  else if (Array.isArray(inpt)) results.push(...inpt.map(it => getTransferables(it, { debug })).flat());
  else if (typeof inpt === "object") results.push(...Object.values(inpt).map(it => getTransferables(it, { debug })).flat());
  return results;
}

function workerPostMessage({ debug, message, worker }) {
    const transferables = getTransferables({ debug, inpt: message });
    if (debug) console.log("transferables:", transferables);
    worker.postMessage(message, transferables);
}
if (typeof window !== "undefined") window.workerPostMessage = workerPostMessage;
if (typeof module === "object") module.exports = workerPostMessage;
if (typeof self !== "undefined") self.workerPostMessage = workerPostMessage;