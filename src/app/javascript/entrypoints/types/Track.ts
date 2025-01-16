import AudioFile from "./AudioFile";

export type Track = {
  id: number;
  position: number;
  maxLength: number;
  start: number;
  end: number;
  title: string;
  file: AudioFile;
  resource_id?: number;
};