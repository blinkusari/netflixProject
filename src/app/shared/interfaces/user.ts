export interface Login {
  email: string;
  password: string;
}

export interface User extends Login {
  name?: string;
  phone?: string;
  password_confirmation?: string;
}