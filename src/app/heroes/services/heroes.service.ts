import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Hero } from '../interfaces/heroes.interface'
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
  getHeroes(): Observable<Hero[]> {
    return this._http.get<Hero[]>(`${this.baseUrl}/heroes`)
  }

  /**
   * Method to get a hero by id
   * @param id id hero
   */
  getHeroById(id: string): Observable<Hero> {
    return this._http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
  }

  /**
   * Method to get suggestions that bring a list of heroes
   * @param term that is entered for the search of the hero
   */
  getSuggestions(term: string): Observable<Hero[]> {
    return this._http.get<Hero[]>(`${this.baseUrl}/heroes?q=${term}&_limit=6`)
  }

  /**
   * Method to add a hero
   * @param hero hero interface to send to save
   */
  addHero(hero: Hero): Observable<Hero> {
    return this._http.post<Hero>(`${this.baseUrl}/heroes`, hero)
  }

  /**
   * Method to upgrade the hero
   * @param hero user interface to send it to update
   */
  updateHero(hero: Hero): Observable<Hero> {
    return this._http.put<Hero>(`${this.baseUrl}/heroes/${hero.id!}`, hero)
  }

  /**
   * Method to remove Hero by id
   * @param id of the hero to eliminate him
   */
  deleteHero(id: string): Observable<any> {
    return this._http.delete<any>(`${this.baseUrl}/heroes/${id}`)
  }
}
