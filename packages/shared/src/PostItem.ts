export interface PostItem {
    id?: number | null;
    text: string;
    user?: string
    user_id: number;
    channel_id: number;
    created_at?: Date | null;
    updated_at?: Date | null;
  }