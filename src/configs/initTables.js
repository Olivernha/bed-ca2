const pool = require("../services/db");

const bcrypt = require("bcrypt");
//uuid
const {v4: uuidv4} = require('uuid');
const user1_id = uuidv4();
const user2_id = uuidv4();

const saltRounds = 10;

const callback = (error, results, fields) => {
    if (error) {
        console.error("Error creating tables:", error);
    } else {
        console.log("Tables created successfully");
    }
    process.exit();
};

bcrypt.hash("12345678", saltRounds, (error, hash) => {
    if (error) {
        console.error("Error hashing password:", error);
    } else {
        console.log("Hashed password:", hash);

        const SQLSTATEMENT = `
        SET FOREIGN_KEY_CHECKS=0;

      DROP TABLE IF EXISTS User;

  
      CREATE TABLE User (
        user_id CHAR(36) NOT NULl,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        points INT,
        PRIMARY KEY (user_id),
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        
      );

DROP TABLE IF EXISTS quest;
CREATE TABLE quest (
  quest_id int NOT NULL AUTO_INCREMENT,
  title text,
  description text,
  difficulty_level varchar(20),
  reward_points int,
  reward_item_id int,
  PRIMARY KEY (quest_id),
    KEY quest_reward_item_id_id_item_item_id (reward_item_id),
    CONSTRAINT quest_reward_item_id_id_item_item_id FOREIGN KEY (reward_item_id) REFERENCES item (item_id) ON DELETE CASCADE ON UPDATE CASCADE
  
);
DROP TABLE IF EXISTS item;
CREATE TABLE item (
  item_id int NOT NULL AUTO_INCREMENT,
  name text,
  type varchar(50),  -- E.g., weapon, armor, potion, scroll
  description text,
  attributes text,  -- Can store a JSON string representing attributes (strength, magic, etc.)
  effects text,  -- Can store a JSON string representing effects (healing, damage, buffs, etc.)
  rarity varchar(20),
  PRIMARY KEY (item_id)
);

 DROP TABLE IF EXISTS user_quest;
CREATE TABLE user_quest (
 user_quest_id int NOT NULL AUTO_INCREMENT,
  user_id CHAR(36) NOT NULL,
  quest_id INT,
  completed BOOLEAN,
  PRIMARY KEY (user_quest_id),
  KEY uq_user_id_id_user_user_id (user_id),
    KEY uq_quest_id_id_quest_quest_id (quest_id),
    CONSTRAINT uq_quest_id_id_quest_quest_id FOREIGN KEY (quest_id) REFERENCES quest (quest_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_user_id_id_user_user_id FOREIGN KEY (user_id) REFERENCES User (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE IF EXISTS task;

CREATE TABLE task (
    task_id int NOT NULL AUTO_INCREMENT,
    quest_id int DEFAULT NULL,
    description text,
    points int DEFAULT NULL,
    PRIMARY KEY (task_id),
   
    KEY task_quest_id_id_quest_quest_id (quest_id),
    CONSTRAINT task_quest_id_id_quest_quest_id FOREIGN KEY (quest_id) REFERENCES quest (quest_id) ON DELETE CASCADE ON UPDATE CASCADE
  ) ;
  
DROP TABLE IF EXISTS taskprogress;

CREATE TABLE taskprogress (
  progress_id int NOT NULL AUTO_INCREMENT,
  user_id CHAR(36) NOT NULl,
  task_id int NOT NULL,
  completion_date timestamp NULL DEFAULT NULL,
  notes text,
  PRIMARY KEY (progress_id),
  KEY tp_user_id_id_user_user_id (user_id),
  KEY tp_task_id_id_task_task_id (task_id),
  CONSTRAINT tp_task_id_id_task_task_id FOREIGN KEY (task_id) REFERENCES task (task_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT tp_user_id_id_user_user_id FOREIGN KEY (user_id) REFERENCES User (user_id) ON DELETE CASCADE ON UPDATE CASCADE 
) ;
DROP TABLE IF EXISTS MESSAGE;

CREATE TABLE MESSAGE (
  message_id int NOT NULL AUTO_INCREMENT,
  title text,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id CHAR(36) NOT NULL,
  message text,
  PRIMARY KEY (message_id),
  KEY m_user_id_id_user_user_id (user_id),
  CONSTRAINT m_user_id_id_user_user_id FOREIGN KEY (user_id) REFERENCES User (user_id) ON DELETE CASCADE ON UPDATE CASCADE
) ;
   
  INSERT INTO User (user_id, username, email, password, points)
VALUES
  ('${user1_id}', 'admin', 'a@a.com', '${hash}', 0),
  ('${user2_id}', 'rest', 'rest@gmail.com', '${hash}', 0);
      
      
INSERT INTO MESSAGE (title, user_id, message)
VALUES
  ('Message 1 From User 1', '${user1_id}', 'This is the first message for User 1.'),
  ('Message 1 from User 2', '${user2_id}', 'Another message for User 1.'),
  ('Message 2 from User 1', '${user1_id}', 'Yet another message for User 1.'),
  ('Message 2 from User 2', '${user2_id}', 'Adding another message for User 1.'),
  ('Message 3 from User 2', '${user2_id}', 'More content for User 1.'),
  ('Message 3 from User 1', '${user1_id}', 'User 1 receives another message.');

      
   -- Insert dummy data into the 'item' table
INSERT INTO item (name, type, description, attributes, effects, rarity)
VALUES
  ('Sword of Strength', 'weapon', 'A powerful sword that enhances strength.', '{"strength": 10}', '{"damage": 20}', 'Rare'),
  ('Health Potion', 'potion', 'A potion that restores health.', '{"healing": 30}', '{"heal_over_time": 10}', 'Common'),
  ('Mage Robe', 'armor', 'Robe for mages with magical protection.', '{"magic": 15}', '{"buff": "shield"}', 'Legendary'),
  ('Scroll of Fireball', 'scroll', 'A scroll that teaches the Fireball spell.', '{"magic": 20}', '{"damage": 40}', 'Epic'),
  ('Dagger of Agility', 'weapon', 'A quick and agile dagger.', '{"agility": 15}', '{"damage": 25}', 'Uncommon'),
  ('Invisibility Potion', 'potion', 'A potion that grants invisibility.', '{"invisibility": true}', '{"buff": "invisibility"}', 'Rare');

-- Insert dummy data into the 'quest' table
INSERT INTO quest (title, description, difficulty_level, reward_points, reward_item_id)
VALUES
  ('Defeat the Dragon', 'Slay the mighty dragon terrorizing the kingdom.', 'Hard', 100, 1),
  ('Retrieve the Lost Artifact', 'Find and bring back the ancient artifact.', 'Medium', 75, 2),
  ('Clear the Goblin Camp', 'Eliminate the goblin threat in the forest.', 'Easy', 50, 3),
  ('Master the Arcane Trials', 'Complete a series of magical challenges.', 'Hard', 120, 4),
  ('Hunt the Werewolf', 'Track and defeat the werewolf haunting the village.', 'Medium', 90, 5),
  ('Collect Rare Herbs', 'Gather rare herbs for the alchemist in town.', 'Easy', 60, 6);

-- Insert dummy data into the 'task' table
INSERT INTO task (quest_id, description, points)
VALUES
  (1, 'Face the dragon in its lair.', 30),
  (1, 'Search for the dragon''s weakness.', 25),
 
  (2, 'Search for clues about the artifact location.', 20),
    (2, 'Navigate the ancient ruins to find the artifact.', 30),
    (2, 'Escape the ruins with the artifact.', 25),
    
  (3, 'Clear the goblin camp by defeating all goblins.', 15),
    (3, 'Find and destroy the goblin leader.', 25),
    (3, 'Secure the area and report back to the town.', 10),
    (4, 'Solve the riddle of the arcane trials.', 30),
   
  (4, 'Pass the trial of elemental magic.', 40),
  (5, 'Track and locate the werewolf.', 25),
    (5, 'Prepare for the werewolf''s attack.', 20),
   
    (6, 'Explore the forest and find the rare herbs.', 10);
  

      `;

        pool.query(SQLSTATEMENT, callback);
    }
});

// -- Dummy data for taskprogress table
// INSERT INTO taskprogress (user_id, task_id, completion_date, notes) VALUES
// (1, 1, '2023-01-10 10:30:00', 'Task completed successfully'),
// (1, 2, '2023-01-15 14:45:00', 'Dragon defeated!'),
// (2, 3, '2023-02-01 09:00:00', 'Found all the herbs'),
// (2, 4, '2023-02-05 12:00:00', 'Potion brewed successfully'),
// (3, 5, '2023-03-01 18:30:00', 'Wizard''s lair discovered');
