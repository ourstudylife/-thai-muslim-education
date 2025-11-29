import { GraphQLClient } from 'graphql-request';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string;

export const client = new GraphQLClient(API_URL);

export async function getAllPosts() {
  const query = `
    query GetAllPosts {
      posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          date
          excerpt
          categories {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;
  const data = await client.request(query);
  return (data as any).posts.nodes;
}

export async function getRecentPosts() {
  const query = `
    query GetRecentPosts {
      posts(first: 6, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          date
          excerpt
          categories {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;
  const data = await client.request(query);
  return (data as any).posts.nodes;
}

export async function getPostBySlug(slug: string) {
  const query = `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        title
        date
        content
        excerpt
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  `;
  const data = await client.request(query, { slug });
  return (data as any).post;
}

export async function getCategories() {
  const query = `
    query GetCategories {
      categories(first: 10) {
        nodes {
          name
          slug
          count
        }
      }
    }
  `;
  const data = await client.request(query);
  return (data as any).categories.nodes;
}

export async function getCategoryBySlug(slug: string) {
  const query = `
    query GetCategoryBySlug($slug: ID!) {
      category(id: $slug, idType: SLUG) {
        name
        slug
        description
        count
      }
    }
  `;
  const data = await client.request(query, { slug });
  return (data as any).category;
}

export async function getPostsByCategory(categorySlug: string) {
  const query = `
    query GetPostsByCategory($categorySlug: String!) {
      posts(first: 100, where: { categoryName: $categorySlug, orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          date
          excerpt
          categories {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;
  const data = await client.request(query, { categorySlug });
  return (data as any).posts.nodes;
}

export async function searchPosts(searchQuery: string) {
  const query = `
    query SearchPosts($searchQuery: String!) {
      posts(first: 50, where: { search: $searchQuery, orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          date
          excerpt
          categories {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;
  const data = await client.request(query, { searchQuery });
  return (data as any).posts.nodes;
}

export async function getLessonsByCategory(categorySlug: string) {
  const query = `
    query GetLessonsByCategory($categorySlug: String!) {
      posts(first: 100, where: { categoryName: $categorySlug, orderby: { field: DATE, order: ASC } }) {
        nodes {
          title
          slug
          date
          excerpt
          content
          categories {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;
  const data = await client.request(query, { categorySlug });
  return (data as any).posts.nodes;
}

export async function getLessonBySlug(slug: string, categorySlug: string) {
  const query = `
    query GetLessonBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        title
        date
        content
        excerpt
        slug
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  `;
  const data = await client.request(query, { slug });
  const post = (data as any).post;

  // Verify post belongs to the correct category
  if (post && post.categories.nodes.some((cat: any) => cat.slug === categorySlug)) {
    return post;
  }

  return null;
}

export async function getRelatedPosts(categorySlug: string, currentSlug: string) {
  const query = `
    query GetRelatedPosts($categorySlug: String!) {
      posts(first: 4, where: { categoryName: $categorySlug, orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;
  const data = await client.request(query, { categorySlug });
  const posts = (data as any).posts.nodes;
  return posts.filter((post: any) => post.slug !== currentSlug).slice(0, 3);
}
