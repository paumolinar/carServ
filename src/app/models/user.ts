export interface InputUser {
  username: string;
  password: string;

}

export interface User {
    username: string;
    password: string;
    balance: number;
    isInRide: boolean;
    currentRide?: number;
  }
  