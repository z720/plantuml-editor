<script>
import Maximize from "./icons/maximize.svelte";
import Minimize from "./icons/minimize.svelte";

  export let url, name;
  let aspect = 'fit'
  function fit() {
    aspect = 'fit';
  }
  function zoom() {
    aspect = 'zoom'
  }
</script>

<div class="preview {aspect}">
  <p class="actions">
    {#if aspect == 'zoom'}
    <button on:click={fit}><Minimize /></button>
    {:else}
    <button on:click={zoom}><Maximize /></button>
    {/if}
  </p>
  <a href="{url}" download="{name}.png" target="plantuml-editor-dl">
    <img src="{url}" alt="{name}" />
  </a>
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
</style>