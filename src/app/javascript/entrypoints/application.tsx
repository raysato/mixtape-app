import { render } from "solid-js/web";
import "/app/app/assets/stylesheets/application.css";

const root = document.getElementById("solid-app-root");

const element = () => <div class="m-10">  
    <div id="solid-root"></div>
</div>

if (root !== null) {
  render(element, root);
}