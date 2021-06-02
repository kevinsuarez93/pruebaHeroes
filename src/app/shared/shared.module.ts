import { NgModule } from '@angular/core'
import { InputUpperCaseDirective } from './directives/input-upper-case.directive'

@NgModule({
  declarations: [InputUpperCaseDirective],
  exports: [InputUpperCaseDirective]
})
export class SharedModule {}
