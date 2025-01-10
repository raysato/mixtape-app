import { createDraggable } from "@thisbeyond/solid-dnd";
import { Component } from "solid-js";

type Track = {
  id: number;
  position: number; // Base position of the track
  maxLength: number; // Maximum allowable length between start and end
  start: number; // Start offset relative to the base position
  end: number; // End offset relative to the base position
  title: string;
};

type TrackTableDraggableProps = {
    id: number;
    file: File;
    duration: number
};

const TrackTableDraggable: Component<TrackTableDraggableProps> = (props) => {
  const { id, file, duration } = props;

  return (
    <tr class="hover cursor-grab">
        <th>{ id }</th>
        <td>{ file.name }</td>
        <td>{ Math.floor(duration) }</td>
    </tr>
  );
};

export default TrackTableDraggable;
