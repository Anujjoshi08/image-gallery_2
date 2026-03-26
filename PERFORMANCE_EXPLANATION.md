# Performance Improvement Explanation

This gallery improves speed using three cache layers.

First, IndexedDB stores image metadata after the first API fetch. On the next visit, the app reads from IndexedDB before making a network call, so the gallery appears much faster and sends fewer requests.

Second, imageCache.js keeps decoded thumbnail URLs in memory. When the user scrolls down and back up, thumbnails are reused from memory instead of being decoded again, which makes scrolling smoother.

Third, previewImageCache.js stores preview URLs used by the modal. Reopening the same image preview becomes instant because the source is already cached.

Overall result: first load still depends on network, but repeat visits and repeated interactions are noticeably faster. This design reduces API usage, lowers latency, and improves user experience while keeping metadata persistent in IndexedDB and frequently reused images in RAM.
