import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Buchung } from '../model/buchung.interface';
import { BuchungService } from '../buchung.service';
import { PeriodService } from 'src/app/period.service';

@Component({
  selector: 'app-buchungsliste',
  templateUrl: './buchungsliste.component.html',
  styleUrls: ['./buchungsliste.component.scss']
})
export class BuchungslisteComponent implements OnInit, AfterViewInit{

  displayedColumns = ['buchungsnummer', 'datum', 'name', 'betrag', 'konto']
  // demoDaten: Buchung[] = [
  //   {buchungsnummer: 1, datum: '2022-01-01', name: 'Drogen', betrag: -3420.5426, hauptkonto: {id: 1409, name: 'Bewirtung'}},
  //   {buchungsnummer: 2, datum: '2022-03-05', name: 'Spende für die Jugendarbeit', betrag: 500, hauptkonto: {id: 3255, name: 'Spenden'}},
  //   // {nummer: 999.111, beschreibung: 'Dies ist eine sehr lange Beschreibung, die am Besten zu lang für jedes Browserfenster sein sollte und deshalb keinen Platz mehr hat und umgebrochen werden muss.', wert: 999999.9, konto: 'Das ist ein sehr langes Konto mit einem langen Namen'},
  // ]

  dataSource = new MatTableDataSource<Buchung>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sorter!: MatSort;

  constructor(private router: Router, private service: BuchungService, private periodService: PeriodService) { 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sorter;
  }

  ngOnInit(): void {
    this.periodService.year.subscribe(year=>{
      this.service.buchungen(year+'-01-01',year+'-12-31').subscribe(
        response => this.dataSource.data = response
      );
    });
  }

  clickedRow(row: Buchung){
    this.router.navigateByUrl('/buchung/'+row.buchungsnummer);
  }

  neueBuchung(){
    this.router.navigateByUrl('/buchung/neu');
  }

}