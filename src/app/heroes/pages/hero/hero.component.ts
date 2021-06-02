import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'

import { HeroesService } from '../../services/heroes.service'
import { Hero } from '../../interfaces/heroes.interface'

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})

/**
 * @author Kevin Suarez
 */
export class HeroComponent implements OnInit {
  hero!: Hero

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
      .pipe(switchMap(({ id }) => this._heroesService.getHeroById(id)))
      .subscribe((hero: Hero) => (this.hero = hero))
  }

  /**
   * Method to return to list the heroes
   */
  return(): void {
    void this._router.navigate(['/heroes/list'])
  }
}
