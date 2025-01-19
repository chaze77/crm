export interface IBaseDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}

export interface IInfo extends IBaseDocument {
  name: string;
  tikect_info: string;
  address: string;
}

export interface ITicket extends IBaseDocument {
  name: string;
  cost: number;
  museum_id: string;
}

export interface IPurchased extends IBaseDocument {
  ticket_id: string;
  user_id: string;
  price: number;
  status: string;
  user_email: string;
}

export interface User {
  email: string;
  labels?: string[];
  name?: string;
  [key: string]: any;
}
