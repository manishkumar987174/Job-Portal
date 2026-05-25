import cloudinary from "./cloudinary.js";

export const normalizeResumeUrl = (url) => {
  if (!url || typeof url !== "string") return url;
  if (
    url.includes("cloudinary.com") &&
    url.includes("/image/upload/") &&
    url.toLowerCase().endsWith(".pdf")
  ) {
    return url.replace("/image/upload/", "/raw/upload/");
  }
  return url;
};

const parseCloudinaryUrl = (url) => {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)$/);
  if (!match) return null;

  const pathWithExt = match[1];
  const lastDot = pathWithExt.lastIndexOf(".");
  const publicId = lastDot > 0 ? pathWithExt.slice(0, lastDot) : pathWithExt;
  const format = lastDot > 0 ? pathWithExt.slice(lastDot + 1) : "pdf";
  const resourceType = url.includes("/raw/upload/") ? "raw" : "image";

  return { publicId, format, resourceType };
};

export const getResumeDeliveryUrl = (storedUrl) => {
  if (!storedUrl || typeof storedUrl !== "string") return storedUrl;
  if (!storedUrl.includes("cloudinary.com")) return storedUrl;

  const parsed = parseCloudinaryUrl(storedUrl);
  if (!parsed) return normalizeResumeUrl(storedUrl);

  // For raw resources (PDFs) uploaded as public/raw, return the normalized public URL
  if (parsed.resourceType === "raw") {
    return normalizeResumeUrl(storedUrl);
  }

  const expiresAt = Math.floor(Date.now() / 1000) + 3600;

  return cloudinary.utils.private_download_url(parsed.publicId, parsed.format, {
    resource_type: parsed.resourceType,
    type: "upload",
    expires_at: expiresAt,
    attachment: false,
  });
};

export const uploadResumeToCloudinary = async (cloudinaryClient, fileUri) => {
  return cloudinaryClient.uploader.upload(fileUri.content, {
    resource_type: "raw",
    folder: "resumes",
    access_mode: "public",
  });
};
