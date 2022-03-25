import { writable } from 'svelte-local-storage-store';

export const plantumlServer = writable('options.plantuml-server', '//www.plantuml.com/plantuml');