
import type {
  DogApiResponse,
  BreedOption,
} from "../types/dog";

const API_URL = "https://dog.ceo/api";

export async function getAllBreeds(): Promise<BreedOption[]> {
  const response = await fetch(`${API_URL}/breeds/list/all`);

  if (!response.ok) {
    throw new Error("Unable to retrieve dog breeds.");
  }

  const data = await response.json();

  if (data.status !== "success") {
    throw new Error("Failed to load dog breeds.");
  }

  const breeds: BreedOption[] = [];

  Object.entries(data.message as Record<string, string[]>)
    .forEach(([breed, subBreeds]) => {
      if (subBreeds.length === 0) {
        breeds.push({
          name: formatBreedName(breed),
          apiPath: breed,
        });
      } else {
        subBreeds.forEach((subBreed) => {
          breeds.push({
            name: formatBreedName(`${subBreed} ${breed}`),
            apiPath: `${breed}/${subBreed}`,
          });
        });
      }
    });

  return breeds.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export async function getRandomDog(): Promise<string> {
  const response = await fetch(
    `${API_URL}/breeds/image/random`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch a random dog.");
  }

  const data: DogApiResponse = await response.json();

  if (data.status !== "success") {
    throw new Error("Failed to fetch dog image.");
  }

  return data.message;
}

export async function getDogByBreed(
  breed: string
): Promise<string> {
  const response = await fetch(
    `${API_URL}/breed/${breed}/images/random`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch this dog breed.");
  }

  const data: DogApiResponse = await response.json();

  if (data.status !== "success") {
    throw new Error("Failed to fetch dog image.");
  }

  return data.message;
}

export function formatBreedName(breed: string): string {
  return breed
    .split(" ")
    .map((word) =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}
