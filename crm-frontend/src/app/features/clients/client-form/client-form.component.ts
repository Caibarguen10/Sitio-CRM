import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models/client.model';
import { PhoneMaskDirective } from '../../../shared/directives/phone-mask.directive';
import { NumbersOnlyDirective } from '../../../shared/directives/numbers-only.directive';
import { documentNumberValidator, phoneValidator, emailValidator } from '../../../shared/validators/client.validators';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    PhoneMaskDirective,
    NumbersOnlyDirective
  ],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  loading = false;
  isEditMode = false;
  clientId: number | null = null;
  pageTitle = 'Nuevo Cliente';

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      documentNumber: ['', [Validators.required, documentNumberValidator()]],
      email: ['', [Validators.required, emailValidator()]],
      phone: ['', [phoneValidator()]],
      address: ['']
    });
  }

  ngOnInit(): void {
    // Detectar modo edición
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.clientId = +id;
      this.pageTitle = 'Editar Cliente';
      this.loadClient(this.clientId);
    }
  }

  loadClient(id: number): void {
    this.loading = true;
    this.clientService.getClientById(id).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.clientForm.patchValue(response.data);
        }
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Error al cargar el cliente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/clients']);
      }
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.loading = true;
      const clientData = this.clientForm.value;

      const operation = this.isEditMode
        ? this.clientService.updateClient(this.clientId!, clientData)
        : this.clientService.createClient(clientData);

      operation.subscribe({
        next: (response) => {
          this.loading = false;
          if (response.success) {
            const message = this.isEditMode 
              ? 'Cliente actualizado correctamente' 
              : 'Cliente creado correctamente';
            this.snackBar.open(message, 'Cerrar', { duration: 3000 });
            this.router.navigate(['/clients']);
          }
        },
        error: (error) => {
          this.loading = false;
          this.snackBar.open('Error al guardar el cliente', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/clients']);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.clientForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('email')) {
      return 'Email inválido';
    }
    if (field?.hasError('invalidEmail')) {
      return field.errors?.['invalidEmail'].message;
    }
    if (field?.hasError('minlength')) {
      return `Mínimo ${field.errors?.['minlength'].requiredLength} caracteres`;
    }
    if (field?.hasError('invalidDocument')) {
      return field.errors?.['invalidDocument'].message;
    }
    if (field?.hasError('invalidPhone')) {
      return field.errors?.['invalidPhone'].message;
    }
    return '';
  }
}
