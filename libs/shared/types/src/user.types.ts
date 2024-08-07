import { Repository } from "./repository.types";

/**
 * GitHub User Info Model
 *
 * @export
 * @interface User
 */
export interface User {
  name: string;
  login: string;
  location: string;
  bio: string;
  avatarUrl: string;
  repositories: Repositories;
}

export interface Repositories {
  edges: Edge[];
  pageInfo: PageInfo;
}

export interface Edge {
  cursor: string;
  node: Repository
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
}
