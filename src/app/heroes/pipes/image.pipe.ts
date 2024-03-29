import { Pipe, PipeTransform } from '@angular/core'
import { Hero } from '../interfaces/heroes.interface'

@Pipe({
  name: 'image'
})

/**
 * @author Kevin Suarez
 */
export class ImagePipe implements PipeTransform {
  transform(hero: Hero): string {
    if (!hero.img) {
      return 'assets/no-image.png'
    } else {
      return `assets/heroes/${hero.img}.png`
    }
  }
}
