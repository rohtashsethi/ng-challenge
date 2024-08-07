import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-repository-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repository-list.component.html',
  styleUrl: './repository-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryListComponent {}
