import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_REPOS, GET_USER_INFO } from '../graphql/queries';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.models';
import { Repository } from '../models/repositories.models';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private apollo: Apollo) {}

  getUserInfo(login: string): Observable<User | null> {
    return this.apollo
      .query<{ user: User }>({
        query: GET_USER_INFO,
        variables: { login },
      })
      .pipe(
        map((result) => {
          if (result.data) {
            return result.data.user;
          }
          return null;
        })
      );
  }

  getRepositories(login: string, pageSize = 50): Observable<Repository[]> {
    return this.apollo
      .query<{ user: User }>({
        query: GET_REPOS,
        variables: { login, pageSize },
      })
      .pipe(
        map((result) => {
          if (result.data) {
            return result.data.user.repositories.nodes;
          }
          return [];
        })
      );
  }
}
