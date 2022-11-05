package de.asterixom.fibu.data.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@Entity
@Table(name = "buchungen")
@AllArgsConstructor
@NoArgsConstructor
public class BuchungsEntity implements Serializable {
	
	@Id
	@Column(insertable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer buchungsnummer;
	
	@Column(nullable = false)
	LocalDate datum;
	
	@Column(nullable = false, length = 64)
	String name;
	
	@Column(nullable = false, length = 512)
	String beschreibung;
	
	@Column(nullable = false)
	Double betrag;
	
	@ManyToOne
	@JoinColumn(name="hauptkonto", nullable=false)
	KontoEntity hauptkonto;
	
	@ManyToOne
	@JoinColumn(name="gegenkonto", nullable=true)
	KontoEntity gegenkonto;
	
	@EqualsAndHashCode.Exclude
	@OneToMany(mappedBy="buchung")
	Set<BelegEntity> belege;
}
