
# Next.js with SCSS

Demo for next.js with scss

## Run Locally

Clone the project

```bash
  git clone https://github.com/hirenace/next-demo-scss.git
```

Go to the project directory

```bash
  cd next-demo-scss
```

Install dependencies

```bash
  pnpm install
```

Start the server

```bash
  pnpm dev
```

Login mechanism uses fake API URLs 
```bash
  (https://dummyjson.com/docs/auth)
  username - kminchelle
  password - 0lelplR
```

## Running Tests

To run tests, run the following command

```bash
  pnpm test
```


## Build

```bash
  pnpm build
```


## NPM versioning

![Static Badge](https://img.shields.io/badge/node-v20.8.0-green?link=https%3A%2F%2Fnodejs.org%2Fen%2Fdownload)

![Static Badge](https://img.shields.io/badge/pnpm-v8_13_1-vintage?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpnpm%2Fv%2F8.13.1) 

![Static Badge](https://img.shields.io/badge/npm-v10_1_0-gold?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fnpm%2Fv%2F10.1.0)

![Static Badge](https://img.shields.io/badge/react-v19_2_0-blue?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Freact%2Fv%2F18.2.0) 

![Static Badge](https://img.shields.io/badge/next-v14_0_4-red?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fnext%2Fv%2F14.0.4)

![Static Badge](https://img.shields.io/badge/tailwindcss-v3_3_7-purple?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ftailwindcss%2Fv%2F3.3.7)

![Static Badge](https://img.shields.io/badge/postcss-v8_4_32-pink?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpostcss%2Fv%2F8.4.32)

## Usage/Examples

```javascript
  import React, { useEffect } from 'react';

  import '../styles/global.css';

  const MyApp = ({ Component, pageProps }) => {
      return <Component {...pageProps} />;
  }

  export default MyApp;

```


## Acknowledgements

 - [Next Js](https://nextjs.org/docs)
 - [React JS](https://react.dev/learn)
 - [Typescript](https://www.typescriptlang.org/docs/)
