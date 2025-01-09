import { render } from "solid-js/web";
import "/app/app/assets/stylesheets/application.css";

const root = document.getElementById("solid-root");

const element = () => <div>
  <button class="btn btn-info">Info</button>
</div>

if (root !== null) {
  render(element, root);
}