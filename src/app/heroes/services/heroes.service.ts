import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Heroe } from '../interfaces/heroes.interface'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private baseUrl: string = environment.baseUrl

  constructor(private _http: HttpClient) {}

  /**
   * Method to obtain all Heroes
   */
  getHeroes(): Observable<Heroe[]> {
    return this._http.get<Heroe[]>(`${this.baseUrl}/heroes`)
  }

  /**
   * Method to get a hero by id
   * @param id id del heroe
   */
  getHeroeById(id: string): Observable<Heroe> {
    return this._http.get<Heroe>(`${this.baseUrl}/heroes/${id}`)
  }

  /**
   * Method to get suggestions that bring a list of heroes
   * @param term that is entered for the search of the hero
   */
  getSuggestions(term: string): Observable<Heroe[]> {
    return this._http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${term}&_limit=6`)
  }

  /**
   * Method to add a hero
   * @param heroe hero interface to send to save
   */
  addHeroe(heroe: Heroe): Observable<Heroe> {
    return this._http.post<Heroe>(`${this.baseUrl}/heroes`, heroe)
  }

  /**
   * Method to upgrade the hero
   * @param heroe user interface to send it to update
   */
  updateHeroe(heroe: Heroe): Observable<Heroe> {
    return this._http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id!}`, heroe)
  }

  /**
   * Method to remove Hero by id
   * @param id of the hero to eliminate him
   */
  deleteHeroe(id: string): Observable<any> {
    return this._http.delete<any>(`${this.baseUrl}/heroes/${id}`)
  }
}
