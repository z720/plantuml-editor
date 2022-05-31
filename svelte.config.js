import adapter from '@sveltejs/adapter-static';

const ghpages = process.env.TARGET === 'github-pages';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false
		}),
		paths: {
			base: ghpages ? '/plantuml-editor' : '',
		},
		trailingSlash: 'always',
		prerender: {
			// This can be false if you're using a fallback (i.e. SPA mode)
			default: true
		},
	}
};

export default config;
