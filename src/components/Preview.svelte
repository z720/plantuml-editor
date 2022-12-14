<script>
import  { Maximize, Minimize, Sliders } from "./icons/index.js";
import { plantumlServer } from '../stores/parameters';

export let url, name;
let options = false;
let aspect = 'fit';
function fit() {
  aspect = 'fit';
}
function zoom() {
  aspect = 'zoom'
}
function toggle() {
  options = !options;
}
function serverpref() {
	let s = window.prompt('Choose Plantuml server', $plantumlServer );
	if(s) {
		$plantumlServer = s;
	}
}
</script>

<div class="preview {aspect} { options ? 'options': ''}">
  <p class="actions">
    <button on:click={toggle}>
      <Sliders />
    </button>
    {#if aspect == 'zoom'}
    <button on:click={fit}><Minimize /></button>
    {:else}
    <button on:click={zoom}><Maximize /></button>
    {/if}
  </p>
  {#if options} 
  <p class="option">
    <label for="option.plantumlServer">Server PlantUML</label>
    <input id="option.plantumlServer" bind:value={$plantumlServer}>
  </p>
  {:else}
  <a href="{url}" download="{name}.png" target="plantuml-editor-dl">
    <img src="{url}" alt="{name}" />
  </a>
  {/if}
</div>

<style>
  .preview {
    text-align: center;
  }
  .actions {
    line-height: 1.2em;
    margin: 0.2em;
    text-align: right;
  }
  .preview a {
    display: block;
    height: calc(100vh - 8em);
    width: 100%;
  }
  .preview.options {
    width: 90%
  }
  .fit img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }
  .zoom img {
    object-fit: none;
  }
  button {
    border: none;
    background-color: transparent;
  }
  .option {
    display: flex;
    width: 100%;
    align-items: center;
  }
  label {
    width: 30%;
    text-align: right;
    margin-right:1ex;
  }
  label + * {
    width: 100%;
    font-size: 110%;
  }
</style>