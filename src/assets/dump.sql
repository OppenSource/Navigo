CREATE TABLE IF NOT EXISTS etudiantable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT,
    email TEXT,
    phone TEXT,
    matricule TEXT,
    cycle TEXT,
    speciality TEXT,
    niveau TEXT
);

INSERT or IGNORE INTO etudiantable(
  id,
  fullname,
  email,
  phone,
  matricule,
  cycle,
  speciality,
  niveau
) VALUES (1, 'Nanyang Brice', 'brice@institutsaintjean.org', '657807309', '2223i393', 'Ingénieur', 'ISI', '4');
