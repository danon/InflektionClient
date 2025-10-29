import {testInput} from './testInput';

window.addEventListener('load', () => {
  const [partner] = partners();
  window.document.getElementById('partnerName').textContent = partner.partnerName;
  window.document.getElementById('partnerConversion').textContent = partner.partnerConversions.toString();
});

function partners() {
  return testInput().partners;
}
