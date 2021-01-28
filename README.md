## Read Me! (intro)
nSpire Music's goal is to be the social-network where music listeners can go to review and
discover new music. Users can pick any music project and reflect their opinion on it.

This repository is the back-end of the project. The back-end server code
can be found here:
[Back-End](https://github.com/enrique-lol/project2-nspire)

[Deployed Front-End or client](https://enrique-lol.github.io/nspire-music-client/)
[Deployed Back-End or server](https://account.mongodb.com/account/login)


### Technologies Used
- Javascript
- Express
- MongoDB
- Mongoose


## Development Timeline
### Account Functionality
Some default account settings are: signing up, in, out, and changing passwords.

### Post Functionality
Then, the next step was adding user-content features: posts. A user can create, edit the contents, or delete an entire post/review.

## Problem-Solving Strategies
I've found some trouble-shooting or problem-solving Strategies along the way: At the beginning of every function, I would console.log() in order to see if I truly made it to that function. After every API request, I would console.log() it to see what type it is and how to access data inside it.

## Unsolved issues
To delete a post, the user currently has to copy an ID from the "home" page and paste it in the form provided in the "settings" page. The ideal way would be to click a button added in each review/post, but this feature will be implemented at a later date.

## ERD

[erd](https://i.imgur.com/Vre4Un7.png)
