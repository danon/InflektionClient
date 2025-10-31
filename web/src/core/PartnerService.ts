import {ApiClient} from './ApiClient';
import {Partner} from './Partner';

export class PartnerService {
  private cachedPartners: Partner[]|null = null;

  public constructor(private api: ApiClient) {}

  public async listPartnersWithPageNumber(pageSize: number, page: number): Promise<Result> {
    const partners = await this.getPartners();
    return new Result(
      this.paginate(partners, page, pageSize),
      numberOfPages(partners.length, pageSize));
  }

  /**
   * @deprecated
   */
  public async listPartners(pageSize: number, page: number): Promise<Partner[]> {
    const result = await this.listPartnersWithPageNumber(pageSize, page);
    return result.partners;
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

export function numberOfPages(totalItems: number, pageSize: number): number {
  if (pageSize < 1) {
    throw new Error();
  }
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

class Result {
  constructor(
    public partners: Partner[],
    public pageCount: number,
  ) {}
}
