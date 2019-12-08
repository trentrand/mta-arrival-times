import { getFeedIdForTrain, isValidTrainName } from '../schedule';

test('gets correct feed for train ids', () => {
  expect(getFeedIdForTrain('A')).toEqual(1);
});

test('whether train names are validated correctly', () => {
  expect(isValidTrainName('1')).toEqual(true);
  expect(isValidTrainName('A')).toEqual(true);
  expect(isValidTrainName('F')).toEqual(true);

  expect(isValidTrainName('BART')).toEqual(false);
})

test('gets schedule', () => {
})