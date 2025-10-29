import {ApiClient, TestErrorClient, TestModeClient} from './core/ApiClient';
import {TestInput, testInput} from './testInput';
import {createUserInterface} from './ui/ui';

function partnerApiClient(testInput: TestInput): ApiClient {
  if (testInput.partnersAvailable) {
    return new TestModeClient(testInput.partners);
  }
  return new TestErrorClient();
}

createUserInterface(partnerApiClient(testInput()));
