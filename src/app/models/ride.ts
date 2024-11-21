export interface InputRide {
  dateTime: string;
  seatsAvailable: number;
  price: number;
  driverUsername: string;
}

export interface Ride {
  id: number;
  dateTime: string;
  seatsAvailable: number;
  price: number;
  isActive: boolean;
  driverUsername: string;
  passengerUsernames: string[];
}
