// src/utils/imageOptimizer.ts
import imageCompression from "browser-image-compression";

export const compressImage = async (file: File): Promise<File> => {
  // CONFIGURACIÓN DE LA COMPRESIÓN
  const options = {
    maxSizeMB: 0.3, // 300KB como máximo (Ideal para menú web)
    maxWidthOrHeight: 1280, // Redimensionar a HD (Suficiente para celulares)
    useWebWorker: true, // Usa hilos secundarios para no trabar la app
    fileType: "image/webp", // Convertir a WebP (formato de Google súper liviano)
    initialQuality: 0.7, // Calidad inicial al 70%
  };

  try {
    console.log(`Original: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

    const compressedFile = await imageCompression(file, options);

    console.log(
      `Comprimido: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`
    );

    return compressedFile;
  } catch (error) {
    console.error("Error comprimiendo imagen:", error);
    // Si falla la compresión, devolvemos el archivo original para no romper el flujo
    return file;
  }
};
