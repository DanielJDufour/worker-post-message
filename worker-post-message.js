const getTransferables = ({ debug, inpt }) => {
  const results = [];
  if (inpt instanceof ArrayBuffer) results.push(inpt);
  else if (Array.isArray(inpt)) results.push(...inpt.map(getTransferables).flat());
  else if (typeof inpt === "object") results.push(...Object.values(inpt).map(getTransferables).flat());
  return results;
}

function workerPostMessage({ debug, message, worker }) {
    const transferables = getTransferables({ debug, inpt: message });
    worker.postMessage(message, transferables);
}
if (typeof window !== "undefined") window.workerPostMessage = workerPostMessage;
if (typeof module === "object") module.exports = workerPostMessage;
if (typeof self !== "undefined") self.workerPostMessage = workerPostMessage;