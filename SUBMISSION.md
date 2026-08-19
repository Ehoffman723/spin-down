# BBX Leaderboards

## How to Run

Make sure you have Node.js 24.16 or newer installed.

Clone the repository and navigate into the project folder.

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

http://localhost:3000/

To create a production build:

```bash
npm run build
npm run preview
```

## Time Spent

I spent roughly 4-4.5 hours working on this project

I mainly focused on getting the functionality of the frontend working. Getting the info from the JSON to appear properly on screen was the goal. After that since I had time I was able to improve upon the UI of the frontend.

## Assumptions and Scope

I focused on the main requirements of the challenge rather than trying to build a complete leaderboard platform.

I included:

- Leaderboard browsing
- Leaderboard search
- Individual leaderboard pages
- Leaderboard banner images and descriptions
- Supported formats
- Related tournaments
- Player rankings and statistics
- Player avatars and countries
- Basic responsive support for desktop and mobile

I kept tournaments as information within the leaderboard detail page rather than creating separate tournament pages.

## Stack

- **Frontend: React, TypeScript, Tailwind CSS, React Router**
- **Backend: Nitro API provided by the challenge starter**
- **Database: No database. The application uses the provided challenge data through the API.**

## What I Built

I have created a frontend for the purpose of browsing the World Beyblade Organizations leaderboards.

The home page loads the available leaderboards based on the provided API. The users are able to search through them and select the one that they would like to view.

The leaderboard is then opened using is related slug to reveal the imporant information like tournaments, format, and player count. 
Scrolling down will bring the user to the player rankings which contains player name, country, elo, and win/loss.

## What I'd Do With More Time

I would love to improve on the UI by increase the interaction with the leaderboard selection. I didnt find the mobile version does also have a problem with info getting smushed so improving on the layout for mobile.

Other improvements could be:
- Adding player detail page
- Different types of sorting for rankings
- Having filtering options for different format types

