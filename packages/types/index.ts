export interface User {
  id: string;
  email: string;
}

export interface Child {
  id: string;
  name: string;
  age: number;
}

export interface ParentCreateInput{
  name:string,
  password:string,
  email:string
}