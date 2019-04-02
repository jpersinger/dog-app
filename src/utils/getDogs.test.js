import {getBreedImage} from "./getDogs";
import fetchMock from 'fetch-mock';

it('returns an image given a dog breed', async () => {
  const breed = 'boxer';
  const returnedValue = 'boxer-image';
  fetchMock.mock(`/api/breed/${breed}/images/random`, {message: returnedValue});
  const image = await getBreedImage(breed);
  expect(image).toBe(returnedValue);
});
