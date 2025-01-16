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
  const tapeInfoSignal = createSignal<TapeInfo>({title: "", description: "", customURL: "", thumbnailImage: null});
  const [statusMsg, setStatusMsg] = createSignal("");
  const [progress, setProgress] = createSignal(0);
  let modalRef: HTMLDialogElement | undefined;

  const submit = () => {
    modalRef?.showModal()
    
  }

  const checkTapeInfo = () => {
    
  }

  return <div class="grid items-center justify-center gap-5">
    <TapeInfoForm tapeInfoSignal={tapeInfoSignal} />
    <TapeEditor trackSignal={trackSignal} files={filesSignal[0]}/>
    <TrackControllerComponent filesSignal={filesSignal}/>
    <button onclick={submit} class="btn bg-info">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
      </svg>
      Save
    </button>
    <dialog ref={el => modalRef=el} class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Creating new Mixtape</h3>
        <div class="py-4">
          <p class="">{statusMsg()}</p>
          <progress class="progress progress-info w-full" value={progress()} max="100"></progress>
        </div>
        <div class="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
}

if (root !== null) {
  render(element, root);
}