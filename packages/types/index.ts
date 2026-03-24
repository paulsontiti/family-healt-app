export interface Parent {
  id: string;
  email: string;
  familyId?: string;
  name: string;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  height: number;
  weight: number;
}
export interface ChildCreateInput {
  name: string;
  age: number;
  height: number;
  weight: number;
  gender: string;
  familyId:string
}

export interface ParentCreateInput {
  name: string;
  password: string;
  email: string;
}
