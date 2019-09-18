const mix = require('laravel-mix');
require('laravel-mix-alias');

const url       = 'http://wordpress.deft';
const dist      = './dist';
const src       = './src';
const styles    = './src/scss';

const externals = {
  'jquery': 'jQuery',
  'lodash': 'lodash',
  'react': 'React',
  'react-dom': 'ReactDOM',
  '@wordpress/blocks': 'wp.blocks',
  '@wordpress/components': 'wp.components',
  '@wordpress/compose': 'wp.compose',
  '@wordpress/data': 'wp.data',
  '@wordpress/date': 'wp.date',
  '@wordpress/editor': 'wp.editor',
  '@wordpress/element': 'wp.element',
  '@wordpress/hooks': 'wp.hooks',
  '@wordpress/i18n': 'wp.i18n',
  '@wordpress/plugins': 'wp.plugins',
}

// Webpack
mix.webpackConfig({
  externals: externals,
  resolve: {
      extensions: ['.jsx', '.js']
  }
})

// Babel
// mix.babelConfig({
//   'plugins': [
//     [
//       '@wordpress/babel-plugin-makepot', { 'output': 'languages/blocks.pot' },
//     ],
//   ],
// })

mix.alias({
    '@': src,
    '~': styles,
    '@components': `${src}/components`,
});

// Assets
mix.setPublicPath(dist)
    // user .react instead of .js
    .react(`${src}/js/app.js`, `${dist}/js`)
    .version();

// Browsersync
// mix.browserSync({
//   proxy: `${url}`,
//   files: [
//     './**/*.php',
//     `${dist}/**/*.css`,
//     `${dist}/**/*.js`,
//   ],
// });

// // Assets
// mix.copyDirectory(`${src}/fonts`, `${dist}/fonts`)
//    .copyDirectory(`${src}/images`, `${dist}/images`)

// // Source maps when not in production.
// if (!mix.inProduction()) {
//   mix.sourceMaps();
// }

// Hash and version files in production.
// if (mix.inProduction()) {
//   mix.version()
//      .then(() => {
//        const manifest = File.find(`${dist}/mix-manifest.json`);
//        const json = JSON.parse(manifest.read());
//        Object.keys(json).forEach(key => {
//          const hashed = json[key];
//          delete json[key];
//          json[key.replace(/^\/+/g, '')] = hashed.replace(/^\/+/g, '');
//        });
//        manifest.write(JSON.stringify(json, null, 2));
//      });
// }