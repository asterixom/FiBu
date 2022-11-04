CREATE TABLE konten (
	id INTEGER PRIMARY KEY,
	name VARCHAR(64) NOT NULL,
	beschreibung VARCHAR(512)
);

CREATE TABLE buchungen (
	buchungsnummer INTEGER GENERATED ALWAYS AS IDENTITY(NOCACHE INCREMENT BY 1) PRIMARY KEY,
	datum DATE NOT NULL,
	name VARCHAR(64) NOT NULL,
	beschreibung VARCHAR(512),
	betrag DOUBLE NOT NULL,
	hauptkonto INTEGER NOT NULL,
	gegenkonto INTEGER,
	
	CONSTRAINT fk_buchungen_hauptkonto FOREIGN KEY (hauptkonto) REFERENCES konten(id),
	CONSTRAINT fk_buchungen_gegenkonto FOREIGN KEY (gegenkonto) REFERENCES konten(id)
);

CREATE TABLE belege (
	belegnummer INTEGER GENERATED ALWAYS AS IDENTITY(MINVALUE 1001 NOCACHE) NOT NULL,
	uuid VARCHAR(64) PRIMARY KEY,
	filetype VARCHAR(64) NOT NULL,
	contenttype VARCHAR(64) NOT NULL,
	filename VARCHAR(64) NOT NULL,
	name VARCHAR(64) NOT NULL,
	beschreibung VARCHAR(512),
	buchungsnummer Integer,
	daten BLOB,
	
	CONSTRAINT fk_belege_buchung FOREIGN KEY (buchungsnummer) REFERENCES buchungen(buchungsnummer)
);