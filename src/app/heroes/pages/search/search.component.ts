import { Component } from '@angular/core'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { Hero } from '../../interfaces/heroes.interface'
import { HeroesService } from '../../services/heroes.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})

/**
 * @author Kevin Suarez
 */
export class SearchComponent {
  myForm: FormGroup = this._fb.group({
    // eslint-disable-next-line @typescript-eslint/unbound-method
    term: ['', [Validators.required]]
  })

  term = ''
  heroes: Hero[] = []
  heroSelected: Hero | undefined

  constructor(
    private _fb: FormBuilder,
    private _heroesService: HeroesService
  ) {}

  /**
   * Method to seek suggestions from a hero
   */
  search(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.term = String(this.myForm.value.term)
    this._heroesService
      .getSuggestions(this.term.trim())
      .subscribe((heroes: Hero[]) => {
        this.heroes = heroes
      })
  }

  /**
   * Method to search hero by id when the suggestion is already selected
   * @param event
   * @returns
   */
  selectOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.heroSelected = undefined
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const hero: Hero = event.option.value
    this.term = hero.name

    this._heroesService.getHeroById(hero.id!).subscribe((hero: Hero) => {
      this.heroSelected = hero
      this.myForm.reset()
    })
  }
}
