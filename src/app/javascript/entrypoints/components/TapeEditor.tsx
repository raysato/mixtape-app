import { Accessor, Component, createSignal, Show, Signal } from "solid-js";
import TrackComponent from "./TrackComponent";
import AudioFile from "../types/AudioFile";

type Track = {
  id: number;
  position: number; // Base position of the track
  maxLength: number; // Maximum allowable length between start and end
  start: number; // Start offset relative to the base position
  end: number; // End offset relative to the base position
  title: string;
};
const TapeEditor: Component<{
  trackSignal: Signal<Track[]>
  files: Accessor<AudioFile[]>
}> = (props) => {
  const [tracks, setTracks] = props.trackSignal
  const files = props.files
  const editorWidth = 800; // Width of the editor in pixels

  const [draggedTrack, setDraggedTrack] = createSignal<Track | null>(null);
  const [resizingTrack, setResizingTrack] = createSignal<Track | null>(null);
  const [resizeDirection, setResizeDirection] = createSignal<"left" | "right" | null>(null);
  const [mouseX, setMouseX] = createSignal<number | null>(null);
  const [targetX, setTargetX] = createSignal<number | null>(null);
  
  const [showMenu, setShowMenu] = createSignal<number | null>(null);

  const handleMouseMove = (event: MouseEvent) => {
    if (draggedTrack() !== null) {
      moveTrack(draggedTrack() as Track, event)
      return
    }
    if (resizingTrack()) {
      resizeTrack(resizingTrack() as Track, event)
    }
  };

  const moveTrack = (track: Track, event: MouseEvent) => {
    if (mouseX() === null) {
      setMouseX(event.clientX)
    }
    const mouseMoved = event.clientX - (mouseX() ?? event.clientX);
    if (targetX() === null) {
      setTargetX(track.position)
    }
    const updatedTracks = tracks().map((track) =>
      track.id === draggedTrack()!.id
        ? {
            ...track,
            position: Math.min(
              Math.max(0 - track.start, targetX() as number + mouseMoved),
              editorWidth - (track.end - track.start) // Ensure the track stays within bounds
            ),
          }
        : track
    );
    setTracks(updatedTracks);
  }

  const resizeTrack = (track: Track, event: MouseEvent) => {
    if (mouseX() === null) {
      setMouseX(event.clientX)
    }
    const mouseMoved = event.clientX - (mouseX() ?? event.clientX);
    if (targetX() === null) {
      setTargetX(resizeDirection() === "right" ? track.end : track.start)
    }
    const updatedTracks = tracks().map((track) => {
      if (track.id !== resizingTrack()!.id) {
        return track;
      }
      if (resizeDirection() === "right") {
        const newEnd = Math.max(
          track.start,
          Math.min(
            track.start + track.maxLength,
            targetX() as number + mouseMoved
          )
        );
        return { ...track, end: newEnd };
      }
      if (resizeDirection() === "left") {
        const newStart = Math.min(
          track.end,
          Math.max(
            0,
            targetX() as number + mouseMoved
          )
        );
        return { ...track, start: newStart };
      }
      return track;
    });
    setTracks(updatedTracks);
  }

  const handleMouseUp = () => {
    setShowMenu(null)
    setDraggedTrack(null);
    setResizingTrack(null);
    setResizeDirection(null);
    setMouseX(null);
    setTargetX(null);
  };

  const handleRightClick = (event: MouseEvent) => {
    event.preventDefault()
    setShowMenu(0)
    setMouseX(event.layerX)
  }

  const handleAddTrackMenu = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setShowMenu(1)
  }

  return (
    <div>
      <div
      class="relative w-[800px] h-[150px] border border-gray-300 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={handleRightClick}
      >
        {tracks().map((track) => (
          <TrackComponent
            key={track.id}
            track={track}
            onDragStart={(track) => setDraggedTrack(track)}
            onResizeStart={(track, direction) => {
              setResizingTrack(track);
              setResizeDirection(direction);
            }}
          />
        ))}
        <Show when={showMenu() !== null}>
          <div class="absolute w-36 h-48 card" style={{
            left: `${mouseX()}px`,
            top: `${30}px`,
          }}>
            <Show when={showMenu() === 1}>
              <ul class="menu dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow">
                <li class="group"><a class="group-hover:active" onclick={handleAddTrackMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                  <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                </svg>
                Add track here</a></li>
              </ul>
            </Show>
            <Show when={showMenu() === 0}>
              <ul class="menu dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow">
                {files().map((fileElement, i) => (
                  <li class="group"><a class="group-hover:active">{fileElement.file.name}</a></li>
                ))}
              </ul>
            </Show>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default TapeEditor;
