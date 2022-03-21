<script>
  import Base64 from "../lib/base64";
  // import { faFileCode, faFileImage } from '@fortawesome/free-solid-svg-icons';
  // import { FontAwesomeIcon } from "fontawesome-svelte";
  import Download from "./icons/download.svelte";
  import Code from "./icons/code.svelte";
  export let diagram;
</script>

<div class="editor">
<p class="ctrl">
  <input id="diagram.name" bind:value={diagram.name} placeholder="Name your Diagram"/>
  <a class="dl" 
      href="data:text/plain;base64,{Base64.encode(diagram.content)}" 
      download="{diagram.name || 'diagram'}.puml"  >
    <Code />
  </a>
  <a class="dl" 
      href="{diagram.imageUrl()}" 
      download="{diagram.name || 'diagram'}.png" target="plantuml-editor-dl" >
    <Download />
  </a>
</p>
<p><textarea bind:value={diagram.content}></textarea></p>
</div>


<style>
  input:focus,
  textarea:focus {
    outline: none;
  }
  .editor {
    width: 100%;
    min-width: 300px;
  }
  .editor p input {
    border: none;
    border-bottom: 1px solid transparent;
    width: 99%;
    font-size: 1.1em;
  }
  .editor p input:focus {
    border-bottom: 1px solid lightgrey;
  }
  .editor textarea {
    margin: 0;
    padding: 2px;
    width: 100%;
    border: 1px solid lightgrey;
    min-height: 20em;
    height: calc(100vh - 8em);
  }
  .ctrl {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  .ctrl :first-child {
    width: 100%;
  }
  .dl {
    color: inherit;
    margin-left: 0.2em;
  }
  p {
    margin: 0.2em 0;
  }
</style>