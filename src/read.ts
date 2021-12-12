import fs from 'fs';
import yaml from 'js-yaml';
import getSchema from './get-schema';
import { IOptions } from './types';

export default function read(
  input: string,
  options: IOptions,
  schemas?: yaml.Schema[]
): any {
  const cwd = options.path;

  const src = fs.readFileSync(input + '.yml', 'utf8');

  const opts = Object.assign({ safe: true }, options);

  return yaml[opts.safe ? 'safeLoad' : 'load'](src, {
    ...opts,
    filename: input,
    schema: getSchema(cwd, opts, schemas)
  });
}
