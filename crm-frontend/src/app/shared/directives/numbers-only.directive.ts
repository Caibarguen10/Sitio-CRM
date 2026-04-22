import { Directive, ElementRef, HostListener } from '@angular/core';

/**
 * Directiva que solo permite números en un input
 * Previene la entrada de cualquier carácter no numérico
 */
@Directive({
  selector: '[appNumbersOnly]',
  standalone: true
})
export class NumbersOnlyDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const initialValue = this.el.nativeElement.value;
    // Remover todo excepto números
    this.el.nativeElement.value = initialValue.replace(/[^0-9]/g, '');
    
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): boolean {
    // Permitir solo números (0-9)
    const charCode = event.which || event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    // Solo pegar números
    const numbersOnly = pastedText.replace(/[^0-9]/g, '');
    document.execCommand('insertText', false, numbersOnly);
  }
}
