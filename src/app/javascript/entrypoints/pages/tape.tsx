import { render } from "solid-js/web";
import ViewableTape from "../types/ViewableTape";

const root = document.getElementById("solid-root");
const tapeData: ViewableTape = JSON.parse(document.getElementById('tape-data')?.getAttribute('data-json') ?? '[]');

const element = () => {

    

    return <div>
    <button class="btn btn-info">Info</button>
  </div>
}

if (root !== null) {
  render(element, root);
}