export type Message = {
    id: number;
    username: string;
    text: string;
    timeStamp: Date;
  };

  export type Member = {
    username: string;
  };

  export type ActivityData = {
    title: string;
    members: Member[];
  };