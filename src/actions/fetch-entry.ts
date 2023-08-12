import { createClient } from 'contentful';
import queryString from 'query-string';

import type { ContentType } from '~/actions/types';

const fetchEntries = async (
  contentType: ContentType,
  options?: {
    featuredOnly?: boolean;
    limit?: number;
    orderBy?: string;
    select?: string[];
    singleId?: string;
    filter?: { [key: string]: string | boolean };
  }
) => {
  let entryOptions: any = {};
  if (options?.featuredOnly) entryOptions["fields.feature"] = true;
  if (options?.orderBy) entryOptions["order"] = options.orderBy;
  if (options?.limit) entryOptions["limit"] = options.limit;
  if (options?.select) entryOptions["select"] = options.select;
  if (options?.singleId) entryOptions["sys.id"] = options.singleId;
  if (options?.filter)
    entryOptions = Object.assign(entryOptions, options.filter);

  const client = createClient({
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
    space: process.env.CONTENTFUL_SPACE_ID!,
    adapter: async (config) => {
      const params = queryString.stringify(config.params);
      const url = new URL(`${config.url}?${params}`);

      const request = new Request(url.href, {
        method: config.method ? config.method.toUpperCase() : "GET",
        body: config.data,
        redirect: "manual",
        headers: (config.headers as any) || undefined,
      });

      const response = await fetch(request, {
        next: { revalidate: 120 },
      });
      const data = await response.json();

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: config,
        request: request,
      } as any;
    },
  });

  const entries = await client.getEntries({
    content_type: contentType,
    ...entryOptions,
  });

  return entries.items;
};

export default fetchEntries;