import {Partner} from './Partner';

export function testInput(): TestInput {
  const searchParams = new URLSearchParams(window.location.search);
  return JSON.parse(searchParams.get('testInput') as string);
}

interface TestInput {
  partners: Partner[];
}
