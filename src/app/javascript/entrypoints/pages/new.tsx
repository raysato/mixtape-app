import { render } from "solid-js/web";
import "/app/app/assets/stylesheets/application.css";
import TapeEditor from "../components/TapeEditor";
import TrackControllerComponent from "../components/TrackControllerComponent";
import { createSignal } from "solid-js";
import { Track } from "../types/Track";
import AudioFile from "../types/AudioFile";

const root = document.getElementById("solid-root");

const element = () => {
  const filesSignal = createSignal<AudioFile[]>([]);
  const trackSignal = createSignal<Track[]>([
      { id: 1, position: 50, maxLength: 200, start: 0, end: 100, title: "Track 1" },
      { id: 2, position: 200, maxLength: 300, start: 50, end: 150, title: "Track 2" },
    ]);
  return <div class="grid items-center justify-center gap-5">
  <TapeEditor trackSignal={trackSignal} files={filesSignal[0]}/>
  <TrackControllerComponent filesSignal={filesSignal}/>
  </div>
}

if (root !== null) {
  render(element, root);
}