# node-copyfile

> copy files util

## Usage

`npm install node-copyfile -D`

```ts
import {
  copyFileBatch,
  type Option,
} from "node-copyfile";

async function copy() {
  const options: Option[] = [
    {
      src: ["src/js/*.js", "src/css/*.css"],
      dest: "dist",
    },
    {
      src: "src/public/index.html",
      dest: "dist/public",
    },
  ];
  await copyFileBatch(options);
}
```

```
- dist
  - css
    - a.css
  - js
    - a.js
    - b.js
  - public
    - index.html
```
