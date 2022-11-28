<script>
    import Code from "./icons/code.svelte";
    import Download from "./icons/download.svelte";
    export let href, name, icon;
</script>
<a class="dl" 
    href="{href}" 
    download="{name}" target="plantuml-editor-dl" >
    {#if icon=="Code"}
        <Code />
    {:else if icon == 'Download'}
        <Download />
    {/if}
    <slot></slot>
</a>

<style>
.dl {
    color: inherit;
    margin-left: 0.2em;
}
</style>