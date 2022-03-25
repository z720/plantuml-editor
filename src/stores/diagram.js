import { writable as storage} from 'svelte-local-storage-store';
import { writable,  get, derived } from 'svelte/store';
import { encode } from 'plantuml-encoder';
import { plantumlServer } from './parameters';
import Base64 from "../lib/base64";
let sample = {
    name: 'Sample Diagram',
    content:
`start
repeat
  :Write UML 
  (plantuml syntax);
  :Update;
  :View Diagram;
repeat while (diagram ok?)
  :Enjoy;
stop
`
};

function createStore(key, init) {
  const storedDiagram = storage(key, init);
  const { subscribe, set } = storedDiagram;
  return {
    subscribe,
    set,
    encodedContent: derived(storedDiagram, $d => {
        return encode($d.content);
    }),
    imageUrl: derived([storedDiagram, plantumlServer], ([$d, $server]) => {
        return `${$server}/img/${encode($d.content)}`;
    }),
    dataUrlSource: derived(storedDiagram, $d => {
      return `data:text/plain;base64,${Base64.encode($d.content)}`;
    })
  }
}

export const current = createStore('current-diagram', sample);
console.log('current', current);