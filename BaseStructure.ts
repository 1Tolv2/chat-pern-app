type User = {
  id: string;
  username: string;
  email: string;
  password?: string;
  servers: [
    {
      id: string;
      name: string;
      description: string;
      role: "admin" | "member";
    }
  ];
  created_at?: Date;
  updated_at?: Date | null;
};

type Server = {
  id: string;
  name: string;
  description: string;
  admin_id: string;
  channels: [
    {
      id: string;
      name: string;
      description: string;
      created_at: Date;
      updated_at: Date | null;
    }
  ];
  members: [
    {
      id: string;
      username: string;
      role: "admin" | "member";
    }
  ];
  created_at: Date;
  updated_at: Date | null;
};

type Channel = {
  id: string;
  name: string;
  description: string;
  posts?: [
    {
      id: string;
      text: string;
      username: string;
      user_id: string;
      created_at: Date;
      updated_at: Date | null;
    }
  ];
  server_id?: string;
  server_name?: string;
  created_at: Date;
  updated_at: Date | null;
};

type Post = {
  id: string;
  text: string;
  username: string;
  user_id: string;
  channel_name?: string;
  channel_id?: string;
  created_at: Date;
  updated_at: Date | null;
};
