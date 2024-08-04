import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { GithubService } from '../../services/github.service';
import { User } from '../../models/user.models';
import { HeaderComponent } from './../../layout/header/header.component';
import * as RepositoryActions from './../../store/repositories.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {
  user: User | null = null;
  
  constructor(private store: Store, private router: Router, private githubService: GithubService) {}

  ngOnInit(): void {
    this.getUserInfo();  }

  /**
   * Dispaches Load Repository action to store 
   *
   * @memberof AppComponent
   */
  fetchRepos(login: string): void {
    this.store.dispatch(
      RepositoryActions.loadRepositories({ login })
    );
  }

  getUserInfo() {
    this.githubService.getUserInfo().subscribe({
      next: user => {
        console.log(user);
        if (user) {
          this.user = user;
          this.fetchRepos(user.login);
        }
      }
    })
  }
}
