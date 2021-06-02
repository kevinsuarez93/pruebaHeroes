import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

import { Hero } from '../../interfaces/heroes.interface'

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styles: []
})

/**
 * @author Kevin Suarez
 */
export class ConfirmComponent {
  constructor(
    private _dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero
  ) {}

  /**
   * method to eliminate the hero
   */
  delete(): void {
    this._dialogRef.close(true)
  }

  /**
   * method to eliminate the hero
   */
  close(): void {
    this._dialogRef.close()
  }
}
