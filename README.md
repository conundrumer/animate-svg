animate-svg
===========

if node.js is a hammer then everything is a nail.

i didnt want to learn processing and also im already comfrotable w react and i much prefer declarative and functional programming so i made this to make cool animations

usage
-----

in order to generate gif:

- you must have `imagemagick` installed (I think with the `--with-rsvg` flag, just to be safe and in case you want to do something fancy, otherwise use `svg2png`), e.g. with homebrew `brew install imagemagick --with-librsvg`

how to run:

- `npm install`
- `npm run render`

modify `src/index.js` to change what is rendered

output gif goes into `out/gif/`
