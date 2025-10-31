import {ApiClient, ProductionClient, TestErrorClient, TestModeClient} from './core/ApiClient';
import {PartnerService} from './core/PartnerService';
import {TestInput, testInput} from './testInput';
import {createUserInterface} from './ui/ui';

function partnerApiClient(testInput: TestInput|null): ApiClient {
  if (testInput) {
    if (testInput.partnersAvailable) {
      return new TestModeClient(testInput.partners);
    }
    return new TestErrorClient();
  }
  return new ProductionClient();
}

createUserInterface(new PartnerService(partnerApiClient(testInput())));
