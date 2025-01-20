import { render } from "solid-js/web";

const root = document.getElementById("solid-root");
const tapesData: {
  name: string;
  uuid: string;
  resource_url: string
}[] = JSON.parse(document.getElementById('tapes-data')?.getAttribute('data-json') ?? '[]');
const currentPage = parseInt(document.getElementById('pagination')?.getAttribute('data-current-page') ?? '1');
const totalPages = parseInt(document.getElementById('pagination')?.getAttribute('data-total-pages') ?? '1');

const element = () => <div class="grid items-center justify-center">
  <div class="w-full grid grid-cols-4 gap-4 justify-start">
    {tapesData.map(tape => (<div>
      <a href={`t/${tape.uuid}`}>
        <img src={tape.resource_url} class="h-40 object-cover rounded-lg" />
        <p class="text-xl">{tape.name}</p>
      </a>
    </div>))}
  </div>
  <div class="join justify-self-center">
    {Array.from({ length: totalPages }).map((_, index) => <a href={`/?page=${index + 1}`} class={`join-item btn ${currentPage - 1 === index ? 'btn-active' : ''}`}>{index + 1}</a>)}
  </div>
</div>

if (root !== null) {
  render(element, root);
}