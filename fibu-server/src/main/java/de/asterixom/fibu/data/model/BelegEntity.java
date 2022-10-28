package de.asterixom.fibu.data.model;

import java.io.Serializable;
import java.sql.Blob;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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
	
	@NotNull
	@Column(nullable = false, length = 64)
	String uuid;
	
	@NotNull
	@Column(nullable = false, length = 64)
	String filetype;
	
	@NotNull
	@Column(nullable = false, length = 64)
	String contenttype;
	
	@NotNull
	@Column(nullable = false, length = 512)
	String filename;
	
	@NotNull
	@Column(nullable = false, length = 64)
	String name;
	
	@Column(nullable = true, length = 512)
	String beschreibung;
	
	@Column(nullable = true)
	Blob daten;
}
