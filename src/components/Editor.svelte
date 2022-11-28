<script>
  export let name, content
</script>

<div class="editor">
  <p class="ctrl">
    <label for="diagram-name">Name:</label>
    <input id="diagram-name" bind:value={name} placeholder="Name your Diagram"/>
    <slot></slot>
  </p>
  <p><textarea bind:value={content}></textarea></p>
</div>


<style>
  input:focus-visible,
  textarea:focus-visible {
    outline: none;
  }
  .editor {
    width: 100%;
    min-width: 300px;
    max-width: 70vw;
  }
  .editor p input {
    border: none;
    border-bottom: 1px solid transparent;
    width: 99%;
    font-size: 1.1em;
  }
  .editor p input:focus-visible {
    border-bottom: 1px solid lightgrey;
  }
  .editor textarea {
    margin: 0;
    padding: 2px;
    width: 100%;
    border: 1px solid lightgrey;
    min-height: 20em;
    height: calc(100vh - 8em);
    font-family:  Consolas, "Courier New", monospace;
    font-size: 10pt;
  }
  .ctrl {
    display: flex;
    align-items: baseline;
    justify-content:stretch
  }
  .ctrl > * {
    flex-basis: min-content;
  }
  .ctrl label:first-child {
    margin-right: 1ex;
  }
  .ctrl #diagram-name {
    flex: 1;
  }
  p {
    margin: 0.2em 0;
  }
</style>