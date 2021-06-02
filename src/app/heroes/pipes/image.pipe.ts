import { Pipe, PipeTransform } from '@angular/core'
import { Heroe } from '../interfaces/heroes.interface'

@Pipe({
  name: 'image'
})

/**
 * @author Kevin Suarez
 */
export class ImagePipe implements PipeTransform {
  transform(heroe: Heroe): string {
    if (!heroe.img) {
      return 'assets/no-image.png'
    } else {
      return `assets/heroes/${heroe.img}.png`
    }
  }
}
