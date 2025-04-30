  
  CREATE TABLE profile_pictures (
  id INT AUTO_INCREMENT PRIMARY KEY,
  img VARCHAR(255) NOT NULL,
  class VARCHAR(255) NOT NULL,
  user_id INT
);

CREATE TABLE users (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  xp INT DEFAULT 0,
  isConnected BOOLEAN DEFAULT FALSE,
  default_picture VARCHAR(255),
  profile_picture_id INT
);


CREATE TABLE tricks (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    video VARCHAR(255) NOT NULL,
    level VARCHAR(100) NOT NULL,
    xp INT NOT NULL,
    isValidated BOOLEAN DEFAULT FALSE
);

-- insert into tricks(id, name, video, level, xp, isValidated)
-- values(2 , "Kickflip", "url de la vidéo", "Noob", 120, 1);

CREATE TABLE validated_tricks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  trick_id INT NOT NULL,
  validated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- insert into validated_tricks(id, user_id, trick_id, validated_at)
-- values(1, 1, 2 , "2025-04-30");