import * as crypto from 'crypto';
import * as fs from 'fs';
import * as glob from '@actions/glob';

export async function hashFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(path);
    stream.on('error', err => reject(err));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

export async function hashFiles(patterns: string[], options?: glob.GlobOptions): Promise<string> {
  const globber = await glob.create(patterns.join('\n'), options);
  const files = (await globber.glob()).filter(file => fs.statSync(file).isFile());

  if (files.length === 0) {
    throw new Error('no match files');
  }

  const hashs = await Promise.all(files.map(async file => hashFile(file)));
  return crypto.createHash('sha256').update(hashs.join('-')).digest('hex');
}
