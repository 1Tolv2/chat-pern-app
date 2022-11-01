export interface PostItem {
  id: string;
  text: string;
  user_id: string;
  username: string;
  channel_id?: string;
  channel_name?: string;
  created_at: Date;
  updated_at: Date | null;
}
