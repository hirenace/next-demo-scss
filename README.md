
# Next.js with SCSS

Demo for next.js with scss

## Run Locally

Clone the project

```bash
  git clone https://github.com/hirenace/next-demo-scss.git.git
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


## Deployment

To deploy this project run

```bash
  pnpm build
```


## Tech Stack

**Client:** React, Next, SCSS

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
