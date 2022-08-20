# node-copyfile

> copy files util
## Usage
`npm install node-copyfile -D`

```ts
import copyfiles from 'node-copyfile';

async function copy() {
  await copyfiles([
    {
      src: ["src/js/*.js", "src/css/*.css"],
      dest: "dist",
    }, 
    {
      src: "src/public/index.html",
      dest: "dist/public",
    },
  ]);
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