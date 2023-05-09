import { useState } from 'react';

interface UseSelectFile {
  file: Blob | null;
  preview: string | null;
  onChange: (eventOrBlob: Event | Blob | null) => Promise<string | null>;
}

export const useSelectFile = (): UseSelectFile => {
  const [file, setFile] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onChange = (eventOrBlob: Event | Blob | null): Promise<string | null> => {
    return new Promise((resolve) => {
      let blob: Blob | null;

      if (eventOrBlob instanceof Event) {
        const target = eventOrBlob.target as HTMLInputElement;

        if (target.files) {
          eventOrBlob = target.files[0];
          blob = eventOrBlob;
        } else {
          blob = null;
        }
      } else {
        blob = eventOrBlob;
      }

      if (blob) {
        setFile(blob);
        setPreview(URL.createObjectURL(blob));
        resolve(preview);
      } else {
        setFile(null);
        setPreview(null);
        resolve(null);
      }
    });
  };

  return {
    file,
    preview,
    onChange
  };
};
