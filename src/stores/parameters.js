import { writable } from 'svelte-local-storage-store';

const plantumlDefault = '//www.plantuml.com/plantuml'

const { subscribe, set } = writable('options.plantuml-server', plantumlDefault);

export const plantumlServer = {
    subscribe,
    set: (value) => {
        console.log('set', value);
        if (!!value || value == "") {
            return set(plantumlDefault);
        } 
        return set(value);
    }
}