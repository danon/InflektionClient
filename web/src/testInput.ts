import {Partner} from './core/Partner';

export function testInput(): TestInput|null {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('testInput')) {
    return JSON.parse(searchParams.get('testInput') as string);
  }
  return null;
}

export interface TestInput {
  partnersAvailable: boolean;
  partners: Partner[];
}
