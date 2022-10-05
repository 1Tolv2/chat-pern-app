export interface ServerItem {
    id?: number;
    name: string;
    description: string;
    channels?: number[];
    users?: number[];
  }

  export type ServerTrait = {
    serverName: string;
    role: "admin" | "user";
  };