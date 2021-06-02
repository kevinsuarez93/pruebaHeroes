import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'

import { HeroesService } from '../../services/heroes.service'
import { Heroe } from '../../interfaces/heroes.interface'

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})

/**
 * @author Kevin Suarez
 */
export class HeroeComponent implements OnInit {
  heroe!: Heroe

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _heroesService: HeroesService,
    private _router: Router
  ) {}

  /**
   * Method to initialize variables and methods
   */
  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(switchMap(({ id }) => this._heroesService.getHeroeById(id)))
      .subscribe((heroe) => (this.heroe = heroe))
  }

  /**
   * Method to return to list the heroes
   */
  return(): void {
    void this._router.navigate(['/heroes/list'])
  }
}
