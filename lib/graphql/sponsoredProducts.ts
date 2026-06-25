const GRAPHQL_URL =
  "http://graphqlstore.julienfroidefond.com/api/2024-01/graphql.json";

export const SPONSORED_PRODUCTS_TAG = "sponsored-products";

export type SponsoredCacheStrategy = "force-cache" | "no-store" | "revalidate";

const SPONSORED_PRODUCTS_QUERY = `
  query GetSponsoredProducts($first: Int!) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        description
        featuredImage {
          url
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

type GraphQLProductNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage: { url: string } | null;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
};

type GraphQLResponse = {
  data?: {
    products?: {
      nodes?: GraphQLProductNode[];
    };
  };
  errors?: { message: string }[];
};

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    ...init,
  });

  if (!response.ok) {
    throw new Error(`GraphQL HTTP ${response.status}`);
  }

  const payload = (await response.json()) as GraphQLResponse & { data: T };

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join(", "));
  }

  return payload.data;
}

export function buildSponsoredFetchInit(
  strategy: SponsoredCacheStrategy = "revalidate",
): RequestInit {
  if (strategy === "force-cache") {
    return { cache: "force-cache" };
  }

  if (strategy === "no-store") {
    return { cache: "no-store" };
  }

  return {
    next: {
      revalidate: 3600,
      tags: [SPONSORED_PRODUCTS_TAG],
    },
  };
}

export async function fetchSponsoredProductNodes(
  first: number,
  strategy: SponsoredCacheStrategy = "revalidate",
): Promise<GraphQLProductNode[]> {
  const start = performance.now();

  const data = await graphqlRequest<{
    products: { nodes: GraphQLProductNode[] };
  }>(
    SPONSORED_PRODUCTS_QUERY,
    { first },
    buildSponsoredFetchInit(strategy),
  );

  console.log(
    `[mockShop] fetch products ${(performance.now() - start).toFixed(0)}ms (${strategy})`,
  );

  return data.products.nodes;
}

export async function fetchSponsoredProductByHandle(
  handle: string,
  strategy: SponsoredCacheStrategy = "revalidate",
): Promise<GraphQLProductNode | null> {
  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        featuredImage {
          url
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  const data = await graphqlRequest<{
    productByHandle: GraphQLProductNode | null;
  }>(query, { handle }, buildSponsoredFetchInit(strategy));

  return data.productByHandle;
}

export function mapGraphQLNodeToSponsored(node: GraphQLProductNode) {
  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    imageUrl: node.featuredImage?.url ?? "",
    price: Number.parseFloat(node.priceRange.minVariantPrice.amount),
    currency: node.priceRange.minVariantPrice.currencyCode,
  };
}
