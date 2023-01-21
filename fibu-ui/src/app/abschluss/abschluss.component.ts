import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abschluss',
  templateUrl: './abschluss.component.html',
  styleUrls: ['./abschluss.component.scss']
})
export class AbschlussComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  journal(){
    this.router.navigate(['abschluss','journal']);
  }

  kontoblaetter(){
    this.router.navigate(['abschluss','kontoblaetter']);
  }

  salden(){
    this.router.navigate(['abschluss','salden']);
  }

}
