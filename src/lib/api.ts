import { GraphQLClient } from 'graphql-request';

const API_URL_TH = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string || 'https://thaimuslimeducation.com/graphql';
const API_URL_EN = process.env.NEXT_PUBLIC_WORDPRESS_API_URL_EN as string || 'https://en.thaimuslimeducation.com/graphql';

// Helper to get the correct client based on locale
function getClient(locale: string = 'th') {
  const endpoint = locale === 'en' ? API_URL_EN : API_URL_TH;
  if (!endpoint) {
    console.warn(`API URL for locale "${locale}" is not defined.`);
  }
  return new GraphQLClient(endpoint);
}

export async function getAllPosts(locale: string = 'th') {
  const query = `
    query GetAllPosts {
      posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
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
  try {
    const data = await getClient(locale).request(query);
    return (data as any).posts.nodes;
  } catch (error) {
    console.error(`Error fetching all posts (${locale}):`, error);
    return []; // Return empty array instead of crashing
  }
}

export async function getRecentPosts(locale: string = 'th') {
  const query = `
    query GetRecentPosts {
      posts(first: 6, where: { orderby: { field: DATE, order: DESC } }) {
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
  try {
    const data = await getClient(locale).request(query);
    return (data as any).posts.nodes;
  } catch (error) {
    console.error(`Error fetching recent posts (${locale}):`, error);
    return []; // Return empty array instead of crashing
  }
}

export async function getPostBySlug(slug: string, locale: string = 'th') {
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
  try {
    const data = await getClient(locale).request(query, { slug });
    return (data as any).post;
  } catch (error) {
    console.error(`Error fetching post by slug (${slug}, ${locale}):`, error);
    return null;
  }
}

export async function getCategories(locale: string = 'th') {
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
  try {
    const data = await getClient(locale).request(query);
    return (data as any).categories.nodes;
  } catch (error) {
    console.error(`Error fetching categories (${locale}):`, error);
    return []; // Return empty array instead of crashing
  }
}

export async function getCategoryBySlug(slug: string, locale: string = 'th') {
  const query = `
    query GetCategoryBySlug($slug: ID!) {
      category(id: $slug, idType: SLUG) {
        databaseId
        name
        slug
        description
        count
      }
    }
  `;
  const data = await getClient(locale).request(query, { slug });
  return (data as any).category;
}

export async function getPostsByCategory(categorySlug: string, locale: string = 'th') {
  const query = `
    query GetPostsByCategory($categorySlug: String!) {
      posts(first: 100, where: { categoryName: $categorySlug, orderby: { field: DATE, order: DESC } }) {
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
  const data = await getClient(locale).request(query, { categorySlug });
  return (data as any).posts.nodes;
}

export async function getPostsByCategoryId(categoryId: number, locale: string = 'th') {
  const query = `
    query GetPostsByCategoryId($categoryId: Int!) {
      posts(first: 100, where: { categoryId: $categoryId, orderby: { field: DATE, order: DESC } }) {
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
  const data = await getClient(locale).request(query, { categoryId });
  return (data as any).posts.nodes;
}

export async function searchPosts(searchQuery: string, locale: string = 'th') {
  const query = `
    query SearchPosts($searchQuery: String!) {
      posts(first: 50, where: { search: $searchQuery, orderby: { field: DATE, order: DESC } }) {
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
  const data = await getClient(locale).request(query, { searchQuery });
  return (data as any).posts.nodes;
}

export async function getLessonsByCategory(categorySlug: string, locale: string = 'th') {
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
  try {
    const data = await getClient(locale).request(query, { categorySlug });
    return (data as any).posts?.nodes || [];
  } catch (error) {
    console.error(`Error fetching lessons for category ${categorySlug}:`, error);
    return []; // Return empty array to keep build running
  }
}

export async function getLessonBySlug(slug: string, categorySlug: string, locale: string = 'th') {
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
  const data = await getClient(locale).request(query, { slug });
  const post = (data as any).post;

  // Verify post belongs to the correct category
  if (post && post.categories.nodes.some((cat: any) => cat.slug === categorySlug)) {
    return post;
  }

  return null;
}

export async function getRelatedPosts(categorySlug: string, currentSlug: string, locale: string = 'th') {
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
  const data = await getClient(locale).request(query, { categorySlug });
  const posts = (data as any).posts.nodes;
  return posts.filter((post: any) => post.slug !== currentSlug).slice(0, 3);
}
