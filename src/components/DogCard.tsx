
import type { Dog } from "../types/dog";
import Dinosaur from "./Dinosaur";

interface DogCardProps {
  dog: Dog | null;
  loading: boolean;
  dinosaurBounceTrigger: number;
}

function DogCard({
  dog,
  loading,
  dinosaurBounceTrigger,
}: DogCardProps) {
  return (
    <section className="dog-card">

      <div className="image-container">

        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Finding your furry friend...</p>
          </div>
        )}

        {dog && (
          <img
            src={dog.image}
            alt={`${dog.breed} dog`}
            className={`dog-image ${loading ? "image-loading" : ""}`}
          />
        )}

        {!dog && !loading && (
          <div className="empty-state">
            <span>🐶</span>
            <p>Your next furry friend is waiting!</p>
          </div>
        )}

        <Dinosaur
          bounceTrigger={dinosaurBounceTrigger}
        />

        

      </div>

      {dog && (
        <div className="dog-information">

          <div className="breed-label">
            YOUR FEATURED BREED
          </div>

          <h2>{dog.breed}</h2>

          <p className="dog-description">
            {dog.description}
          </p>

        </div>
      )}

    </section>
  );
}

export default DogCard;
