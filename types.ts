
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum UserType {
  CLIENT = 'CLIENT',
  EXPERT = 'EXPERT'
}

export interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  gender: Gender;
  type: UserType;
  idCardUrl?: string;
  points: number;
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
}

export interface Expert extends User {
  bio: string;
  portfolio: string[];
  rating: number;
  services: Service[];
}

export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  expertId: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  price: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';
  clientLocation: {
    lat: number;
    lng: number;
    address: string;
  };
}
