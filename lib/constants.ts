// You can change the plan names and features to your liking.
// The isPopular flag is used to highlight the most popular plan in the pricing section.
// If this is too hard coded for you, you can move the logic to Lemon Squeezy and rely on their metadata.

export const PLAN_DETAILS: any = {
  'Starter Plan': {
    isPopular: false,
    features: [
      'Includes all features',
      'Ask up to 100 questions',
      'Additional questions at $0.40 each',
    ],
  },
  'Pro Plan': {
    isPopular: true,
    features: [
      'Includes all features',
      'Ask up to 300 questions',
      'Additional questions at $0.35 each',
    ],
  },
  'Elite Plan': {
    isPopular: false,
    features: [
      'Includes all features',
      'Ask up to 1000 questions',
      'Additional questions at $0.30 each',
    ],
  },
}
