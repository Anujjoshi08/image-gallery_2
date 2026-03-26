const imageCache = new Map();

export const getCachedImage = (id) => {
  return imageCache.get(id);
};

export const setCachedImage = (id, src) => {
  imageCache.set(id, src);
};