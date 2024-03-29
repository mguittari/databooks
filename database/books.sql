CREATE TABLE book(
    id INT PRIMARY KEY auto_increment,
    title VARCHAR(100),
    year VARCHAR(4),
    category VARCHAR(50),
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES author(id)
);

CREATE TABLE author(
    id INT PRIMARY KEY auto_increment,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    birthday DATE,
    country VARCHAR(50),
    is_dead BOOLEAN
);

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  hash_password VARCHAR(255),
  role ENUM("visitor", "librarian", "admin") DEFAULT "visitor",
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO author(firstname, lastname, birthday, country, is_dead)
VALUES ("John", "Steinbeck", "1902-02-27", "USA", 1),
("Henry", "Miller", "1891-12-26", "USA", 1),
("Gertrude", "Stein", "1874-02-03", "USA", 1),
("Virginia", "Woolf", "1982-01-25", "England", 0),
("Michel", "Houellebecq", "1956-02-26", "France", 0),
("James", "Joyce", "1882-02-02", "Ireland", 1),
("William", "Burroughs", "1914-05-02", "USA", 1),
("Eleanor", "Catton", "1985-09-24", "New Zealand", 0),
("James Graham", "Ballard", "1930-11-15", "England", 1),
("Roberto", "Bolaño", "1953-04-28", "Mexico", 1),
("Marguerite", "Duras", "1914-04-04", "France", 1),
("Philip", "K. Dick", "1928-12-16", "USA", 1);


INSERT INTO book(title, year, category, author_id)
VALUES ("The Years","1937", "Novel", 4),
("The Waves", "1931", "Novel", 4),
("East of Eden", "1952", "Novel", 1),
("Cannery Row", "1945", "Novel", 1),
("The Grapes of Wrath", "Novel", "1939", 1),
("Tender Buttons", "Poetry", "1914", 3),
("Sexus", "1945", "Novel", 2),
("Plexus", "1952", "Novel", 2),
("La Carte et le Territoire","2010", "Novel",  5),
("Extension du domaine de la lutte", "1994", "Novel", 5),
("Ulysses", "1920", "Novel", 6);


