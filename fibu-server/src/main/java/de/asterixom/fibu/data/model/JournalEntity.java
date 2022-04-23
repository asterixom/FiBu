package de.asterixom.fibu.data.model;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@Table(name = "journal")
@AllArgsConstructor
@NoArgsConstructor
public class JournalEntity implements Serializable {

	@Id
	@Column(insertable = false)
	Integer journalnummer;
	
	@Column(nullable = false)
	Integer buchungsnummer;
	
	@Column(nullable = false)
	LocalDate datum;
	
	@Column(nullable = false)
	Integer konto;
	
	@Column(nullable = false)
	Double betrag;
	
	@Column(nullable = false, length = 64)
	String name;
}
