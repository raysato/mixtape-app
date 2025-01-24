import { render } from "solid-js/web";
import ViewableTape from "../types/ViewableTape";
import CassetteTape from "../components/CassetteTape";
import { createEffect, createSignal, Show } from "solid-js";
import { TAPE_MAX_LENGTH_MIN } from "../consts/const";
import { TaskRunner } from "../libs/TaskRunner";

const root = document.getElementById("solid-root");
const tapeData: ViewableTape = JSON.parse(document.getElementById('tape-data')?.getAttribute('data-json') ?? '[]');
const tapeLengthMs = TAPE_MAX_LENGTH_MIN * 60 * 1000
const runner = new TaskRunner();

const element = () => {
  const [playing, setPlaying] = createSignal(false);
  const [show, setShow] = createSignal(false);
  const [timeMs, setTimeMs] = createSignal(0)
  let playingTrackIndex: number | null = null
  let playingAudio: HTMLAudioElement | null = null
  const [readyToPlay, setReadyToPlay] = createSignal(false);
  const [volume, setVolume] = createSignal(100);

  const audioOnLoad = () => {
    setReadyToPlay(true)
    if (playing()) {
      attemptPlayTrack()
    }
  }

  createEffect(() => {
    const trackToPlay = tapeData.tracks.findIndex((track) =>  track.play_at + track.start_at <= timeMs() && timeMs() < track.play_at + track.end_at)
    if (trackToPlay === -1) {
      playingAudio?.pause();
      playingAudio = playingTrackIndex = null
      setReadyToPlay(false)
      return
    }
    if (trackToPlay !== playingTrackIndex) {
      playingAudio?.pause()
      runner.stop()
      setReadyToPlay(false)
      playingTrackIndex = (trackToPlay)
      playingAudio = new Audio(tapeData.tracks[trackToPlay].audiofile_url);
      playingAudio.addEventListener('loadedmetadata', audioOnLoad);
    }
  })

  createEffect(() => {
    if (playingAudio) {
      playingAudio.volume = volume() / 100
    }
  })

  const updateAudioTime = () => {
    if (playingAudio !== null && playingTrackIndex !== null) {
      const track = tapeData.tracks[playingTrackIndex]
      const time = (timeMs() - track.start_at - track.play_at) / 1000
      playingAudio.currentTime = time
    }
  }

  const attemptPlayTrack = () => {
    if (playingAudio === null) {
      return
    }
    updateAudioTime()
    runner.start(startTape)
    playingAudio.volume = volume() / 100
    playingAudio.play()
  }

  const togglePlaying = () => {
    setPlaying(!playing())
    setShow(true);
    setTimeout(() => setShow(false), 1000);
    if (playing()) {
      setTimeMs(timeMs() + 1)
      if (readyToPlay()) {
        attemptPlayTrack()
      }
      return
    }
    runner.stop()
    playingAudio?.pause()
  }
  const startTape = () => {
    if (tapeLengthMs <= timeMs()) {
      setTimeMs(0)
      return
    }
    setTimeMs(timeMs() + 50)
  }

  const timeDisplay = () => `${String(Math.floor(timeMs() / 1000 / 60)).padStart(2, '0')}:${String(Math.floor(timeMs() % (1000 * 60) / 1000)).padStart(2, '0')}`
  return <div class="grid w-full">
    <div class="relative">
      <Show when={playing()}>
        <svg onclick={togglePlaying} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class={`size-24 w-full top-[110px] absolute cursor-pointer transition-opacity duration-1000 ${show() ? "opacity-100" : "opacity-0 pointer-events-none"}`} style={{ transition: show() ? "opacity 0.11s" : "opacity 1s" }}>
          <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
        </svg>
      </Show>
      <Show when={!playing()}>
        <svg onclick={togglePlaying} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class={`size-24 w-full top-[110px] absolute cursor-pointer transition-opacity duration-1000 ${show() ? "opacity-100" : "opacity-0 pointer-events-none"}`} style={{ transition: show() ? "opacity 0.11s" : "opacity 1s" }}>
        <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clip-rule="evenodd" />
        </svg>
      </Show>
      <div class="flex items-center justify-center space-x-4">
        <CassetteTape playing={playing() && readyToPlay()} onclick={togglePlaying} name={tapeData.name} thumbnail={tapeData.thumbnail_url} />
        <div class="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <Show when={volume() === 0}>
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
            </Show>
            <Show when={volume() !== 0}>
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
              <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
            </Show>
          </svg>
          <input type="range" min="0" max="100" value={volume()} oninput={(event) => setVolume(parseInt(event.target.value))} class="range w-[19rem] -rotate-90 transform origin-center appearance-none" />
        </div>
      </div>
      
    </div>
    <div class="pt-10 w-[500px] justify-self-center flex gap-2">
      <button onclick={togglePlaying} class="btn btn-primary btn-sm btn-square">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
          <Show when={!playing()}>
            <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
          </Show>
          <Show when={playing()}>
            <path d="M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z" />
          </Show>
        </svg>
      </button>
      <div class="w-full pt-1">
        <input type="range" min="0" max={tapeLengthMs} value={timeMs()} oninput={(event) => setTimeMs(parseInt(event.target.value))} onchange={updateAudioTime} class="range range-primary"/>
        <div class="flex w-full justify-between px-2 text-xs">
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </div>
      </div>
      <p class="pt-1">{timeDisplay()}</p>
    </div>
    <div class="flex pt-10 gap-8">
      <Show when={tapeData.thumbnail_url}>
        <img src={tapeData.thumbnail_url} class="h-40 object-cover rounded-lg border-base-content-400 border-2" />
      </Show>
      <p class="w-full">{tapeData.description}</p>
    </div>
  </div>
}

if (root !== null) {
  render(element, root);
}