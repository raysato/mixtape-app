import { render } from "solid-js/web";
import "/app/app/assets/stylesheets/application.css";
import TapeEditor from "../components/TapeEditor";
import TrackControllerComponent from "../components/TrackControllerComponent";
import { createSignal } from "solid-js";
import { Track } from "../types/Track";
import AudioFile from "../types/AudioFile";
import TapeInfo from "../types/TapeInfo";
import TapeInfoForm from "../components/TapeInfoForm";

const root = document.getElementById("solid-root");

const element = () => {
  const filesSignal = createSignal<AudioFile[]>([]);
  const trackSignal = createSignal<Track[]>([]);
  const tapeInfoSignal = createSignal<TapeInfo>({title: "", description: "", thumbnailImage: null});
  return <div class="grid items-center justify-center gap-5">
    <TapeInfoForm tapeInfoSignal={tapeInfoSignal} />
    <TapeEditor trackSignal={trackSignal} files={filesSignal[0]}/>
    <TrackControllerComponent filesSignal={filesSignal}/>
  </div>
}

if (root !== null) {
  render(element, root);
}