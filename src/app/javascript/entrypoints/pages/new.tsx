import { render } from "solid-js/web";
import "/app/app/assets/stylesheets/application.css";
import Editor from "../components/Editor";

const root = document.getElementById("solid-root");

const element = () => <div class="flex items-center justify-center ">
  <Editor />
</div>

if (root !== null) {
  render(element, root);
}