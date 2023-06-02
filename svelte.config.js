import adapter from '@sveltejs/adapter-static';

const ghpages = process.env.TARGET === 'github-pages';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		paths: {
			base: ghpages ? '/plantuml-editor' : '',
		},
		// trailingSlash: 'always',
		// prerender: {
		// 	// This can be false if you're using a fallback (i.e. SPA mode)
		// 	default: true
		// }
	}
};

export default config;
