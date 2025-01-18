import { render } from "solid-js/web";
import ViewableTape from "../types/ViewableTape";
import CassetteTape from "../components/CassetteTape";
import { createSignal, Show } from "solid-js";
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
  const togglePlaying = () => {
    setPlaying(!playing())
    setShow(true);
    setTimeout(() => setShow(false), 1000);
    if (playing()) {
      runner.start(startTape)
      return
    }
    runner.stop()
  }
  const startTape = () => {
    if (tapeLengthMs <= timeMs()) {
      setTimeMs(0)
      return
    }
    setTimeMs(timeMs() + 50)
  }
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
      <div class="flex justify-center">
        <CassetteTape playing={playing()} onclick={togglePlaying} name={tapeData.name} />
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
        <input type="range" min="0" max={tapeLengthMs} value={timeMs()} onchange={(event) => setTimeMs(parseInt(event.target.value))} class="range range-primary"/>
        <div class="flex w-full justify-between px-2 text-xs">
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </div>
      </div>
    </div>
    <p class="text-center w-full pt-10">{tapeData.description}</p>
  </div>
}

if (root !== null) {
  render(element, root);
}