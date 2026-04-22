import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Directiva para formatear número de teléfono mientras se escribe
 * Solo acepta números y formatea automáticamente según el tipo
 */
@Directive({
  selector: '[appPhoneMask]',
  standalone: true
})
export class PhoneMaskDirective {
  constructor(
    private el: ElementRef,
    private control: NgControl
  ) {}

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): boolean {
    const charCode = event.which || event.keyCode;
    
    // Permitir solo números (0-9)
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    let value = this.el.nativeElement.value;
    
    // Remover todo excepto números
    const numbersOnly = value.replace(/\D/g, '');
    
    // Actualizar el valor del control con solo números
    this.control.control?.setValue(numbersOnly, { emitEvent: false });
    
    // Formatear para visualización
    let formatted = '';
    
    if (numbersOnly.length > 0) {
      // Celular colombiano: exactamente 10 dígitos empezando con 3
      if (numbersOnly.startsWith('3') && numbersOnly.length === 10) {
        formatted = numbersOnly.substring(0, 3);
        formatted += ' ' + numbersOnly.substring(3, 6);
        formatted += ' ' + numbersOnly.substring(6, 10);
      }
      // Fijo colombiano: exactamente 7 dígitos, no empieza con 3
      else if (numbersOnly.length === 7 && !numbersOnly.startsWith('3')) {
        formatted = numbersOnly.substring(0, 3);
        formatted += ' ' + numbersOnly.substring(3, 7);
      }
      // Internacional: más de 10 dígitos
      else if (numbersOnly.length > 10) {
        formatted = '+' + numbersOnly;
      }
      // Números en proceso de digitación
      else {
        formatted = numbersOnly;
      }
    }
    
    // Actualizar la visualización
    this.el.nativeElement.value = formatted;
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    
    // Solo pegar números
    const numbersOnly = pastedText.replace(/\D/g, '');
    
    // Actualizar el control
    this.control.control?.setValue(numbersOnly, { emitEvent: false });
    
    // Simular input para formatear
    this.el.nativeElement.value = numbersOnly;
    this.onInput({ target: this.el.nativeElement });
  }

  @HostListener('blur')
  onBlur(): void {
    // Al salir del campo, asegurar que solo números están en el control
    const value = this.el.nativeElement.value;
    const numbersOnly = value.replace(/\D/g, '');
    this.control.control?.setValue(numbersOnly);
  }
}
