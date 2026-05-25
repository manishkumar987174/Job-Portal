import { USER_API_END_POINT } from "./constant";

export const getResumeViewUrl = (url) => {
  if (!url) return null;
  return `${USER_API_END_POINT}/resume?url=${encodeURIComponent(url)}`;
};
