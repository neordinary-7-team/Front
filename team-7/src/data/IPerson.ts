export type IPerson = {
  id: string;
  createDate: Date;
  modifiedDate: Date;
  name: string;
  email: string;
  avatar: string;
  image: string;
  comments: string;
  counts: {
    comment: number;
    retweet: number;
    heart: number;
  };
};
