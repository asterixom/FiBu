package de.asterixom.fibu.data.model;

import java.io.Serializable;
import java.sql.Blob;

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
@Table(name = "belege")
@AllArgsConstructor
@NoArgsConstructor
public class BelegEntity implements Serializable {

	@Id
	@Column(insertable = false)
	Integer belegnummer;
	
	@Column(nullable = false, length = 64)
	String dateiname;
	
	@Column(nullable = true, length = 256)
	String beschreibung;
	
	@Column(nullable = true)
	Blob daten;
}
