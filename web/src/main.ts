import {PartnerService} from './core/PartnerService';
import {testInput} from './testInput';
import {createUserInterface} from './ui/ui';

const testModeInput = testInput();
if (testModeInput.partnersAvailable) {
  const service = new PartnerService(testModeInput.partners);
  createUserInterface({
    state: 'available',
    partner: service.findPartner(),
  });
} else {
  createUserInterface({
    state: 'notAvailable',
    partner: null,
  });
}
