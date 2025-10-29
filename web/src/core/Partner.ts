export interface PartnerContainer {
  state: 'available'|'notAvailable';
  partner: Partner|null;
}

export interface Partner {
  partnerName: string;
  partnerConversions: number;
}
