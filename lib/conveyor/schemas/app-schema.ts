import { z } from 'zod'

export const appIpcSchema = {
  version: {
    args: z.tuple([]),
    return: z.string(),
  },
  registerBind: {
    args: z.tuple([z.string(), z.string()]),
    return: z.void(),
  },
  unregisterAll: {
    args: z.tuple([]),
    return: z.void(),
  },
  unregisterBind: {
    args: z.tuple([z.string()]),
    return: z.void(),
  },
}
