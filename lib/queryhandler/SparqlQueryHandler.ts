import type { IVariableTemplate } from 'sparql-query-parameter-instantiator';
import { QueryTemplateProvider, VariableTemplateWrapper } from 'sparql-query-parameter-instantiator';
import type { QueryParameters } from '../QueryParameters';
import type { IHandledQuery, IQueryHandler } from './IQueryHandler';
import { SparqlJsonSerializer } from './SparqlJsonSerializer';

/**
 * A query handler that handles queries with a given identifier as SPARQL.
 */
export class SparqlQueryHandler implements IQueryHandler {
  private readonly resultsSerializer: SparqlJsonSerializer;

  /**
   * @param identifier Identifier for validation queries this handler should apply to.
   * @param templateFilePath Path to the SPARQL query template this handler should instantiate queries for.
   * @param variables The variables that will be instantiated within the query template.
   * @param results The variables that are selected by the query.
   */
  public constructor(
    public readonly identifier: string,
    public readonly templateFilePath: string,
    public readonly variables: IVariableTemplate[],
    public readonly results: IVariableTemplate[],
  ) {
    this.resultsSerializer = new SparqlJsonSerializer(results);
  }

  public async handle(queryParameters: QueryParameters): Promise<IHandledQuery | undefined> {
    if (queryParameters.queryIdentifier === this.identifier) {
      // Prepare variable templates for query
      if (this.variables.length !== queryParameters.queryParameters.length) {
        throw new Error(`Invalid query parameters for '${this.identifier}'. Encountered a validation query with ${queryParameters.queryParameters.length} parameters, while ${this.variables.length} variables were defined in the config.`);
      }
      const variableTemplates: IVariableTemplate[] = [];
      for (let i = 0; i < this.variables.length; i++) {
        variableTemplates[i] = new VariableTemplateWrapper(this.variables[i], {
          getValues: async() => [ queryParameters.queryParameters[i] ],
        });
      }

      // Handle query
      const query = (await new QueryTemplateProvider(this.templateFilePath, '', variableTemplates).createTemplate())
        .instantiate(0);

      // Handle results
      const results = this.resultsSerializer.serialize(queryParameters);

      return { valid: true, query, results };
    }
    return undefined;
  }
}
