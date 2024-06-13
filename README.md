Instructions for how to start your application, including steps to install any
languages/tools, build/compile, and start the application. If we can’t run it, we can’t
grade it!
● A high-level overview of the application
● An explanation of any design decisions that you made
● A short reflection of your work - some questions you may want to (but are not required
to) answer are:
○ Did you learn anything from this project? If so, how might you have done this
differently knowing what you know now?
○ What would you have done differently if you had more time?
○ Did you run into issues during this project? If so, how did solve or work around
them?
○ If you implemented any bonus features, what made you choose them?

## Starting the application

1. Clone this repo on to your computer in a terminal with:
```
git clone https://github.com/huang0h/c4c-challenge-sample.git
```
2. Install npm in a terminal by running `npm install` **at the root of this project**
3. Run `npm run dev` **at the root of this project** to start the app locally
4. Visit `http://localhost:3000` to view the website

## High-level overview
On the frontend, the components folder holds the Dashboard, PartnerTile, and AddForm components. The Dashboard displays the list of partners and a form to add new partners. The useEffect hook runs every time the 'addedPartner' state changes, which happens whenever a partner is added or deleted. The PartnerTile component represents the information of a partner. This includes the partner's name, logo, description, and whether the partner is currently active. It holds a delete button which deletes the partner from the file database and calls onTrigger(true) to notify the Dashboard that a partner has been deleted to reload the correct display of partners. The AddForm component represents the form to add a new partner, including fields for a partner's name, description, active status, and logo. When the form is submitted, handleSubmit creates a FormData object and adds the name, description, active status, and logo (if not null) inputs to it. The handleSubmit function then sends a POST request to the backend with the FormData object. With a successful request, it alerts the user, resets all the form fields, and calls onTrigger(true) to notify the Dashboard that a partner has been added to display the new list of partners.

On the backend, the data folder holds all data for the application. The uploads folder holds all of the partner logos (and when a partner is deleted their logo file is deleted as well). The partners.json file holds all the partner information, including their name, description, active status, and logo url. 

## Design decisions explained


## Reflection
I definitely learned a lot through the process of creating this web application. I have very little experience with React and frontend/backend development.
