import { Component, Input } from '@angular/core'
import { Heroe } from '../../interfaces/heroes.interface'

@Component({
  selector: 'app-heroe-card',
  templateUrl: './heroe-card.component.html',
  styleUrls: ['./heroe-card.component.css']
})

/**
 * @author Kevin Suarez
 */
export class HeroeCardComponent {
  @Input() heroe!: Heroe
}
