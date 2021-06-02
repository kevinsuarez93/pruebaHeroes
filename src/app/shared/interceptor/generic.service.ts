import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BlockUI, NgBlockUI } from 'ng-block-ui'
import { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { HeroesService } from '../../heroes/services/heroes.service'

@Injectable()
export class GenericService implements HttpInterceptor {
  @BlockUI() blockUI!: NgBlockUI
  constructor(public heroesService: HeroesService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.startProcess()
    return next.handle(req).pipe(
      finalize(() => {
        this.stopProcess()
      })
    )
  }

  /**
   * method to start the process
   */
  startProcess(): void {
    this.blockUI.start('Cargando...')
  }

  /**
   * method to stop the process
   */
  stopProcess(): void {
    this.blockUI.stop()
  }
}
