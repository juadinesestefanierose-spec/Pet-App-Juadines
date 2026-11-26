
import { useEffect, useState } from "react";

import DogSearch from "./components/DogSearch";
import DogCard from "./components/DogCard";

import {
  getAllBreeds,
  getDogByBreed,
  getRandomDog,
  formatBreedName,
} from "./services/dogApi";

import { getBreedDescription } from "./data/breedDescriptions";

import type { BreedOption, Dog } from "./types/dog";

import "./App.css";

function App() {
  const [breeds, setBreeds] = useState<BreedOption[]>([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dog, setDog] = useState<Dog | null>(null);

  const [loading, setLoading] = useState(false);
  const [dinosaurBounceTrigger, setDinosaurBounceTrigger] = useState(0);
  const [error, setError] = useState("");

  // Load all available dog breeds.
  useEffect(() => {
    async function loadBreeds() {
      try {
        const breedList = await getAllBreeds();
        setBreeds(breedList);
      } catch {
        setError("Unable to load dog breeds. Please refresh the page.");
      }
    }

    loadBreeds();
  }, []);

  // Fetch a dog image.
  async function handleFetch() {
    setLoading(true);
    setError("");
    setDinosaurBounceTrigger((trigger) => trigger + 1);

    try {
      let imageUrl: string;
      let breedName: string;

      if (selectedBreed.trim()) {
        const matchingBreed = breeds.find(
          (breed) =>
            breed.name.toLowerCase() ===
            selectedBreed.trim().toLowerCase()
        );

        if (!matchingBreed) {
          throw new Error(
            "Breed not found. Please select a breed from the suggestions."
          );
        }

        imageUrl = await getDogByBreed(
          matchingBreed.apiPath
        );

        breedName = matchingBreed.name;
      } else {
        imageUrl = await getRandomDog();

        const breedFromUrl = imageUrl
          .split("/")
          .at(-2) ?? "Unknown";

        breedName = formatBreedName(
          breedFromUrl.replaceAll("-", " ")
        );
      }

      setDog({
        image: imageUrl,
        breed: breedName,
        description: getBreedDescription(breedName),
      });

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app" id="home">
      <main className="hero-section" id="finder">
        <section className="hero-content">
          <h1>Meet the world of dog.</h1>
          <p className="hero-description">
            Search, explore, and discover something new.
          </p>

          <DogSearch
            breeds={breeds}
            selectedBreed={selectedBreed}
            onBreedChange={setSelectedBreed}
            onFetch={handleFetch}
            loading={loading}
          />

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}
        </section>

        <div className="dog-display">
          <DogCard
            dog={dog}
            loading={loading}
            dinosaurBounceTrigger={dinosaurBounceTrigger}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
