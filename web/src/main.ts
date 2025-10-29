import {PartnerService} from './core/PartnerService';
import {testInput} from './testInput';
import {createUserInterface} from './ui/ui';

const service = new PartnerService(testInput().partners);
createUserInterface(service.findPartner());
