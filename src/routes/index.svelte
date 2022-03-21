<script>
  import { encode } from "plantuml-encoder";
  import Editor from "../components/Editor.svelte";
  import Preview from "../components/Preview.svelte";

    let currentDiagram = {
      name: "",
      content: `start
          repeat
            :Write UML 
            (plantuml syntax);
            :Update;
            :View Diagram;
          repeat while (diagram ok?)
            :Enjoy;
          stop
        `,
      encodedContent: function() {
        return encode(this.content);
      },
      imageUrl: function() {
        return `//www.plantuml.com/plantuml/img/${this.encodedContent()}`;
      }
    };
  </script>
  
  <style>
    main {
      display: flex;
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    nav h1 {
      width: 100%;
      font-size: 1.2em;
      margin: 0.2em 0;
    }
    nav aside {
      min-width: 20em;
      text-align: right;
    }
  </style>
  
  <nav>
    <h1>PlantUML Editor</h1>
    
    <aside><small>by <a href="//github.com/z720">z720</a>  
      — Hosted on <a rel="external" href="//github.com/z720/plantuml-editor">GitHub</a> 
      — Icons by <a href="https://feathericons.com">Feather</a></small></aside>
  </nav>
  <main>
    <Editor bind:diagram={currentDiagram} />
    <Preview name={currentDiagram.name || 'diagram'} url='{currentDiagram.imageUrl()}' />
  </main>