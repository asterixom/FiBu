CREATE TABLE konten (
	id INTEGER PRIMARY KEY,
	name VARCHAR(64) NOT NULL,
	beschreibung VARCHAR(512)
);

CREATE TABLE buchungen (
	buchungsnummer INTEGER GENERATED ALWAYS AS IDENTITY(NOCACHE INCREMENT BY 2) PRIMARY KEY,
	datum DATE NOT NULL,
	name VARCHAR(64) NOT NULL,
	beschreibung VARCHAR(512),
	betrag DOUBLE NOT NULL,
	hauptkonto INTEGER,
	gegenkonto INTEGER,
	
	CONSTRAINT fk_buchungen_hauptkonto FOREIGN KEY (hauptkonto) REFERENCES konten(id),
	CONSTRAINT fk_buchungen_gegenkonto FOREIGN KEY (gegenkonto) REFERENCES konten(id)
);

CREATE TABLE journal (
	journalnummer INTEGER GENERATED ALWAYS AS IDENTITY(INCREMENT BY 2) PRIMARY KEY,
	buchungsnummer INTEGER NOT NULL,
	datum DATE NOT NULL,
	konto INTEGER NOT NULL,
	betrag DOUBLE NOT NULL,
	name VARCHAR(64) NOT NULL,
	
	CONSTRAINT fk_journal_buchung FOREIGN KEY (buchungsnummer) REFERENCES buchungen(buchungsnummer),
	CONSTRAINT fk_journal_konto FOREIGN KEY (konto) REFERENCES konten(id)
);

CREATE TABLE belege (
	belegnummer INTEGER GENERATED ALWAYS AS IDENTITY(MINVALUE 1001 NOCACHE) NOT NULL,
	uuid VARCHAR(64) PRIMARY KEY,
	filetype VARCHAR(64) NOT NULL,
	contenttype VARCHAR(64) NOT NULL,
	filename VARCHAR(64) NOT NULL,
	name VARCHAR(64) NOT NULL,
	beschreibung VARCHAR(512),
	daten BLOB
	
);

CREATE TABLE belegmapping (
	belegnummer INTEGER NOT NULL,
	buchungsnummer INTEGER NOT NULL,
	PRIMARY KEY(belegnummer, buchungsnummer),
	
	CONSTRAINT fk_belegmapping_buchung FOREIGN KEY (buchungsnummer) REFERENCES buchungen(buchungsnummer),
	CONSTRAINT fk_belegmapping_belegnummer FOREIGN KEY (belegnummer) REFERENCES belege(belegnummer)
);