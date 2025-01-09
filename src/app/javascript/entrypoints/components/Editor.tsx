import { createSignal } from "solid-js";
import TrackComponent from "./TrackComponent";

type Track = {
  id: number;
  position: number; // Base position of the track
  maxLength: number; // Maximum allowable length between start and end
  start: number; // Start offset relative to the base position
  end: number; // End offset relative to the base position
  title: string;
};

const Editor: React.FC = () => {
  const [tracks, setTracks] = createSignal<Track[]>([
    { id: 1, position: 50, maxLength: 200, start: 0, end: 100, title: "Track 1" },
    { id: 2, position: 200, maxLength: 300, start: 50, end: 150, title: "Track 2" },
  ]);

  const editorWidth = 800; // Width of the editor in pixels

  const [draggedTrack, setDraggedTrack] = createSignal<Track | null>(null);
  const [resizingTrack, setResizingTrack] = createSignal<Track | null>(null);
  const [resizeDirection, setResizeDirection] = createSignal<"left" | "right" | null>(null);
  const [mouseX, setMouseX] = createSignal<number | null>(null);
  const [targetX, setTargetX] = createSignal<number | null>(null);

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
              Math.max(0, targetX() as number + mouseMoved),
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
    setDraggedTrack(null);
    setResizingTrack(null);
    setResizeDirection(null);
    setMouseX(null);
    setTargetX(null);
  };

  return (
    <div>
      <div
      class="relative w-[800px] h-[150px] border border-gray-300 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
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
    </div>
    {targetX()} & {mouseX()}
    </div>
  );
};

export default Editor;
