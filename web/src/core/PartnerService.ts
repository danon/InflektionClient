import {ApiClient} from './ApiClient';
import {Partner} from './Partner';

export class PartnerService {
  private cachedPartners: Partner[]|null = null;

  public constructor(private api: ApiClient) {}

  public listPartners(pageSize: number, page: number): Promise<Partner[]> {
    if (page < 1) {
      throw new Error();
    }
    return this.getPartners()
      .then(partners => this.paginate(partners, page, pageSize));
  }

  private paginate(partners: Partner[], pageNumber: number, pageSize: number): Partner[] {
    const startIndex = pageNumber - 1;
    const endIndex = startIndex + 1;
    return partners.slice(startIndex * pageSize, endIndex * pageSize);
  }

  private getPartners(): Promise<Partner[]> {
    if (this.cachedPartners !== null) {
      return Promise.resolve(this.cachedPartners);
    }
    const promise = this.api.loadPartners();
    promise.then(partners => this.cachedPartners = partners);
    return promise;
  }
}
