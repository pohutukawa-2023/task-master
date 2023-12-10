# Task Master App

### Get assigned important tasks. Complete, track, see results.

Task Master is a mobile app designed to streamline the communication and task management between physiotherapists and their clients. The app allows physiotherapists to assign various tasks to their clients, ranging from breathing exercises to yoga and strength workouts. Clients can easily track and complete assigned tasks, while both clients and physiotherapists have access to insightful statistics to monitor progress.

## Features

- **Task Assignment**: Physiotherapists can create and assign tasks to clients, specifying details such as exercise type, duration, and frequency.
- **Task Completion Tracking**: Clients can mark tasks as completed, providing real-time feedback to physiotherapists about their adherence to the prescribed exercises.
- **Statistics and Progress Monitoring**: Detailed statistics and visualizations enable both physiotherapists and clients to monitor progress over time, fostering engagement and motivation.
- **QR Code Scanning:** Physiotherapists can easily connect with clients by scanning their QR codes, streamlining the onboarding process.
- **Auth0 Integration:** Secure user authentication and authorization using Auth0. Manage user identities, enable single sign-on, and enhance the overall security of the application.

## Screenshots

![Screenshot of client view](/public/taskmaster.png)
Screenshot of client view

## Tech stack
- Node.js
- Vite
- React
- ReactQuery
- TypeScript
- Tailwind CSS
- Knex
- SQLite3
- Express
- Superagent
- Vitest
- Auth0
- Chart.js


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/pohutukawa-2023/task-master.git
    cd task-master
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run database migrations:

    ```bash
    npm run knex migrate:latest
    ```

### Running the app
4. To start the app in development mode, run:

    ```bash
    npm run dev
    ```

<!-- # User stories

- [] As a user, I want to be able to log in and personal account and see my name somewhere
- [] As a user, I want to see the home page, then sign in
- [] As a user, I want to create, edit and delete my own tasks - stretch 
- [] As a user, I want to be able to set daily, weekly, monthly view
- [] As a user, I want buttons of my tasks, to be able to press them and complete a daily task
- [] As a user, I shouldn't be able to delete a task assigned to me by an admin
- [] As a user, I want to see a lock on tasks I can't delete
- [] As a user, I want to be able to see my own stats - stretch
- [] As a user, I want to distinguish where each of the tasks are coming from
- [] As a user, I want notifications for when I need to do each task
- [] As a user, I want a minimalistic app
- [] As a user, I want a mobile phone app

- [] As an admin, I want my own view of tasks I can pick
- [] As an admin, I want to see a client list and their stats
- [] As an admin, I want to be able to assign tasks to a specific client
- [] As an admin, I want a view of all the tasks
- [] As an admin, I want to be able to assign tasks to certain dates
- [] As an admin, I want to be able to add a new client
- [] As an admin, I want this private data to be protected
- [] As an admin, I want a desktop view
- [] As an admin, I want to be able to use a QR code to access my client's page
- [] As an admin, I 

- [] I want to run WAVE and have no errors
- [] I want to run lighthouse and have above 90% performance
- [] I want at least 20 unit tests to pass

- [] I want the following features:
  - [] meditation 
  - [] breathe 
  - [] 


## Styles

Colour Palette 

white - #FFFBF5 (primary)
beige - #F7EFE5 (primaryBeige)
lilac - #C3ACD0 (lightPurple)
purple - #7743DB (darkPurple)
navy - #0A0047 (darkNavy)
#F27C7C (warning)

Fonts

title - chunk five and pontiac
body - Pontiac
logo - Lucidity condensed


## MVP 

- Authentication for client/admin with authorisation for admin only access
- Ability to make/delete/edit tasks for client (admin only)
- Ability to receive and complete tasks (client)
- Displays on a phone (mobile first styling)
- Ability to search for existing clients
- Client/admin is able to register for account
- Display dashboard down the bottom to link to other pages
- Deploy our app
- Do 20 tests

// patch for client side - xavier
// editing task admin - pathik
// add tasks admin - david

// 1 - admin only fix (me)
// 2 - dave and pathik
// 3 - xavier
// 4 - displays on a phone -kirsty
// 5 - use id to get a client - david (type the username)
// 6 - create an admin button - david
// 7 - display dashboard -kirsty
// 8 - deploy
// 9 - do 20 tests - all

// stats - display the stats - kirsty

## Canva

https://www.canva.com/design/DAF1ghbFOtc/pi2yHcM0OICUMSrxah55Lw/edit?utm_content=DAF1ghbFOtc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton -->