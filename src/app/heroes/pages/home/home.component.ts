import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

/**
 * @author Kevin Suarez
 */
export class HomeComponent {
  constructor(private _router: Router) {}

  /**
   * Method to exit the application
   */
  logout(): void {
    void this._router.navigate([''])
  }
}
