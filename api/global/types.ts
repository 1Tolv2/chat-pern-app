export type ServerTrait = {
  serverName: string;
  role: "admin" | "user";
};

export interface TimeStamps {
  created_at: Date | null;
  updated_at: Date | null;
}
