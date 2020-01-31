# yeldiR's blog

Using [hexo](https://hexo.io/).

Theme is in [`./themes/yeldirium`](./themes/yeldirium) and uses webpack for building.

## Development

Run `yarn run server` to start the blog locally. If something doesn't seem to
update, run `yarn run clean` and run `yarn run server` again. Some parts of hexo
or the theme are somehow persisted.

Changes made to the content will be instantly available. After changes are made
to the theme, `yarn run server` must be restarted, since webpack is only one
every time and has no reloading configured.

## Production

Run `yarn run build` to generate the static site. The folder `public` will then
contain the deployable website.

Run `docker build .` to build a functioning image. Be aware that the website's
url has to be statically inlined, so a built image will only work under the url
that it is built with. Configure the url for production in [`./_config.yml`](./_config.yml).

## Things to note

- There is a development config in addition to the production config. The __only__
  difference is the url. Keep the rest in sync, if you make changes to the config.
