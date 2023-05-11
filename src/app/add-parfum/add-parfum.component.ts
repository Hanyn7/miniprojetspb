import { Component, OnInit } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { ParfumService } from '../services/parfum.service';
import { Famille } from '../model/famille.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-parfum',
  templateUrl: './add-parfum.component.html'
})
export class AddParfumComponent implements OnInit {
  newParfum = new Parfum();
  message: string ="";
  familles! : Famille[];
  newIdFam! : number;
  newFamille! : Famille;


  constructor(private parfumService: ParfumService,
    private router :Router) { }
 
    ngOnInit(): void {
      this.parfumService.listeFamilles().
      subscribe(fams => {console.log(fams);
        this.familles=fams._embedded.familles;
      
      });
      }
    
        addParfum(){
          this.newParfum.famille = this.familles.find(fam => fam.idFam == this.newIdFam)!;
          this.parfumService.ajouterParfum(this.newParfum)
          .subscribe(parf => {
            console.log(parf);
            this.router.navigate(['parfums']);
          });
          }

}

