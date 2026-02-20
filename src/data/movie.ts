import { Movie } from "@/types";
import { faker } from "@faker-js/faker";
import { createRandomGenre } from "./genre";
import { createFakeImage } from "@/helpers/common";
import { createRandomCast } from "./cast";

faker.seed(123);
export const createRandomMovie = (depth = 0): Movie => {
  return {
    id: "",
    slug: "",
    is_featured: false,
    title: faker.book.title(),
    genres: depth < 1 ? Array.from({ length: 3 }, () => createRandomGenre()) : [],
    year: "2020",
    rating: +faker.number.binary({ min: 1, max: 8 }),
    description: faker.lorem.paragraph(5),
    trailer_urls: faker.helpers.arrayElements([
      "https://www.youtube.com/watch?v=43R9l7EkJwE",
      "https://www.youtube.com/watch?v=y4ZBSzYUTL0",
    ]),
    images: depth < 1 ? Array.from({ length: 10 }, () => createFakeImage(500, 300)) : [],
    age_rating: faker.helpers.arrayElement(["U", "PG", "15", "18", "R18"]),
    poster: createFakeImage(300, 500),
    poster_bg: createFakeImage(1920, 1080),
    directors: Array.from({ length: 2 }, () => ({
      id: "",
      fullName: faker.book.author(),
      bio: faker.lorem.paragraph(10),
      directed: depth < 1 ? Array.from({ length: 10 }, () => createRandomMovie(depth + 1)) : [],
    })),
    cast: depth < 1 ? Array.from({ length: 20 }, () => createRandomCast()) : [],
    likes: ["user1", "user2"],
    dislikes: ["user1", "user2"],
  };
};

export const MOVIES: Movie[] = Array.from({ length: 10 }, () => createRandomMovie());
