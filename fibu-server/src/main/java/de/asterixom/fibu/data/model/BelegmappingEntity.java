package de.asterixom.fibu.data.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@Table(name = "belegmapping")
@IdClass(BelegmappingEntity.class)
@AllArgsConstructor
@NoArgsConstructor
public class BelegmappingEntity implements Serializable {

	@Id
	@Column(nullable = false)
	Integer belegnummer;
	
	@Id
	@Column(nullable = false)
	Integer buchungsnummer;
}