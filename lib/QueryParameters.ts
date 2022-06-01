/**
 * Represents a single instance of validation parameters.
 */
export class QueryParameters {
  public constructor(
    /**
     * A query identifier.
     */
    public readonly queryIdentifier: string,
    /**
     * The parameters to fill into a query template.
     */
    public readonly queryParameters: (string | number)[],
    /**
     * All expected results of the given query.
     * The outer array represents a solution sequence,
     * and the inner array represents a single solution mapping.
     */
    public readonly results: QueryResult[][],
  ) {}
}

export type QueryResult = string | number | QueryResult[];
