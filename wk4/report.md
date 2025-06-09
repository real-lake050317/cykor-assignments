# Week 4 Simple MERN Stack Blog Web Application
## TL;DR
* This project is based on MERN stack (MongoDB + Express.js + React.js + Node.js).
* Both frontend and backend are written in Typescript.
* Assignment A: CRUD blog is done.
* Few additional features are implemented
<br></br>

## Quick start
The application is live: [HERE](https://cykor-wk4-jhk.vercel.app) <br></br>
You can also try out the program via the Docker container locally.
<br></br>

## Project Overview
* This repository contains a simple, MERN stack-based blog web app
* The main functionalities include CRUD of posts.
* The application contains additional features such as: Private posts, and add Friends.
* The application runs in a secure environment.
* Note that the design works are fully done by AI, but functionalities, logic, page structures are done solely by the author.
<br></br>

## File Structure
### The wk4 directory of the repository is a mono-repo web application:
* `./client` – The directory for the React.js based frontend.
* `./server` – The directory for the Express.js + MongoDB based backend.
* Docker related files – SQL initialization script that is executed when the MySQL container first starts. It creates the database and defines the structure of the `users` and `posts` tables.
<br></br>

### `server` directory structure
```
./src:
@types          controllers     interfaces      middlewares     models          routes          utils

./src/@types:
FriendRel.d.ts  Post.d.ts       User.d.ts

./src/controllers:
posts   users   utils

./src/controllers/posts:
@types                          deletePost.controller.ts        getPostsByUserId.controller.ts
createPost.controller.ts        getPosts.controller.ts          updatePost.controller.ts

./src/controllers/posts/@types:
CreatePostReqBody.d.ts

./src/controllers/users:
acceptFriendRequest.controller.ts       getUserInfo.controller.ts               removeFriend.controller.ts
getFriendInvitations.controller.ts      login.controller.ts                     sendFriendRequest.controller.ts
getFriendRelation.controller.ts         register.controller.ts
getFriendsList.controller.ts            rejectFriendRequest.controller.ts

./src/controllers/utils:
checkLogin.controller.ts

./src/interfaces:

./src/middlewares:

./src/models:
FriendRel.models.ts     Post.models.ts          User.models.ts

./src/routes:
post.routes.ts  user.routes.ts  util.routes.ts

./src/utils:
verifyToken.ts
```

### `client` directory structure
```
./public:
index.html

./src:
App.css         App.tsx         Components      Constants       Pages           Utils           index.tsx       recoil

./src/Components:
NavBar          PostUpload      PostView

./src/Components/NavBar:
NavBar.css      NavBar.tsx

./src/Components/PostUpload:
PostUpload.css  PostUpload.tsx

./src/Components/PostView:
PostView.css    PostView.tsx    SinglePost

./src/Components/PostView/SinglePost:
SinglePost.css  SinglePost.tsx

./src/Constants:
apiURL.ts

./src/Pages:
LoadingPage     Login           Main            NotFound        Register        UserPage

./src/Pages/LoadingPage:
LoadingPage.css LoadingPage.tsx

./src/Pages/Login:
Login.css       Login.tsx

./src/Pages/Main:
Main.css        Main.tsx

./src/Pages/NotFound:
NotFound.css    NotFound.tsx

./src/Pages/Register:
Register.css    Register.tsx

./src/Pages/UserPage:
UserPage.css    UserPage.tsx

./src/Utils:
Login           Register

./src/Utils/Login:

./src/Utils/Register:

./src/recoil:
atoms.ts
```


## Additional Functionalities
### Add/Remove Friends + Private posts
* User can add/remove friends in the app.
* The server-side logic is handled with the `FriendsRel` model and the controllers under the `/users` api endpoint.
* If two users are friends, they share the private posts

## Deployment
* The backend server is deployed via [render.com](https://render.com)
* The frontend client is deployed via [vercel.app](https://vercel.app)
* The uptime status page can be viewed on: [Uptimerobot](https://stats.uptimerobot.com/cNX7zkwb6a)
* Since the deployment is on the free tier of render.com, to prevent from server going in hibernation after 15 minutes of no interaction, we ping the server every 5 minutes with the uptimerobot.
* There is no need to separately manage DB; it is run on the MongoDB Atlas PaaS.

## Security
* The login sessions and user validation is handled with JWT (jsonwebtoken).
* It does not use external middlewares like passport.js, but it is handled via custom middleware.

## For more info..
**Check the codebase!**
