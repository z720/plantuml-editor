<script>
    export let content;
	let avatar, fileinput;
    import Upload from "./icons/upload.svelte";
    import { recover } from '$lib/png'
	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsArrayBuffer(image);
		reader.onload = (e) => {
			content = recover(e.target.result);
		};
	};
</script>

<button on:click={() => {fileinput.click();}}>
<Upload />
</button>
<input
	style="display:none"
	type="file"
	accept=".jpg, .jpeg, .png"
	on:change={(e) => onFileSelected(e)}
	bind:this={fileinput}
/>
