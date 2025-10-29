import {Partner} from '../core/Partner';

export function createUserInterface(partner: Partner): void {
  window.addEventListener('load', () => {
    window.document.getElementById('partnerName').textContent = partner.partnerName;
    window.document.getElementById('partnerConversion').textContent = partner.partnerConversions.toString();
  });
}
