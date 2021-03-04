# Bucketlist for iOS (stopped developing)

A way to store your bucketlist digitally.

Built with React Native (create-react-native-app) and Firebase.

### Installing & review guide
So the previous reviewer had a hard time getting the application up and running. The teachers couldn't get it running either cause they didn't have Xcode nor hard drive space for it, so here are some instructions:

* Only the iOS version works, not android. 
* You need to have Xcode (which is only for macs I guess) as this app only works on it's simulator.

 **Assuming you have Xcode:**
* run `npm i` to install all dependencies
* run `npm react-native start` to start the app
* run `npm react-native run-ios` to start the simulator

**In the likely event you don't get the app running:**
Heres a screencast of me using it. I recommend looking at context.js for reviewing as this is where the juicy stuff is handled.



### Data

All data is persisted within Googles Backend-as-a-Service Firebase. Firebase Auth for authentication purposes and Firestore to handle bucketlist item data.
All user related functionality is built within a context and passed down with providers to avoid propdrilling.

### Hooks

- useState to manage states, views (routing)
- useEffect to rerender components upon certain changes in databases
- useContext to pass user data onto all components

### Features

- Custom name and logo on homescreen
- Fully functioning sign up & login system
- Bucketlist view which lists up all your bucketlist items. Demonstration item upon sign up
- Add view to add a new item to your bucketlist
- Profile view that shows your profile image

### Known bugs

- Bucketlist doesnt rerender after delete until user clicks anywhere on app (react native issue?)
- Login/signup password input field is not a password type for dev purposes
- Not a bug but the app is terribly ugly because I started coding with no endgoal in mind. Won't be doing that again.

### Future goals (cancelled)

- Do a real design for the thing
- Expand view for each bucketlist item
- Edit your profile (image, name, bio)
- Private or public bucketlist items
- Search for other people and their lists.
- Share an item with a spouse/friend
