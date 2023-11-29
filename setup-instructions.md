# Authentication with JSON Web Tokens (JWTs)

This repo contains a working app that includes CRUD operations for fruit. It has the beginnings of authentication such as a `<Nav>` component with buttons for registering and signing in and a component to conditionally hide/show its child components based on if the user is authenticated.

Our task is to complete the authentication implementation of this app.

## Setup

### 0. Installation and migrations

- [ ] Clone this repo and `cd` into the new directory
- [ ] Install packages, run migrations and seeds, and start the dev server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    Commands might look like this:

    ```sh
    npm install
    npm run knex migrate:latest
    npm run knex seed:run
    npm run dev
    ```
  </details>

- [ ] Visit [http://localhost:5173](http://localhost:5173) in your browser

---

## Overview

In order to complete the implementation of authentication for this app, we need to make changes on both the client-side and the server-side to enable user registration and sign-in. We're also going to protect certain routes (the ones that alter data) so that only authenticated users can call them. 

<details>
  <summary>Requirements summary</summary>

  #### **Client-side**

  - Determine if the current user is logged in or not
  - Allow the user to register
  - Allow the user to sign in
  - Send the access token with each request
  - Allow the user to log off
  - Hide/show components based on the user's auth status

  #### **Server-side**

  The following routes should accept only authenticated requests

  - POST `/api/v1/fruits`
  - PUT `/api/v1/fruits`
  - DELETE `/api/v1/fruits`
</details>
<br />

### 1. Getting familiar with the app

- [ ] Explore the existing codebase
  <details style="padding-left: 2em">
    <summary>More about exploring the codebase</summary>
    
    No need to rush into this. There might be some patterns you haven't seen before.

    For example, this codebase uses [`styled-components`](https://www.styled-components.com). There is also a nice use of `props.children` in the `<Authenticated>` components.
  </details>

- [ ] Get familiar with the user interface
  <details style="padding-left: 2em">
    <summary>Tips</summary>
    At this stage it's normal that "Sign out" displays (as if you were logged in), even though you're not logged in.

    Select some fruits and try to update their values, delete them, and add new ones. See which work and which give errors. 

    Once you're comfortable enough with the app, proceed with a sense of curiosity as we enable authentication and lock down parts of the UI and some of the web API to only authenticated users.
  </details>

---

## Auth0 setup

### 2. Creating your user account
- [ ] Open your browser, go to Auth0.com and sign up for a new account
- [ ] Use the following settings to configure your user
  <details style="padding-left: 2em">
    <summary>User configuration settings (including value 1️⃣)</summary>

    1. For the "Role," select **Yes, coding**, and tick **I need advanced settings** (you don't need a chat with an expert)
    1. The default domain will be something like `dev-fsdf1y29`, but you should overwrite it with a domain of your own, in the format `cohortName-yourFirstName`, for example `matai-2021-john` 1️⃣. This value will be used later
    1. Select **Australia** as your **Region**
    1. Click **Create Account**
    1. Make sure **Development** is selected as the **Environment tag**. This should be the default but you can check it by looking at what is displayed at the top left (in the black bar, immediately under your domain) or by going to **Settings**
  </details>

### 3. Creating the "application"
- [ ] Go to **Applications**, and click the **Create Application** button
- [ ] Use the following settings to configure your application
  <details style="padding-left: 2em">
    <summary>App configuration settings (including value 2️⃣)</summary>

  1. Give your application a name, for example "Fruits App"
  1. Select **Single Page Web Applications** and click the **Create** button. This application will be used for our front-end app. On creating, you will be taken to the "Quick Start" tab of your new app
  1. Select the **Settings** tab
  1. Auth0 generated a random **ClientId** 2️⃣, make a note of it, because we will use this value later.
  1. Set the following values, in the **Application URIs** section:
  
    | Setting                   | Value                                                     |
    | ------------------------- | --------------------------------------------------------- |
    | Allowed Callback Url      | `http://localhost:5173/`                                  |
    | Allowed Logout Url        | `http://localhost:5173/`                                  |
    | Allowed Web Origins Url   | `http://localhost:5173/`                                  |
  7. Scroll down to the bottom of the page and click the **Save Changes** button

### 4. Creating the application API

- [ ] On the side bar, expand **Applications**, click on **APIs**, then click the **Create API** button
  <details style="padding-left: 2em">
    <summary>More about the API</summary>

    In order to protect our routes in the server-side, we need to verify that tokens passed from the client are valid. Creating an API that is linked to the Auth0 Application, the one that you just created, will check the token's validity.
  </details>
- [ ] Give your API a name, for example, "fruits"
- [ ] Set the **Identifier** field to be `https://fruits/api` 3️⃣, this value will be used as our `audience` later

---

## Client-side
### 5. Configuring Auth0Provider

In `client/index.tsx`:

- [ ] Observe how `<Auth0Provider>` has been used in `client/index.tsx`
  <details style="padding-left: 2em">
    <summary>More about <code>&lt;Auth0Provider&gt;</code></summary>

    - `<Auth0Provider>` has been imported from the Auth0 package
    - `<Auth0Provider>` wraps the `<App>` component
    - `<Auth0Provider>` has some attributes with no values... yet
  </details>

- [ ] Set the values in each attribute of `<Auth0Provider>` to the proper values from previous steps, marked 1️⃣, 2️⃣, and 3️⃣
  <details style="padding-left: 2em">
    <summary>More about these attributes</summary>

    See the [docs for the provider component](https://auth0.com/docs/quickstart/spa/react/01-login#configure-the-auth0provider-component).

    | Attribute  | Value                                                              |
    | ---------  | -------------------------------------------------------------------| 
    | `domain`   | See 1️⃣ above, format is `cohortName-yourFirstName.au.auth0.com`    |
    | `clientId` | See 2️⃣ above, this is the random string you made a note of earlier | 
    | `audience` | See 3️⃣ above, `https://fruits/api`                                 |
  </details>

- [ ] Refresh your browser and check the **Network** tab in the **DevTools**, if you see errors, then double check the steps above

Commit your code and swap driver/navigator if you're pairing.

### 6. Determining if the current user is signed in

In `client/components/Authenticated.tsx`:

- [ ] Explore `Authenticated.tsx` and the use of `isAuthenticated`
  <details style="padding-left: 2em">
    <summary>More about <code>Authenticated.tsx</code></summary>

    Our existing code contains a couple of clever `<IfAuthenticated>` and `<IfNotAuthenticated>` components in `client/components/Authenticated.tsx`. They render their child components based on the authentication status of the user.

    Fortunately, `@auth0/auth0-react` package exports a `useAuth0` hook. This hook exposes useful functions and values. Here we will use the `isAuthenticated` boolean value to see if there is an auth token, and that it hasn't yet expired. This hook does the checking behind the scenes. 

    Right now there is a placeholder `useIsAuthenticated` hook which is hard-coded to return `true`.
  </details>
  
- [ ] Import the `useAuth0` hook from within `@auth0/auth0-react`
- [ ] Call `useAuth0` within the `useIsAuthenticated` **function**, destructure the `isAuthenticated` **property** out of it and return this boolean variable
  <details style="padding-left: 2em">
    <summary>More about <code>useIsAuthenticated</code></summary>

    Note that because `useIsAuthenticated` calls a hook inside of it and returns its value, it also becomes a hook, which is why we start the function name with `use`. 

    With that in place, you can now see the "Sign in" link in the app.
  </details>

Now is a good time to commit your changes and swap driver/navigator if you're pairing.

### 7. Allowing the user to log in/out using Auth0

In `client/components/Nav.tsx`:

- [ ] Import the `useAuth0` hook from `@auth0/auth0-react` and use it inside the `<Nav>` component
- [ ] Destructure the `logout`, and `loginWithRedirect` functions out of the `useAuth0` hook
- [ ] Call these functions in the two handlers (instead of the `console.log` placeholders)
  <details style="padding-left: 2em">
    <summary>More about login and logout handlers</summary>

    * In `handleSignOut` we'll call `logout`
    * In `handleSignIn`, we'll call `loginWithRedirect`

    The "Sign In" link will redirect you to Auth0's authentication service and prompt you to enter an email and password. If this is your first time signing in, click on **Sign up** below the **Continue** button. This form allows you to create a new user (subscription) that is only used for the one Auth0 app. Even if you used the same email and password when creating an account on a different app, Auth0 will treat it as a new account that is specific to your Fruits app.

    After you've registered your new user, you will be redirected back to `http://localhost:5173` and "Sign out" will again be visible in the app.
  </details>

Commit your code and swap driver/navigator if you're pairing.

### 8. Reading user metadata in `Nav.tsx`

Currently, when we are signed in, we still see "john.doe" rendered as the nickname. Let's replace that with the nickname of the current user.

In `client/components/Nav.tsx`:

- [ ] Delete the hard-coded value for `user` and replace it with the `user` object from `useAuth0`
  <details style="padding-left: 2em">
    <summary>More about <code>user</code> in <code>Nav.tsx</code></summary>

    Notice how `user?.nickname` has a question mark in front of it. This is called the [optional chaining operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining). When we sign in, the user object may still be null while the `user` object is being fetched from Auth0. This optional chaining operator will prevent the app from crashing if the user object is null (while the user is authenticated).
  </details>
- [ ] When a user is signed in, try `console.log`ing the `user` object. You'll see that it has a `nickname` property; this is what is being rendered in `Nav.tsx`. You may try rendering other properties, such as `name`, `email`, or `image`.

<br />

Commit your code and swap driver/navigator if you're pairing.

### 9. Passing access tokens

We only want to allow a user to use our server routes if the user has been authenticated. We can retrieve a JWT token from Auth0 with `getAccessTokenSilently`, we want to pass it as a header when calling our server-side routes.

- [ ] In `client/components/Fruits.tsx` destructure `getAccessTokenSilently`, and call it in the `handleAdd` event handler to retrieve a token. Note: `getAccessTokenSilently` returns a Promise.
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    `getAccessTokenSilently` returns a Promise, so you'll need to use either:
    ```ts
    // async/await
    function handleMyEvent() {
      const token = await getAccessTokenSilently();
      // ... pass to api function
    }

    // or
    // .then/.catch
    function handleMyEvent() {
      getAccessTokenSilently()
        .then((token) => {
          // ... pass to api function
        })
    }
    ```
  </details>

- [ ] Pass `token` to the `addFruit` function as the second parameter
- [ ] Repeat the same steps for `handleUpdate` and `handleDelete`

Commit your code and swap driver/navigator if you're pairing.

---

## Server-side

### 10. Setting up the JWT Middleware

- [ ] In `server/auth0.ts`, set the `domain`(1️⃣, see tip below for required format) and `audience`(3️⃣) values
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    The format of `domain` should be `https://cohortName-yourFirstName.au.auth0.com` and `audience` should be `https://fruits/api`.
  </details>

### 11. Passing middleware to routes
There are three routes in `server/routes/fruits.ts` that we want to be accessible only for authenticated users.

- [ ] In each of the routes we want to protect, pass `checkJwt` as a second parameter
  <details style="padding-left: 2em">
    <summary>More about protecting routes</summary>

    You'll need to import the `checkJwt` function from `server/auth0.ts`.

    Passing `checkJwt` to the route might look like...
    
    ```typescript
    route.post('/', checkJwt, (req, res) => {
      // do stuff here
    })
    ```
    
    The following routes should accept only authenticated requests

    - POST `/api/v1/fruits`
    - PUT `/api/v1/fruits`
    - DELETE `/api/v1/fruits`
  </details>

<details>
  <summary><ins>What's happening with the middleware?</ins></summary>

  Every time a route receives an HTTP request, the `checkJwt` middleware will be activated and issue an HTTP request behind the scenes (machine to machine). The Auth0 service will compare the public signatures. If all goes well, `express` will execute the body of your route.
</details>
<br />

Now our middleware is ready to be used.

🎉 Congratulations, you made it! 🎉

---
## Stretch

### 12. Conditionally displayed content
<details>
  <summary>More about conditionally displayed content</summary>

  Some of the buttons and/or links are only valid in certain circumstances (if you're logged in, if you're the person who created that fruit, etc.). What improvements can you make to the app so that users only see buttons/links that they're actually allowed to use?
</details>

### 13. Quality measures

<details>
  <summary>Error-handling hygiene</summary>

  Handling errors properly benefits app developers and end-users alike, but it's also a security concern. Revealing the specifics of what exactly has gone wrong can give malicious parties information they can use to plan an attack. To prevent this, identify places in your code where an error could occur, catch those errors, and provide a "sanitized" response without sending the full details to the browser. If possible, tell the user how to fix the problem.
  
  See a really in-depth list of [error-handling practices](https://www.iansresearch.com/resources/all-blogs/post/security-blog/2023/08/17/error-handling-and-logging-checklist). You don't need to go this far, but it's a great list, if you're curious!

</details>

<details>
  <summary>Linting and formatting</summary>

  We've already put in place automatic tools that help to format your code in a consistent way. This helps others read your code and makes your life easier, too! If you've ever noticed that whitespace or quotes change when you save a file, you've seen Prettier in action. In addition, we've set up a set of "lint" rules which may have caused angry-looking underlines on your code. You can explicitly cause eslint to run and output errors and warnings by running `npm run lint` from the command line. Fix any problems it informs you of, and your code will be that much cleaner.

</details>

<details>
  <summary>Consistent code conventions</summary>

  Similar tasks in your code should be accomplished the same way everywhere. Some examples could be:
  
  - using if/else vs ternaries vs logical conjunctions (&&)
  - using typescript interfaces vs defining types inline
  - using async...await vs .then for asynchronous functions

  If you have an established convention and you find you need to break it for some reason, be sure to include a comment explaining why.

</details>

___

## Cheatsheet

<details>
  <summary>Open cheatsheet</summary>

```tsx
// importing and using the useAuth0 hook
import { useAuth0 } from '@auth0/auth0-react'

function MyComponent() {
  const { isAuthenticated, user, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0()


  // ...
}
```

```tsx
// retrieve access token to give to API functions
  // async/await
  async function handleMyEvent() {
    const token = await getAccessTokenSilently()
    const response = await fetchFromApi(token)
  }

  // or
  // .then/.catch
  function handleMyEvent() {
    getAccessTokenSilently()
      .then((token) => {
        return fetchFromApi(token)
      })
      .then((response) => {/* ... */})
  }
```

```ts
// secure an API route
router.get('/my-protected-route', checkJwt, (req, res) => {
  //                              ^? this is the middleware
  // user is authenticated
  const userId = req.auth?.sub
  // ...
})
```
</details>

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=jwt-auth)
