import { Component } from '@angular/core'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { Heroe } from '../../interfaces/heroes.interface'
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
  miFormulario: FormGroup = this._fb.group({
    // eslint-disable-next-line @typescript-eslint/unbound-method
    term: ['', [Validators.required]]
  })

  term = ''
  heroes: Heroe[] = []
  heroeSeleccionado: Heroe | undefined

  constructor(
    private _fb: FormBuilder,
    private _heroesService: HeroesService
  ) {}

  /**
   * Method to seek suggestions from a hero
   */
  search(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.term = String(this.miFormulario.value.term)
    this._heroesService.getSuggestions(this.term.trim()).subscribe((heroes) => {
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
      this.heroeSeleccionado = undefined
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const heroe: Heroe = event.option.value
    this.term = heroe.nombre

    this._heroesService.getHeroeById(heroe.id!).subscribe((heroe) => {
      this.heroeSeleccionado = heroe
      this.miFormulario.reset()
    })
  }
}
