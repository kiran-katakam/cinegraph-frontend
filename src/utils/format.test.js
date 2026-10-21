// Run: node src/utils/format.test.js
import assert from 'node:assert/strict';
import { formatTitle, yearOf } from './format.js';

assert.equal(formatTitle('Shawshank Redemption, The (1994)'), 'The Shawshank Redemption');
assert.equal(formatTitle('Heat (1995)'), 'Heat');
assert.equal(formatTitle('Star Wars: Episode IV - A New Hope (1977)'), 'Star Wars: Episode IV - A New Hope');
assert.equal(formatTitle('Godfather Trilogy: 1972-1990, The (1992)'), 'The Godfather Trilogy: 1972-1990');
assert.equal(formatTitle("Haine, La (Hate) (1995)"), 'La Haine (Hate)');
assert.equal(formatTitle('Killer, The (Die xue shuang xiong) (1989)'), 'The Killer (Die xue shuang xiong)');
assert.equal(formatTitle("Amour, L' (2012)"), "L'Amour");
assert.equal(formatTitle('Babylon 5'), 'Babylon 5');
assert.equal(formatTitle(), '');
assert.equal(yearOf({ title: 'Heat (1995)' }), 1995);
assert.equal(yearOf({ title: 'Heat', releaseYear: 1995 }), 1995);
assert.equal(yearOf({ title: 'Babylon 5' }), null);
console.log('format ok');
