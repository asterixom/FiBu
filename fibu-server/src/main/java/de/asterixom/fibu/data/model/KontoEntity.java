package de.asterixom.fibu.data.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@Entity
@Table(name = "konten")
@AllArgsConstructor
@NoArgsConstructor
public class KontoEntity implements Serializable {

	@Id
	@Column(nullable = false)
	Integer id;
	
	@Column(nullable = false, length = 64)
	String name;
	
	@Column(nullable = true, length = 512)
	String beschreibung;
}
