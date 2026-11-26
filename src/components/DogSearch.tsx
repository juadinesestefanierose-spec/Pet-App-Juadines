
import type { BreedOption } from "../types/dog";

interface DogSearchProps {
  breeds: BreedOption[];
  selectedBreed: string;
  onBreedChange: (breed: string) => void;
  onFetch: () => void;
  loading: boolean;
}

function DogSearch({
  breeds,
  selectedBreed,
  onBreedChange,
  onFetch,
  loading,
}: DogSearchProps) {
  return (
    <div className="search-container">

      <div className="search-input-wrapper">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          list="breed-options"
          placeholder="Search a dog breed..."
          value={selectedBreed}
          onChange={(event) =>
            onBreedChange(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onFetch();
            }
          }}
        />

        <datalist id="breed-options">
          {breeds.map((breed) => (
            <option
              key={breed.apiPath}
              value={breed.name}
            />
          ))}
        </datalist>

        {selectedBreed && (
          <button
            className="clear-button"
            onClick={() => onBreedChange("")}
            aria-label="Clear search"
            type="button"
          >
            ×
          </button>
        )}
      </div>

      <button
        className="fetch-button"
        onClick={onFetch}
        disabled={loading}
        type="button"
      >
        {loading ? (
          "Fetching..."
        ) : (
          <>
            <span>🐾</span>
            Fetch!
          </>
        )}
      </button>

    </div>
  );
}

export default DogSearch;
