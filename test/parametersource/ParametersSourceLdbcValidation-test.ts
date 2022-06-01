import { Readable } from 'stream';
import arrayifyStream from 'arrayify-stream';
import { ParametersSourceLdbcValidation } from '../../lib/parametersource/ParametersSourceLdbcValidation';
import { QueryParameters } from '../../lib/QueryParameters';
const streamifyString = require('streamify-string');

const files: Record<string, string> = {};
jest.mock('fs-extra', () => ({
  ...jest.requireActual('fs-extra'),
  createReadStream(filePath: string, opts: any) {
    if (filePath in files) {
      return streamifyString(files[filePath], opts);
    }
    const ret = new Readable();
    ret._read = () => {
      ret.emit('error', new Error(`Unknown file in ParametersSourceLdbcValidation: ${filePath}`));
    };
    return ret;
  },
}));

describe('ParametersSourceLdbcValidation', () => {
  let source: ParametersSourceLdbcValidation;

  beforeEach(() => {
    source = new ParametersSourceLdbcValidation('file');
  });

  describe('getParameters', () => {
    it('handles an empty file', async() => {
      files.file = ``;
      expect(await arrayifyStream(await source.getParameters())).toEqual([]);
    });

    it('handles a valid file', async() => {
      files.file = `["q1",123,"Chau",20]|[[1],[2],[3]]
["q2",123,"Chau",20]|[[1],[2],[3]]`;
      expect(await arrayifyStream(await source.getParameters())).toEqual([
        new QueryParameters(
          'q1',
          [ 123, 'Chau' ],
          [
            [ 1 ],
            [ 2 ],
            [ 3 ],
          ],
        ),
        new QueryParameters(
          'q2',
          [ 123, 'Chau' ],
          [
            [ 1 ],
            [ 2 ],
            [ 3 ],
          ],
        ),
      ]);
    });

    it('throws on an invalid last line', async() => {
      files.file = `["q1",123,"Chau]`;
      await expect(arrayifyStream(await source.getParameters())).rejects
        .toThrowError(`Detected invalid validation line: '["q1",123,"Chau]'`);
    });

    it('throws on an invalid non-last line', async() => {
      files.file = `["q1",123,"Chau]
["q1",123,"Chau",20]|[[1],[2],[3]]`;
      await expect(arrayifyStream(await source.getParameters())).rejects
        .toThrowError(`Detected invalid validation line: '["q1",123,"Chau]'`);
    });

    it('throws on an invalid non-last line with invalid json', async() => {
      files.file = `["q1",123,"Chau]|{}
["q1",123,"Chau",20]|[[1],[2],[3]]`;
      await expect(arrayifyStream(await source.getParameters())).rejects
        .toThrowError(`Detected invalid JSON in the query part of: '["q1",123,"Chau]|{}`);
    });
  });
});
