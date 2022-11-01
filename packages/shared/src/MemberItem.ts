export interface MemberItem {
  id: string;
  user_id?: string;
  username?: string;
  name?: string;
  description?: string;
  role: "admin" | "member";
}
