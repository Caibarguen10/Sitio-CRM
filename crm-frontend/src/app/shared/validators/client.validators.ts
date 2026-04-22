import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator para email más estricto que el de Angular
 * Requiere formato completo: usuario@dominio.extension
 */
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // No validar si está vacío (usar required para eso)
    }

    const value = control.value.toString().trim();
    
    // Patrón más estricto que requiere dominio completo
    // usuario@dominio.extension (ej: test@example.com)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailPattern.test(value)) {
      return { 
        invalidEmail: { 
          message: 'Ingrese un email válido (ejemplo: usuario@dominio.com)' 
        } 
      };
    }

    return null;
  };
}

/**
 * Validator para número de documento colombiano
 * Acepta:
 * - Cédula de Extranjería (6-7 dígitos)
 * - NIT (9 dígitos)
 * - Cédula de Ciudadanía (10 dígitos)
 * - Otros documentos (6-11 dígitos)
 */
export function documentNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // No validar si está vacío (usar required para eso)
    }

    const value = control.value.toString().trim();
    
    // Verificar que solo contiene dígitos
    if (!/^\d+$/.test(value)) {
      return { invalidDocument: { message: 'El documento debe contener solo números' } };
    }

    // Validar que tenga entre 6 y 11 dígitos
    const length = value.length;
    if (length < 6 || length > 11) {
      return { 
        invalidDocument: { 
          message: 'El documento debe tener entre 6 y 11 dígitos' 
        } 
      };
    }

    return null; // Documento válido
  };
}

/**
 * Validator para número de teléfono (solo números internamente)
 * Flexible para diferentes formatos:
 * - Fijo colombiano: 7 dígitos
 * - Celular colombiano: 10 dígitos (empieza con 3)
 * - Internacional: código de país + número (hasta 15 dígitos según ITU-T E.164)
 */
export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // No validar si está vacío (campo opcional)
    }

    const value = control.value.toString().trim();
    
    // Solo debe contener números (las directivas ya previenen otros caracteres)
    if (!/^\d+$/.test(value)) {
      return { 
        invalidPhone: { 
          message: 'El teléfono debe contener solo números' 
        } 
      };
    }

    const length = value.length;

    // Validar que tenga al menos 7 dígitos (fijo) y máximo 15 (estándar internacional)
    if (length < 7 || length > 15) {
      return {
        invalidPhone: {
          message: 'El teléfono debe tener entre 7 y 15 dígitos'
        }
      };
    }

    return null;
  };
}
