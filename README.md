# Ng4

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

maybe need fix bug
I found the bug, fix:

```
/Users/hyh/workspace/test/ng4/node_modules/_license-webpack-plugin@1.1.0@license-webpack-plugin/dist/ModuleProcessor.js
```
line: 34

from
```
tokens[0].charAt(0) === '@' 
                ? tokens.slice(0, 2).join('/')
                : tokens[0];
```

to

```
(tokens[0].charAt(0) === '@' || tokens[0].indexOf('_@') === 0)
                ? tokens.slice(0, 2).join('/')
                : tokens[0];
```
