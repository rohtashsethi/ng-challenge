import { Repository } from "./repositories.models";

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
  repositories: { nodes: Repository[] };
}
