import { resolve } from "path";
import { copyFile, access, mkdir } from "fs";
import fg from "fast-glob";
import { promisify } from "./promisify";
import {
  Option,
  FileInfoType,
} from "./interface";

const copyfileAsync = promisify(copyFile);
const mkdirAsync = promisify<
  string,
  { recursive?: boolean },
  any
>(mkdir);

const accessAsync = (path: string) => {
  return new Promise(resolve =>
    access(path, err => resolve(err === null))
  );
};

/**
 * Get path and file name of files which was matched pattern
 * @param pattern
 * @returns
 */
async function getFileInfosAsync(
  pattern: string
): Promise<FileInfoType[]> {
  const files = await fg(pattern);
  return files.map(file => {
    const ps = file.split("/");
    return {
      filepath: file,
      filename: ps[ps.length - 1],
    };
  });
}

/**
 * Copy files to target directory
 * @param src   path from
 * @param dest  path to
 * @returns
 */
async function copyFileEnhanceAsync(
  src: string,
  dest: string
) {
  const fileInfos = await getFileInfosAsync(src);

  // Create if directory or path is not existed
  const isExist = await accessAsync(
    resolve(process.cwd(), dest)
  );
  if (!isExist) {
    await mkdirAsync(dest, { recursive: true });
  }
  return fileInfos.map(
    ({ filepath, filename }) => {
      const dist = `${
        dest.endsWith("/") ? dest : `${dest}/`
      }${filename}`;
      return copyfileAsync(filepath, dist);
    }
  );
}

/**
 * Copy files batch
 * @param {*} options
 */
function copyfileBatch(options: Option[]) {
  const promises = options.reduce(
    (defers, { src, dest }) => {
      const srcset = Array.isArray(src)
        ? src
        : [src];

      defers.push(
        ...srcset.map(pattern => {
          return copyFileEnhanceAsync(
            pattern,
            resolve(process.cwd(), dest)
          );
        })
      );
      return defers;
    },
    [] as Promise<unknown>[]
  );

  return Promise.all(promises);
}

export {
  type Option,
  type FileInfoType,
  copyfileBatch,
};
