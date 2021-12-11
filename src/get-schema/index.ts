import yaml from 'js-yaml';
import read from '~/read';
import { IOptions } from '~/types';
import absolute from './absolute';

export default function getSchema(
  cwd: string,
  options?: IOptions | null,
  schemas: yaml.Schema[] = [yaml.DEFAULT_SAFE_SCHEMA]
): yaml.Schema {
  const opts = Object.assign({ ext: ['.yml'] }, options);

  const types = [
    new yaml.Type('!import', {
      kind: 'scalar',
      resolve(file) {
        return typeof file === 'string';
      },
      construct(file) {
        return read(absolute({ file, cwd }), opts, schemas);
      }
    })
  ];
  const schema = yaml.Schema.create(schemas, types);
  return schema;
}
