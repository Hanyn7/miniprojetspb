import { Component, OnInit } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { ParfumService } from '../services/parfum.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html'
})
export class RechercheParNomComponent implements OnInit {
  nomParfum!: string;
  parfums!: Parfum[];
  allParfums!: Parfum[];
  searchTerm!: string;

  constructor(private parfumService: ParfumService) { }

  ngOnInit(): void {
    this.parfumService.listeParfum().subscribe(prods => {
      console.log(prods);
      this.parfums = prods;
    });
  }

  onKeyUp(filterText : string){
    this.parfums = this.allParfums.filter(item =>
    item.nomParfum.toLowerCase().includes(filterText));
    }

  rechercherProds() {
    this.parfumService.rechercherParNom(this.nomParfum)
      .subscribe(parfs => {
        this.parfums = parfs; 
        console.log(parfs);
      });
  }
}
