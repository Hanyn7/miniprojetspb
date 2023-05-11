import { Component, OnInit } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ParfumService } from '../services/parfum.service';
import { Famille } from '../model/famille.model';

@Component({
  selector: 'app-update-parfum',
  templateUrl: './update-parfum.component.html'
})
export class UpdateParfumComponent implements OnInit {
  familles! : Famille[];
  updatedFamId! : number;




  currentParfum = new Parfum();
  constructor(private activatedRoute: ActivatedRoute,
              private router :Router,
              private parfumService: ParfumService) { }

              ngOnInit(): void {
                this.parfumService.listeFamilles().
                subscribe(fams =>  {console.log(fams);
                  this.familles = fams._embedded.familles;
                  }
                );
                this.parfumService.consulterParfum(this.activatedRoute.snapshot.params['id']).
                subscribe( parf =>{ this.currentParfum = parf;
                this.updatedFamId =this.currentParfum.famille.idFam;
                } ) ;
                }

                updateParfum() {
                  this.currentParfum.famille = this.familles.
                  find(cat => cat.idFam == this.updatedFamId)!;
                  this.parfumService.updateParfum(this.currentParfum).subscribe(prod => {
                  this.router.navigate(['parfums']); }
                  );
                  }

            
}
