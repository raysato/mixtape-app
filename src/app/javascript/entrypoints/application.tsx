import { render } from "solid-js/web";
import "/app/app/assets/stylesheets/application.css";

const root = document.getElementById("solid-app-root");

const element = () => 
<div>
  <div class="navbar bg-base-200">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl" href="/">
        <p>Mixtape</p>
      </a>
    </div>
    <div class="flex-none">
      <a class="btn" href="/new">
        <p>Make your own mixtape</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </a>
    </div>
  </div>
  <div class="m-10">  
      <div id="solid-root"></div>
  </div>
</div>



if (root !== null) {
  render(element, root);
}