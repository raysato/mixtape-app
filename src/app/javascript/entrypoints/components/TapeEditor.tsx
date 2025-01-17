import { Accessor, Component, createSignal, Show, Signal } from "solid-js";
import TrackComponent from "./TrackComponent";
import AudioFile from "../types/AudioFile";
import { Track } from "../types/Track";
import { TAPE_EDITOR_LENGTH_PX, TAPE_MAX_LENGTH_MIN } from "../consts/const";

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
    console.log(track.title)
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
            track.maxLength,
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

  const handleAddTrack = (audioFile: AudioFile) => {
    const maxLength = TAPE_EDITOR_LENGTH_PX / TAPE_MAX_LENGTH_MIN / 60 * audioFile.duration
    setTracks([
      ...tracks(),
      {
        id: tracks().length,
        position: mouseX() ?? 0,
        maxLength,
        start: 0,
        end: maxLength,
        title: audioFile.file.name,
        file: audioFile
      }
    ])
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
            top: `${10}px`,
          }}>
            <ul class="menu dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow">
              <li>
                <a class="hover:active" onmouseover={() => setShowMenu(1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                  </svg>
                  Add track here
                </a>
              </li>
              <Show when={showMenu() === 1}>
                <li onmouseover={() => setShowMenu(1)} >
                  <ul>
                  <Show when={showMenu() === 1 && files().length > 0}>
                    {files().map((fileElement, i) => (
                      <li><a class="group-hover:active" onmousedown={() => handleAddTrack(fileElement)}>{fileElement.file.name}</a></li>
                    ))}
                  </Show>
                  <Show when={showMenu() === 1 && files().length === 0}>
                    <li>No files uploaded</li>
                  </Show>
                  </ul>
                </li>
              </Show>
              
            </ul>
            
          </div>
        </Show>
      </div>
    </div>
  );
};

export default TapeEditor;
