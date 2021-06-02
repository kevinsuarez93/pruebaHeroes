import { Directive, ElementRef, HostListener } from '@angular/core'
import { NgControl } from '@angular/forms'

@Directive({
  selector: '[appInputUpperCase]'
})
export class InputUpperCaseDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event']) onEvent() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const valueToTransform = String(this.el.nativeElement.value)
    // do something with the valueToTransform
    this.control.control?.setValue(valueToTransform.toUpperCase())
  }

  //Metodo para ngmodel
  /*
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  value: any;

  @HostListener('keydown', ['$event'])
    @HostListener('input', ['$event'])
    onInput(e: any) { 
      this.value = e.target.value.toUpperCase();
      this.ngModelChange.emit(this.value);
      
  }*/
}
