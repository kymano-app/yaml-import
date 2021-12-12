import path from 'path';

export default function absolute(options: {
  file: string;
  cwd: string;
}): string {
  return path.join(options.cwd, options.file);
}
