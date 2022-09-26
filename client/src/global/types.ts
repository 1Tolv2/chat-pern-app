export type Post = {
    id: number;
    user: string;
    body: string;
    created_at: Date;
    updated_at: Date;
  };

  export type Member = {
    username: string;
  };

  export type ActivityData = {
    title: string;
    members: Member[];
  };