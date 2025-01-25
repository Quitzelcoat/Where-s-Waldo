# Where's Waldo

## User Interaction

1. User loads the page.
2. A large photo with hidden characters is displayed.
3. User clicks on the photo.
4. A target box appears at the clicked location.
5. The target box contains dropdown of characters option.
6. User selects a character from the dropdown.
7. The app validates the selection with the backend and provides feedback.
8. If correct mark the location on the photo, so we can't select that character again. And also marks that character
   off the dropdown box.
9. Repeate until all characters are found.

## Backend Flow

1. It stores the coordinates of each character in the image.
2. Backend validates user clicks and tracks time for the sessions.
3. Stores highest score (time and user info).

## Frontend

1. Photo show and handle click events.
2. Show a target box on click with different characters to choose from.
3. When target box showing click away to close the target box.
4. When character chosen show message also telling if it's wrong or correct.
5. On top right it should show time from when the game is started and keep it running until all characters found.
6. Create a seperate page showing all scores of the users playing the game. Only show the top 10 hightest scores.
7. When the user is done playing a game it will be asked its username and once entered the info will go to the backend
   to be saved.
