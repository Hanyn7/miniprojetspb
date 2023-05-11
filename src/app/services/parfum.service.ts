import { Injectable } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { Famille } from '../model/famille.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FamilleWrapper } from '../model/FamilleWrapped.model';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };

@Injectable({
  providedIn: 'root'
})
export class ParfumService {
  parfums :  Parfum[] =[];
  familles : Famille[];
  apiURL: string = 'http://localhost:8080/parfums/api';
  apiURLFam: string = 'http://localhost:8080/parfums/fam';
  constructor(private http : HttpClient) {
 this.familles = [ {idFam : 1, nomFam : "florale"},
  {idFam : 2, nomFam : "oud"}];
  /*this.parfums = [
  { idParfum : 1, nomParfum : "Dior", prixParfum : 330,
  dateCreation : new Date("12/09/2011"), famille : {idFam : 1, nomFam : "florale"}},
  { idParfum : 2, nomParfum : "Chanel", prixParfum : 1000,
  dateCreation : new Date("04/01/2011"), famille : {idFam : 1, nomFam : "florale"}},
  { idParfum : 3, nomParfum : "Escandale", prixParfum : 2500,
  dateCreation : new Date("11/02/2011"), famille : {idFam : 1, nomFam : "oud"}},];*/
}

  listeParfum():Observable<Parfum[]> {
    return this.http.get<Parfum[]>(this.apiURL);
  }

  
  ajouterParfum( parf: Parfum):Observable<Parfum>{
    return this.http.post<Parfum>(this.apiURL, parf, httpOptions);
}


supprimerParfum( id: number){
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
    
  }


consulterParfum(id:number): Observable<Parfum>{
  const url = `${this.apiURL}/${id}`;
  return this.http.get<Parfum>(url);      
  }

 

  updateParfum(prod :Parfum) : Observable<Parfum>
{
return this.http.put<Parfum>(this.apiURL, prod, httpOptions);
}

  trierParfums(){
    this.parfums = this.parfums.sort((n1,n2) => {
    if (n1.idParfum! > n2.idParfum!) {
    return 1;
    }
    if (n1.idParfum! < n2.idParfum!) {
    return -1;
    }
    return 0;
    });
    }

    listeFamilles():Observable<FamilleWrapper> {
      return this.http.get<FamilleWrapper>(this.apiURLFam);
    }
    

      consulterFamille(id:number): Famille{
        return this.familles.find(fam => fam.idFam == id)!;
        }

        rechercherParFamille(idFam: number):Observable< Parfum[]> {
          const url = `${this.apiURL}/prodscat/${idFam}`;
          return this.http.get<Parfum[]>(url);
          } 
    
          rechercherParNom(nom: string):Observable< Parfum[]> {
            const url = `${this.apiURL}/prodsByName/${nom}`;
            return this.http.get<Parfum[]>(url);
            }


            ajouterFamille( fam: Famille):Observable<Famille>{
              return this.http.post<Famille>(this.apiURLFam, fam, httpOptions);
              }
        
}


