export interface InputRide {
  dateTime: string;
  seatsAvailable: number;
  price: number;
  driverUsername: string;
  startpointLat: number;
  startpointLng: number;
  destinationLat: number;
  destinationLng: number;
}

export interface Ride {
  id: number;
  dateTime: string;
  seatsAvailable: number;
  price: number;
  isActive: boolean;
  driverUsername: string;
  startpointLat: number;
  startpointLng: number;
  destinationLat: number;
  destinationLng: number;
}
