let _suppressNextBlogEntry = false;
export const suppressNextBlogEntry = () => _suppressNextBlogEntry;
export const setSuppressNextBlogEntry = (v: boolean) => { _suppressNextBlogEntry = v; };
