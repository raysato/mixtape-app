import { createDropzone } from "@soorria/solid-dropzone";
import { Accessor, Component, createSignal, Setter, Signal } from "solid-js";
import TrackTableDraggable from "./TrackTableDraggable";
import AudioFile from "../types/AudioFile";

type Track = {
  id: number;
  position: number; // Base position of the track
  maxLength: number; // Maximum allowable length between start and end
  start: number; // Start offset relative to the base position
  end: number; // End offset relative to the base position
  title: string;
};

type TrackControllerComponentProps = {
    filesSignal: Signal<AudioFile[]>
};



const TrackControllerComponent: Component<TrackControllerComponentProps> = (props) => {
    const [files, setFiles] = props.filesSignal
    const onDrop = (acceptedFiles: File[]) => {
        const savedFiles = [...files()];
        acceptedFiles.forEach(file => {
            if (!file.type.includes('audio')) {
                console.log('not an audio file')
                return;
            }
            console.log('start load')
            const audio = document.createElement('audio')
            audio.setAttribute('src', URL.createObjectURL(file))
            audio.addEventListener('loadedmetadata', () => {
                const duration = audio.duration;
                savedFiles.push({
                    file, duration
                })
                console.log({duration})
                setFiles(savedFiles);
            });
        })
    }
    const dropzone = createDropzone({ onDrop })
    const {  } = props;

  return (
    <div class="flex flex-row-reverse gap-4">
        
        <div {...dropzone.getRootProps()} class="border-dashed border-2 rounded-lg w-64 h-64 text-center">
        <input {...dropzone.getInputProps()} />
        {
            dropzone.isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
        </div>
        <div class="w-full">
            <p class="font-bold">Added audio files:</p>
            <table class="table">
                <thead>
                <tr>
                    <th></th>
                    <th>File Name</th>
                    <th>Duration</th>
                </tr>
                </thead>
                <tbody>
                    {files().map((fileElement, i) => (
                        <TrackTableDraggable id={i} file={fileElement.file} duration={fileElement.duration} />
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default TrackControllerComponent;
