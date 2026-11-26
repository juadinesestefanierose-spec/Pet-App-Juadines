
export const breedDescriptions: Record<string, string> = {
  "Golden Retriever":
    "Golden Retrievers are friendly, intelligent, and loyal dogs. They are known for their gentle personality and love for companionship.",

  "German Shepherd":
    "German Shepherds are intelligent, confident, and hardworking dogs. They are known for their loyalty and ability to learn quickly.",

  "Labrador Retriever":
    "Labrador Retrievers are friendly, outgoing, and active dogs. They are popular family companions because of their playful personality.",

  "French Bulldog":
    "French Bulldogs are small, affectionate, and playful dogs. They are recognized by their short noses and distinctive bat-like ears.",

  "Poodle":
    "Poodles are intelligent and active dogs. They are known for their curly coats and quick learning abilities.",

  "Shih Tzu":
    "Shih Tzus are small and affectionate companion dogs. They are known for their long coats and friendly personalities.",

  "Siberian Husky":
    "Siberian Huskies are energetic and friendly dogs. They are known for their thick coats, beautiful eyes, and love of activity.",

  "Beagle":
    "Beagles are curious, friendly, and energetic dogs. They have a strong sense of smell and enjoy exploring their surroundings.",

  "Chihuahua":
    "Chihuahuas are small dogs with big personalities. They are alert, loyal, and often form strong bonds with their owners.",

  "Dachshund":
    "Dachshunds are recognizable by their long bodies and short legs. They are curious, playful, and brave dogs.",

  "Pomeranian":
    "Pomeranians are small, lively dogs with fluffy coats. They are confident, playful, and affectionate companions.",

  "Corgi":
    "Corgis are short-legged, intelligent, and active dogs. They are known for their cheerful personalities and herding background.",

  "Rottweiler":
    "Rottweilers are strong, confident, and loyal dogs. They are intelligent and benefit from proper training and socialization.",

  "Boxer":
    "Boxers are energetic, playful, and affectionate dogs. They enjoy spending time with their families.",

  "Doberman":
    "Dobermans are intelligent, alert, and loyal dogs. They are athletic and respond well to consistent training."
};

export function getBreedDescription(
  breed: string
): string {
  return (
    breedDescriptions[breed] ??
    `${breed} is a unique dog breed with its own appearance and personality. Learn more about this breed and discover what makes these dogs special.`
  );
}
