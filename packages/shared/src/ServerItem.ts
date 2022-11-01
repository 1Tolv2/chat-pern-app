import { ChannelItem } from "./ChannelItem";
import { MemberItem } from "./MemberItem";
import { UserItem } from "./UserItem";

export interface ServerItem {
  id: string;
  name: string;
  description: string;
  admin_id: string;
  channels: ChannelItem[];
  members: MemberItem[];
  created_at: Date;
  updated_at: Date | null;
}
