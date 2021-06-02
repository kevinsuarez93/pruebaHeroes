import { Component, Input } from '@angular/core'
import { Hero } from '../../interfaces/heroes.interface'

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})

/**
 * @author Kevin Suarez
 */
export class HeroCardComponent {
  @Input() hero!: Hero
}
