import type { QueryParameters } from '../QueryParameters';
import type { IHandledQuery, IQueryHandler } from './IQueryHandler';

/**
 * A query handler that does nothing for a given query identifier.
 */
export class VoidQueryHandler implements IQueryHandler {
  /**
   * @param identifier Identifier for validation queries this handler should apply to.
   */
  public constructor(
    public readonly identifier: string,
  ) {}

  public async handle(queryParameters: QueryParameters): Promise<IHandledQuery | undefined> {
    if (queryParameters.queryIdentifier === this.identifier) {
      return {
        valid: false,
        query: '',
        results: '',
      };
    }
    return undefined;
  }
}
