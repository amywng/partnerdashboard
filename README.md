## Starting the application

1. Clone this repo on to your computer in a terminal with:
```
git clone https://github.com/amywng/partnerdashboard.git 
```
2. Install the dependencies as specified below
3. Run `npm run dev` **at the root of this project** to start the app locally
4. Visit `http://localhost:3000` to view the website

## High-level overview
This web application holds an interactive dashboard of partner organizations that lets users view (with priority to active partners), add, and delete partner information. 
The key features include an add form and delete button for each partner. Users can add a new partner by filling out a form with the partner's name, description, logo (with upload), and active status. Users can delete a partner by clicking the corresponding delete button. The page should show the new partner and remove the deleted partner without the need to refresh the page. 
The frontend is built with React to utilize a component-based architecture. These components include the Dashboard for displaying the list of partners and a form for adding new partners, the PartnerTile for individual partner information (including their delete button), and the AddForm for adding new partners. The Dashboard includes a useEffect hook that runs every time the 'updatedPartners' state changes. This state is triggered and changed to true any time a partner is added or deleted, and reset to false in the useEffect hook. This application uses CSS Flexbox and Grid layouts.
The backend is built with Express and uses Multer middleware to handle partner logo file uploads. The partner information is stored in a JSON file and the partner logos are stored in an uploads folder (and are deleted from that folder when a partner is deleted). POST /submit handles adding new partners by reading the JSON file and adding the received data to it. POST /button handles deleting partners by removing the specified partner from the JSON file and its corresponding image from the uploads folder.

## Design decisions explained
Storing partner data in JSON file
I decided to store the partner data in a JSON file because of ease of implementation and the flexibility it offered with reading and writing the file in the code as POST requests were sent, as well as having the data persist when the app is restarted. However, this solution is not very scalable if multiple backend processes can run and potentially manipulate the file at the same time. If that's the case, I would change this data storage to a database.

Storing partner logos as files in the backend
I decided to store the partner logos as files instead of holding their links to ensure the availability of the files and manage who can access them. Using Multer allowed me to customize the name of the files and specify the storage location so I could also easily delete them from the folder if the partner was deleted.

Dashboard useEffect dependent on updatedPartners state
I added a dependency to the Dashboard component useEffect called updatedPartners, which I passed down to both the AddForm and PartnerTile component. For the PartnerTile component, a successful delete would set this state to true, and for the AddForm component, a successful submit would set this state to true. I added this dependency so that the page would display the accurate list of partners after one was added or removed without the need to refresh. I also added a delay in the POST /submit to ensure (mostly) that the image and partner data for a newly added partner would show up without a refresh.

## Reflection
I definitely learned a lot through the process of creating this web application. I have very little experience with web development, and have used React and Express only briefly, if at all. The starter code helped a lot as a starting point to learn some basic syntax and abilties of React. I learned how to insert Javascript with curly brackets, a lot about Express routing, Hooks such as useEffect and useState (and state variables), and more. 
The process I went through to learn these things was very one step at a time, and I gradually gained more understanding as I added more functionality to my code. I started every new implementation by applying the concepts from the starter code and finding solutions for what I was trying to do online, which required a lot of revision to fix the solutions to work with my implementation. 
Knowing what I know now, I wish I had read more before starting about the concepts and fundamentals of how these parts worked and the sequence of events with user interaction. Going into this project with that knowledge would've lessened the process of backtracking and not knowing what was wrong with my code. 
Many of my issues revolved around this lack of fundamental skills, and I worked around them by finding documentation/guides online as well as VSCode's debuggers and simulating the action I was trying to achieve. Debugging was a really helpful way to observe the console and specific variables to find the root of the problem and where it was occurring. 
I implemented the bonus feature of writing the partner data to file storage because I found it easier and more organized to separate the code that way. It was more of how I thought to implement the requirement of storing the partner information in a central place and finding out it was a bonus feature later than a purposeful addition later on.

___________________________________________________________________________________________________________

This is the starter code for Code4Community's technical challenge for Fall 2024. 
For more detailed information about each of the parts of this starter code, check out the [`INFO.md`](INFO.md) file

## Prerequisites

If you don't have them already, you'll need to install Node.js/NPM and Git:
- Node.js + NPM - install [here](https://nodejs.org/en/download/package-manager) (we highly recommend using at least Node 18.0.0 + NPM 8.6.0)
   - You can choose to install via the command line under "Package Manager", or download an installer under "Prebuilt Installer"
   - Node and NPM are installed together
- Git - install [here](https://git-scm.com/downloads)

## Setup Instructions

1. Clone this repo on to your computer. You can do so with the [desktop app](https://desktop.github.com/), or in a terminal with the following:
```
git clone https://github.com/huang0h/c4c-challenge-fall-2024.git
```
2. In a terminal, run `npm install` **at the root of this project** to install the required packages
3. Run `npm run dev` **at the root of this project** to start the app locally
4. Visit `http://localhost:3000` to view the website
    
    4a. The backend will be available at `http://localhost:4000`