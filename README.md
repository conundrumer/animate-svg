animate-svg
===========

in order to generate gif:

- you must have `imagemagick` installed (I think with the `--with-rsvg` flag, just to be safe and in case you want to do something fancy, otherwise use `svg2png`), e.g. with homebrew `brew install imagemagick --with-librsvg`

how to run:

- `npm install`
- `npm run render`

modify `src/index.js` to change what is rendered

output gif goes into `out/gif/`
