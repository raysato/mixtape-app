import { render } from "solid-js/web";
import "/app/app/assets/stylesheets/application.css";
import TapeEditor from "../components/TapeEditor";
import TrackControllerComponent from "../components/TrackControllerComponent";
import { createEffect, createSignal, Show } from "solid-js";
import { Track } from "../types/Track";
import AudioFile from "../types/AudioFile";
import TapeInfo from "../types/TapeInfo";
import TapeInfoForm from "../components/TapeInfoForm";
import { useFetch } from "../libs/CSRFFetch";
import TapeCreateRequest from "../types/TapeCreateRequest";
import { TAPE_EDITOR_LENGTH_PX, TAPE_MAX_LENGTH_MIN } from "../consts/const";
import PlayableTrack from "../types/PlayableTrack";

const root = document.getElementById("solid-root");
const API_ENDPOINT = '/resources'

const element = () => {
  const filesSignal = createSignal<AudioFile[]>([]);
  const trackSignal = createSignal<Track[]>([]);
  const [tracks, setTracks] = trackSignal
  const tapeInfoSignal = createSignal<TapeInfo>({title: "", description: "", customURL: "", password: "",thumbnailImage: null});
  const [statusMsg, setStatusMsg] = createSignal("");
  const [tapeInfo] = tapeInfoSignal
  const [progress, setProgress] = createSignal(0);
  const [playableTrackData, setPlayableTrackData] = createSignal<PlayableTrack[]>([]);
  const [btnStatus, setBtnStatus] = createSignal(0)
  const [createdTapeUUID, setCreatedTapeUUID] = createSignal<number | null>(null)
  createEffect(() => {
    const newPlayableTrackData: PlayableTrack[] = tracks().map(track => {
      const pxPositionToMiliSeconds = TAPE_MAX_LENGTH_MIN * 60 * 1000 / TAPE_EDITOR_LENGTH_PX
      
      return {
        name: track.title,
        play_at: track.position * pxPositionToMiliSeconds,
        start_at: track.start * pxPositionToMiliSeconds,
        end_at: track.end * pxPositionToMiliSeconds,
        resource_id: track.resource_id
      }
    })
    setPlayableTrackData(newPlayableTrackData)
    console.log('updating track', newPlayableTrackData)
  });
  let modalRef: HTMLDialogElement | undefined;

  const showProgressAsMsg = (num: number) => {
    setStatusMsg(`Uploading files ${num}/${tracks.length + 1}`)
  }

  const addProgress = () => {
    const newProgress = progress() + 1
    setProgress(newProgress)
    showProgressAsMsg(newProgress)
  }

  const uploadFile = async (file: File, track?: Track) => {
    const formData = new FormData();
    formData.append("name", file.name);
    formData.append("file", file);
  
    try {
      const response = await useFetch(API_ENDPOINT, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error(`Error uploading file ${file.name}:`, errorResponse);
        throw new Error()
      }
  
      const responseData: {
        id: number;
        name: string;
        file_url: string;
      } = await response.json();
      console.log(`File uploaded successfully: ${file.name}`, responseData);
      if (responseData) {
        addProgress()
      }
      if (track) {
        track.resource_id = responseData.id
      } else {
        tapeInfo().thumbnailResourceID = responseData.id
      }
      return responseData;
    } catch (error) {
      console.error(`An error occurred while uploading file ${file.name}:`, error);
      throw new Error()
    }
  }

  const uploadFiles = async () => {
    const uploadPromises = tracks().map((track, index) =>
      uploadFile(track.file.file, track)
    );
    if (tapeInfo().thumbnailImage !== null) {
      uploadPromises.push(uploadFile(tapeInfo().thumbnailImage ?? new File([], '')))
    } else {
      addProgress()
    }
    try {
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      setStatusMsg('File upload failed')
      throw new Error()
    }
  }

  const checkTapeInfo = () => {
    if (tapeInfo().title === '') {
      return 'Title is not set'
    }
    if (tracks().length < 1) {
      return 'At least one track must be included in a mixtape'
    }
    return true;
  }

  const uploadTape = async (requestData: TapeCreateRequest) => {
    const response = await useFetch('/tapes', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      // Handle HTTP errors
      const errorResponse = await response.json();
      console.error("Error creating tape:", errorResponse);
      return errorResponse;
    }
    return await response.json()
  }

  const submit = async () => {
    if (checkTapeInfo() !== true) {
      alert(checkTapeInfo())
      return
    }
    modalRef?.showModal()
    if (await uploadFiles()) {
      setStatusMsg('Creating mixtape')
      setTracks([...tracks()])
      const requestData: TapeCreateRequest = {
        name: tapeInfo().title,
        description: tapeInfo().description,
        customURL: tapeInfo().customURL,
        password: tapeInfo().password,
        thumbnailResourceID: tapeInfo().thumbnailResourceID ?? 0,
        tracks: playableTrackData()
      }
      const response = await uploadTape(requestData)
      console.log(response.uuid)
      if (response.error) {
        setStatusMsg('Provided custom URL already exists')
        return
      }
      addProgress()
      setStatusMsg('Upload complete! Your mixtape is available')
      setCreatedTapeUUID(response.uuid)
    }
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
          <progress class="progress progress-info w-full" value={progress()} max={tracks().length + 2}></progress>
        </div>
        <Show when={statusMsg() === 'Provided custom URL already exists'}>
          <div class="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button class="btn">Close</button>
            </form>
          </div>
        </Show>
        <Show when={createdTapeUUID()}>
          <div class="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <a class="btn btn-info" target="_blank" rel="noopener noreferrer" href={`/t/${createdTapeUUID()}`}>Go</a>
            </form>
          </div>
        </Show>
      </div>
    </dialog>
  </div>
}

if (root !== null) {
  render(element, root);
}