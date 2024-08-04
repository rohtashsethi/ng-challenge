import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RepositoryActions from './../../store/repositories.actions';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {
  pages = [
    { title: 'Home', route: '/home' },
    { title: 'Repositories', route: 'repositories' },
    { title: 'Report', route: 'report'}
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchRepos();
  }

  /**
   * Dispaches Load Repository action to store 
   *
   * @memberof AppComponent
   */
  fetchRepos(): void {
    this.store.dispatch(
      RepositoryActions.loadRepositories({ login: 'rohtashsethi' })
    );
  }
}
