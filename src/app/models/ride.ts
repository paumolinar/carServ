export interface InputRide {
  dateTime: string;
  seatsAvailable: number;
  price: number;
  location: string;
  driverUsername: string;
}

export interface Ride {
  id: number;
  dateTime: string;
  seatsAvailable: number;
  price: number;
  location: string;
  isActive: boolean;
  driverUsername: string;
  passengerUsernames: string[];
}
