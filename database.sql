CREATE TABLE "koala" (
   "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(500) NOT NULL,
  "gender" VARCHAR(1),
  "age" VARCHAR(30),
  "ready_to_transfer" VARCHAR(1),
  "notes" VARCHAR(120)
);

INSERT INTO "koala"
("name", "gender", "age", "ready_to_transfer", "notes")
	Values 
	('Scotty', 'M', '4', 'Y', 'Born in Guatemala'),
    ('Jean', 'F', '5', 'Y', 'Allergic to lots of lava'),
    ('Ororo', 'F', '7', 'N', 'Loves listening to Paula (Abdul)'),
    ('Logan', 'M', '15', 'N', 'Loves the sauna'),
    ('Charlie', 'M', '9', 'Y', 'Favorite band is Nirvana'),
    ('Betsy', 'F', '4', 'Y', 'Has a pet iguana');
    
--Both Work--