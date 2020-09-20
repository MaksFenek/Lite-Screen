export interface IFriend {
  name: string;
  user: string;
  photo?: string;
}

export interface IUserInfo {
  firstName: string;
  secondName: string;
  birthday: string;
  status: string;
  photo: string;
}

export interface IUserSearch {
  name: string;
  id: string;
  photo: string;
}

export interface IUserPost {
  photo: string;
  name: string;
  content: any;
  likes: number;
  comments: any[];
  author: string;
  date: string[];
  id: string;
}
