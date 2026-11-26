
export interface DogApiResponse {
  message: string;
  status: string;
}

export interface BreedOption {
  name: string;
  apiPath: string;
}

export interface Dog {
  image: string;
  breed: string;
  description: string;
}
