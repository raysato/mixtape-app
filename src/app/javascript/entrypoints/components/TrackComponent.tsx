import { Component } from "solid-js";

type Track = {
  id: number;
  position: number; // Base position of the track
  maxLength: number; // Maximum allowable length between start and end
  start: number; // Start offset relative to the base position
  end: number; // End offset relative to the base position
  title: string;
};

type TrackComponentProps = {
  track: Track;
  onDragStart: (track: Track) => void;
  onResizeStart: (track: Track, direction: "left" | "right") => void;
};

const TrackComponent: Component<TrackComponentProps> = (props) => {
  const { track, onDragStart, onResizeStart } = props;

  const calculatedPosition = track.position + track.start;
  const calculatedWidth = track.end - track.start;

  return (
    <div
      class="absolute flex items-center justify-center bg-blue-200 border border-blue-500 cursor-grab"
      style={{
        left: `${calculatedPosition}px`,
        width: `${calculatedWidth}px`,
        height: "100%",
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        onDragStart(track);
      }}
    >
      {/* Left Resize Handle */}
      <div
        class="absolute top-0 left-0 h-full w-2 bg-blue-700 cursor-ew-resize"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(track, "left");
        }}
      />
      <span class="text-center">{track.title}</span>
      {/* Right Resize Handle */}
      <div
        class="absolute top-0 right-0 h-full w-2 bg-blue-700 cursor-ew-resize"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart(track, "right");
        }}
      />
    </div>
  );
};

export default TrackComponent;
