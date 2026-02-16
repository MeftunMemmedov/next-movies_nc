import { Hero, NewRelases, OurGenres, TrendingNow } from "./(sections)";

const Movies = () => {
  return (
    <main className="container">
      <Hero />
      <OurGenres />
      <TrendingNow />
      <NewRelases />
    </main>
  );
};

export default Movies;
