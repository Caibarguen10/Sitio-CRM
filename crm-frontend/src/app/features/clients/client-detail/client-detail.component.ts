import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { ClientService } from '../../../core/services/client.service';
import { ContactService } from '../../../core/services/contact.service';
import { NoteService } from '../../../core/services/note.service';
import { OpportunityService } from '../../../core/services/opportunity.service';
import { Client } from '../../../core/models/client.model';
import { Contact } from '../../../core/models/contact.model';
import { Note } from '../../../core/models/note.model';
import { Opportunity } from '../../../core/models/opportunity.model';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  client: Client | null = null;
  contacts: Contact[] = [];
  notes: Note[] = [];
  opportunities: Opportunity[] = [];
  loading = false;
  clientId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private contactService: ContactService,
    private noteService: NoteService,
    private opportunityService: OpportunityService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clientId = +id;
      this.loadClientData();
    } else {
      this.router.navigate(['/clients']);
    }
  }

  loadClientData(): void {
    this.loading = true;
    
    // Cargar información del cliente
    this.clientService.getClientById(this.clientId).subscribe({
      next: (response) => {
        if (response.success) {
          this.client = response.data;
        }
        this.loadContactos();
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Error al cargar el cliente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/clients']);
      }
    });
  }

  loadContactos(): void {
    this.contactService.getContactsByClient(this.clientId).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.contacts = response.data;
        }
      },
      error: () => {
        this.loading = false;
      }
    });
    
    // Notas y Oportunidades: endpoints GET por cliente no están disponibles en el backend actual
    // Solo se puede crear (POST), pero no listar por cliente
    this.notes = [];
    this.opportunities = [];
  }

  editClient(): void {
    this.router.navigate(['/clients', this.clientId, 'edit']);
  }

  deleteClient(): void {
    if (confirm('¿Está seguro de eliminar este cliente? Esta acción no se puede deshacer.')) {
      this.clientService.deleteClient(this.clientId).subscribe({
        next: () => {
          this.snackBar.open('Cliente eliminado correctamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/clients']);
        },
        error: () => {
          this.snackBar.open('Error al eliminar el cliente', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/clients']);
  }

  getOpportunityStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'Lead': 'Prospecto',
      'Qualified': 'Calificado',
      'Proposal': 'Propuesta',
      'Negotiation': 'Negociación',
      'ClosedWon': 'Ganada',
      'ClosedLost': 'Perdida'
    };
    return labels[status] || status;
  }

  getOpportunityStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'Lead': 'primary',
      'Qualified': 'accent',
      'Proposal': 'warn',
      'Negotiation': 'warn',
      'ClosedWon': 'primary',
      'ClosedLost': ''
    };
    return colors[status] || '';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
