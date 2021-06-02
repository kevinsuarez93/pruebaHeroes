import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'

import { Heroe } from '../../interfaces/heroes.interface'
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
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    // eslint-disable-next-line @typescript-eslint/unbound-method
    aparicion: ['', [Validators.required, Validators.minLength(3)]],
    // eslint-disable-next-line @typescript-eslint/unbound-method
    bio: ['', [Validators.required, Validators.minLength(3)]],

    // eslint-disable-next-line @typescript-eslint/unbound-method
    casa: ['', [Validators.required]]
  })

  //Catalogo
  editores = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    nombre: '',
    bio: '',
    aparicion: '',
    casa: '',
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
    if (!this._router.url.includes('editar')) {
      return
    }

    this._activatedRoute.params
      .pipe(switchMap(({ id }) => this._heroesService.getHeroeById(id)))
      .subscribe((heroe: Heroe) => {
        this.heroe = heroe
        this.myForm.reset({
          id: heroe.id,
          nombre: heroe.nombre,
          bio: heroe.bio,
          aparicion: heroe.aparicion,
          casa: heroe.casa,
          img: heroe.img
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

    const heroe = <Heroe>this.myForm.value
    if (heroe.id) {
      // Update
      this._heroesService.updateHeroe(heroe).subscribe(() => {
        void this._router.navigate(['/heroes/list'])
        this.showSnakbar('Registro actualizado')
      })
    } else {
      // create
      this._heroesService.addHeroe(heroe).subscribe(() => {
        void this._router.navigate(['/heroes/list'])
        this.showSnakbar('Registro creado')
      })
    }

    this.myForm.reset()
  }

  /**
   * Method to Delete a hero
   */
  deleteHeroe(): void {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: this.heroe
    })
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this._heroesService.deleteHeroe(this.heroe.id!).subscribe(() => {
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
