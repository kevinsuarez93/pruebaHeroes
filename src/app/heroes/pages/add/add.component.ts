import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'

import { Hero } from '../../interfaces/heroes.interface'
import { HeroesService } from '../../services/heroes.service'
import { ConfirmComponent } from '../../components/confirm/confirm.component'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

/**
 * @author Kevin Suarez
 */
export class AddComponent implements OnInit {
  myForm: FormGroup = this._fb.group({
    // eslint-disable-next-line @typescript-eslint/unbound-method
    name: ['', [Validators.required, Validators.minLength(3)]],
    // eslint-disable-next-line @typescript-eslint/unbound-method
    appearance: ['', [Validators.required, Validators.minLength(3)]],
    // eslint-disable-next-line @typescript-eslint/unbound-method
    bio: ['', [Validators.required, Validators.minLength(3)]],

    // eslint-disable-next-line @typescript-eslint/unbound-method
    home: ['', [Validators.required]],
    id: ['', []]
  })

  //Catalogue
  editors = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  hero: Hero = {
    id: '',
    name: '',
    bio: '',
    appearance: '',
    home: '',
    img: ''
  }

  constructor(
    private _heroesService: HeroesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _fb: FormBuilder
  ) {}

  /**
   * Method to initialize variables and methods
   */
  ngOnInit(): void {
    if (!this._router.url.includes('edit')) {
      return
    }

    this._activatedRoute.params
      .pipe(switchMap(({ id }) => this._heroesService.getHeroById(id)))
      .subscribe((hero: Hero) => {
        this.hero = hero
        this.myForm.reset({
          id: hero.id,
          name: hero.name,
          bio: hero.bio,
          appearance: hero.appearance,
          home: hero.home,
          img: hero.img
        })
      })
  }

  /**
   * Method to validate the fields
   * @param field field for validation
   * @returns
   */
  validateField(field: string): boolean {
    return (
      !!this.myForm.controls[field].errors &&
      this.myForm.controls[field].touched
    )
  }

  /**
   * Method to save a hero
   */
  save(): void {
    if (this.myForm.invalid) {
      this.showSnakbar('Formulario Invalido')
      this.myForm.markAllAsTouched()
      return
    }

    const hero = <Hero>this.myForm.value
    if (hero.id) {
      // Update
      this._heroesService.updateHero(hero).subscribe(() => {
        void this._router.navigate(['/heroes/list'])
        this.showSnakbar('Registro actualizado')
      })
    } else {
      // create
      this._heroesService.addHero(hero).subscribe(() => {
        void this._router.navigate(['/heroes/list'])
        this.showSnakbar('Registro creado')
      })
    }

    this.myForm.reset()
  }

  /**
   * Method to Delete a hero
   */
  deleteHero(): void {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: this.hero
    })
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this._heroesService.deleteHero(this.hero.id!).subscribe(() => {
          void this._router.navigate(['/heroes'])
        })
      }
    })
  }

  /**
   * Method to Show a PopUp
   */
  showSnakbar(mensaje: string): void {
    this._snackBar.open(mensaje, 'ok!', {
      duration: 2500
    })
  }
}
