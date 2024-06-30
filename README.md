# Game Task Tracker 

Welcome to theGame Task Tracker , where the program allows you to join quests, do tasks and see magical items in a  setting.

## Table of Contents
1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)

2. [Frontend Implementation](#frontend-implementation)
   - [Quest Interaction](#quest-interaction)
   - [Task Completion](#task-completion)
   - [Quest Completion](#quest-completion)
   - [Character Progression and Inventory](#character-progression-and-inventory)
   - [Item Interaction](#item-interaction)

3. [Endpoints](#endpoints)
   - [User](#user)
   - [Quest](#quest)
   - [Characters](#characters)
   - [Task](#task)
   - [Task Progress](#task-progress)
   - [UserQuest](#user-quest)
   - [Item](#item)

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- MySQL database.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ST0503-BED/bed-ca2-Olivernha.git
   ```
2. Navigate to the project directory:
   ```bash
   cd bed-ca2-Olivernha
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your MySQL database and update the database configuration in `config.js`.
5. Run the application:
   ```bash
   npm start
   ```
   The API will be accessible at `http://localhost:3000`.

## Frontend Implementation

In the Game Task Tracker frontend, users can seamlessly engage with the quests, tasks, and magical items in a visually immersive setting.

### Quest Interaction
Users can easily join quests by navigating to the "Quests" section. Upon selecting a quest, detailed information about the quest's objectives and associated tasks becomes accessible. This allows users to make informed decisions about which quests to embark on.

### Task Completion
For each quest, users can view the list of tasks required for completion. The user-friendly interface enables them to mark individual tasks as completed once finished. As tasks are completed, progress is visually tracked, providing a satisfying sense of achievement.

### Quest Completion
Once all tasks associated with a quest are completed, the quest automatically moves to the "Completed" column. Users can view their accomplished quests and relish the satisfaction of their in-game progression.

### Item Interaction
The "Inventory" section allows users to view the magical items they have collected throughout their journey. Each item is accompanied by a detailed description, providing users with a sense of the magical world they are exploring.

This frontend implementation enhances user engagement by providing a seamless and intuitive experience, making the Game Task Tracker a delightful platform for managing quests, tasks, and character progression.



## Endpoints

### User
- **GET /user/:userId**: Retrieve user details.
- **POST /user**: Create a new user.
- **PUT /user/:userId**: Update user information.
- **DELETE /user/:userId**: Delete a user.

### Quest
- **GET /quest/:questId**: Get quest details.
- **GET /quests**: Get a list of all quests.
- **POST /quest**: Create a new quest.
- **PUT /quest/:questId**: Update quest details.
- **DELETE /quest/:questId**: Delete a quest.

### Task
- **GET /task/:taskId**: Get task details.
- **GET /tasks**: Get a list of all tasks.
- **POST /task**: Create a new task.
- **PUT /task/:taskId**: Update task details.
- **DELETE /task/:taskId**: Delete a task.

### Task Progress
- **GET /taskprogress/:progressId**: Get task progress details.
- **GET /taskprogress**: Get a list of all task progress records.
- **POST /taskprogress**: Record task progress.
- **PUT /taskprogress/:progressId**: Update task progress details.
- **DELETE /taskprogress/:progressId**: Delete a task progress record.

### UserQuest
- **GET /userquest/:userQuestId**: Get user quest details.
- **GET /userquests**: Get a list of all user quests.
- **POST /userquest**: Create a new user quest.
- **PUT /userquest/:userQuestId**: Update user quest details.
- **DELETE /userquest/:userQuestId**: Delete a user quest.
- **GET /user/:userId/quests**: Get a list of quests for a specific user.
- **GET /quest/:questId/users**: Get a list of users for a specific quest.
- **GET /user/:userId/quest/:questId**: Get user quest details for a specific user and quest.

### Item
- **GET /item/:itemId**: Get item details.
- **GET /items**: Get a list of all items.
- **POST /item**: Create a new item.
- **PUT /item/:itemId**: Update item details.
- **DELETE /item/:itemId**: Delete an item.

Feel free to explore the API and embark on a journey of game task tracker!