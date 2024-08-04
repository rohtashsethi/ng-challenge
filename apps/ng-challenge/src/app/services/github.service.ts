import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_REPOS, GET_REPOS_CURSOR, GET_USER_INFO } from '../graphql/queries';
import { map, Observable } from 'rxjs';
import { Repositories, User } from '../models/user.models';
import { Repository } from '../models/repositories.models';
import { RepositoriesState } from '../store/repositories.reducer';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private apollo: Apollo) {}

  /**
   * Fetches the GitHub User Info
   *
   * @param {string} login - Username of the GitHub User
   * @return {*}  {(Observable<User | null>)}
   * @memberof GithubService
   */
  getUserInfo(): Observable<User | null> {
    return this.apollo
      .query<{ viewer: User }>({
        query: GET_USER_INFO,
      })
      .pipe(
        map((result) => {
          if (result.data) {
            return result.data.viewer;
          }
          return null;
        })
      );
  }

  /**
   * Fetches the repositories of the Gihub User
   *
   * @param {string} login - Username of the GitHub User
   * @param {number} [pageSize=50]
   * @return {*}  {Observable<Repository[]>}
   * @memberof GithubService
   */
  // getRepositories(login: string, pageSize = 50): Observable<Repository[]> {
  //   return this.apollo
  //     .query<{ user: User }>({
  //       query: GET_REPOS,
  //       variables: { login, pageSize },
  //     })
  //     .pipe(
  //       map((result) => {
  //         if (result.data) {
  //           return result.data.user.repositories.;
  //         }
  //         return [];
  //       })
  //     );
  // }

  getRepositories(cursor: string | null = null, limit = 20): Observable<Repositories> {
    return this.apollo.query<{ viewer: User }>({
      query: GET_REPOS_CURSOR,
      variables: { cursor, limit }
    }).pipe(
      map(result => result.data.viewer.repositories)
    );
  }
}
