let deferredPrompt = null;
let listeners = [];
const setDeferredPrompt = (prompt) => {
  deferredPrompt = prompt;
  listeners.forEach((cb) => cb(deferredPrompt)); // Notify all
};

const clearDeferredPrompt = () => {
  setDeferredPrompt(null);
};
const getDeferredPrompt = () => {
  return deferredPrompt;
};
const subscribeToPromptChange = (cb) => {
    listeners.push(cb);
    return () => {
      listeners = listeners.filter((fn) => fn !== cb);
    };
  };

export { setDeferredPrompt, clearDeferredPrompt, getDeferredPrompt, subscribeToPromptChange };
