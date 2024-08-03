import { Repository } from "./repositories.models";

export interface User {
  name: string;
  login: string;
  location: string;
  bio: string;
  avatarUrl: string;
  repositories: { nodes: Repository[] };
}
