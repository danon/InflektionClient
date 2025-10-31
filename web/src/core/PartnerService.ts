import {ApiClient} from './ApiClient';
import {Partner} from './Partner';

export class PartnerService {
  private cachedPartners: Partner[]|null = null;

  public constructor(private api: ApiClient) {}

  public async listPartnersWithPageNumber(pageSize: number, pageNumber: number): Promise<Result> {
    const partners = await this.getPartners();
    const offset = pageSize * (pageNumber - 1);
    const page = partners.slice(offset, offset + pageSize);
    return new Result(
      page,
      numberOfPages(partners.length, pageSize),
      partners.length,
      offset + 1,
      offset + page.length);
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

export function numberOfPages(totalItems: number, pageSize: number): number {
  if (pageSize < 1) {
    throw new Error();
  }
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

export class Result {
  constructor(
    public partners: Partner[],
    public pageCount: number,
    public totalItems: number,
    public pageStartItem: number,
    public pageEndItem: number,
  ) {}
}
