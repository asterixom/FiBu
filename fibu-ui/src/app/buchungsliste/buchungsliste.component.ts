import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Buchung } from './buchung.interface';

@Component({
  selector: 'app-buchungsliste',
  templateUrl: './buchungsliste.component.html',
  styleUrls: ['./buchungsliste.component.scss']
})
export class BuchungslisteComponent implements OnInit, AfterViewInit{

  displayedColumns = ['nummer', 'datum', 'beschreibung', 'wert', 'konto']
  demoDaten: Buchung[] = [
    {nummer: 1, datum: '2022-01-01', beschreibung: 'Drogen', wert: -3420.5426, konto: {nummer: 1409, name: 'Bewirtung'}},
    {nummer: 2, datum: '2022-03-05', beschreibung: 'Spende für die Jugendarbeit', wert: 500, konto: {nummer: 3255, name: 'Spenden'}},
    // {nummer: 999.111, beschreibung: 'Dies ist eine sehr lange Beschreibung, die am Besten zu lang für jedes Browserfenster sein sollte und deshalb keinen Platz mehr hat und umgebrochen werden muss.', wert: 999999.9, konto: 'Das ist ein sehr langes Konto mit einem langen Namen'},
  ]

  dataSource = new MatTableDataSource<Buchung>(this.demoDaten);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sorter!: MatSort;

  constructor(private router: Router) { 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sorter;
  }

  ngOnInit(): void {
  }

  clickedRow(row: Buchung){
    this.router.navigateByUrl('/buchung/'+row.nummer);
  }

  neueBuchung(){
    this.router.navigateByUrl('/buchung/neu');
  }

}