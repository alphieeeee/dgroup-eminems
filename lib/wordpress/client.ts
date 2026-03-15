const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export async function fetchGraphQL<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!WORDPRESS_API_URL) {
    throw new Error("Missing WORDPRESS_API_URL in .env.local");
  }

  const res = await fetch(WORDPRESS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status}`);
  }

  const json: GraphQLResponse<T> = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors.map(e => e.message).join(", "));
  }

  if (!json.data) {
    throw new Error("No data returned from GraphQL");
  }

  return json.data;
}
