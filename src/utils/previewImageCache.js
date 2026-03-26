const previewCache = new Map();

export const getPreview = (id) => previewCache.get(id);

export const setPreview = (id, url) => {
  previewCache.set(id, url);
};