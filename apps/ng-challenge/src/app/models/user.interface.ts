export interface User {
  name: string;
  login: string;
  location: string;
  bio: string;
  avatarUrl: string;
  repositories: { nodes: Repository[] };
}

export interface Repository {
  description: string;
  id: string;
  name: string;
  url: string;
  createdAt: string;
}
