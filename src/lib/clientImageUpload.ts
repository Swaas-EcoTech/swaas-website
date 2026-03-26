export async function compressImageFile(
  file: File,
  maxDimension = 1600,
  quality = 0.82
): Promise<File> {
  if (!file.type.startsWith("image/")) {
    return file;
  }

  const imageUrl = URL.createObjectURL(file);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = imageUrl;
    });

    const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
    const width = Math.max(1, Math.round(img.width * scale));
    const height = Math.max(1, Math.round(img.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) {
      return file;
    }

    context.drawImage(img, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/webp", quality);
    });

    if (!blob) {
      return file;
    }

    return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.webp`, {
      type: "image/webp",
      lastModified: Date.now(),
    });
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

export async function uploadImageToCloudinary(file: File, cloudName?: string) {
  if (!cloudName) {
    throw new Error("Missing Cloudinary cloud name");
  }

  const optimizedFile = await compressImageFile(file);
  const formData = new FormData();
  formData.append("file", optimizedFile);
  formData.append("upload_preset", "ml_default");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );
  const data = await response.json();

  if (!data.secure_url) {
    throw new Error(data.error?.message || "Image upload failed");
  }

  return data.secure_url as string;
}
