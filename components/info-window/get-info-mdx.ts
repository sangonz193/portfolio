"use server";

import { readFile, stat } from "fs/promises";

type Params = {
  appId: string;
};

export async function getInfoMdx(params: Params) {
  const filePath = process.cwd() + `/modules/apps/${params.appId}/info.mdx`;

  const fileExists = await stat(filePath)
    .then(() => true)
    .catch(() => false);

  if (!fileExists) {
    return null;
  }

  const content = await readFile(filePath, "utf-8");

  return content;
}
