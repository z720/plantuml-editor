<script>
import Editor from '../components/Editor.svelte';
import Preview from '../components/Preview.svelte';
import Download from '../components/Download.svelte';
import Upload from '../components/Upload.svelte';

import { current } from '../stores/diagram';
const { dataUrlSource, imageUrl } = current;
</script>

<nav>
	<h1>PlantUML Editor</h1>
	<aside>
		<small>by <a href="//github.com/z720">z720</a>
			— Hosted on <a rel="external" href="//github.com/z720/plantuml-editor">GitHub</a>
			— Icons by <a href="https://feathericons.com">Feather</a></small>
	</aside>
</nav>
<main>
	<Editor bind:name={$current.name} bind:content={$current.content}>
			<Download icon="Code" href="{$dataUrlSource}" 
				name="{$current.name || 'diagram'}.puml" />
			<Download icon="Download" href="{$imageUrl}" 
				name="{$current.name || 'diagram'}.png" />
	</Editor>
	<Preview name={$current.name || 'diagram'} url={$imageUrl}>
		<Upload bind:content={$current.content} />
	</Preview>
</main>

<style>
	main {
		display: flex;
		flex: 1 auto;
		padding: 0.2em 1ex;
	}
	nav {
		padding: 0.2em 1ex;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		border-bottom: 1px solid grey;
		background-color: rgb(238, 238, 238);
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
