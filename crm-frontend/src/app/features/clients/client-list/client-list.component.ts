import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  displayedColumns = ['id', 'name', 'documentNumber', 'email', 'phone', 'actions'];
  dataSource = new MatTableDataSource<Client>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 1;
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(page: number = 1): void {
    this.loading = true;
    this.clientService.getClients(page, this.pageSize).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.dataSource.data = response.data.items;
          this.totalCount = response.data.totalCount;
        }
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Error al cargar clientes', 'Cerrar', { duration: 3000 });
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadClients(this.currentPage);
  }

  createClient(): void {
    this.router.navigate(['/clients/new']);
  }

  viewClient(id: number): void {
    this.router.navigate(['/clients', id]);
  }

  editClient(id: number): void {
    this.router.navigate(['/clients', id, 'edit']);
  }

  deleteClient(id: number): void {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.snackBar.open('Cliente eliminado correctamente', 'Cerrar', { duration: 3000 });
          this.loadClients(this.currentPage);
        },
        error: () => {
          this.snackBar.open('Error al eliminar cliente', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}