import { MemberItem } from "./MemberItem";

export interface UserItem {
  id: string;
  username: string;
  email: string;
  password?: string;
  servers: MemberItem[];
  created_at?: Date;
  updated_at?: Date | null;
}
