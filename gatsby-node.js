const path = require(`path`)

exports.createPages = ({
  graphql,
  actions
}) => {
  const {
    createPage
  } = actions
  return graphql(`
    {
      allShopifyPage {
        edges {
          node {
            handle
          }
        }
      }
      allShopifyProduct {
        edges {
          node {
            handle
          }
        }
      }
      allShopifyArticle {
        edges {
          node {
            id
            url
            blog {
              url
            }
          }
        }
        totalCount
      }
    }
  `).then(result => {
    const paginate = [...Array(Math.ceil(result.data.allShopifyArticle.totalCount / 10))]
    result.data.allShopifyPage.edges.forEach(({
      node
    }) => {
      createPage({
        path: `/page/${node.handle}/`,
        component: path.resolve(`./src/templates/Page/index.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: node.handle,
        },
      })
    })
    result.data.allShopifyProduct.edges.forEach(({
      node
    }) => {
      createPage({
        path: `/product/${node.handle}/`,
        component: path.resolve(`./src/templates/ProductPage/index.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: node.handle,
        },
      })
    })
    result.data.allShopifyArticle.edges.forEach(({
      node
    }) => {
      createPage({
        path: `/blogs/${node.blog.url.split("/").pop()}/${node.url.split("/").pop()}/`,
        component: path.resolve(`./src/templates/ArticlePage/index.js`),
        context: {
          // Data passed to context is available
          // in article queries as GraphQL variables.
          id: node.id,
        },
      })
    })
    paginate.forEach((page, i) => {
      if (i > 0) {
        createPage({
          path: `/blogs/${i+1}/`,
          component: path.resolve(`./src/templates/BlogPage/index.js`),
          context: {
            // Data passed to context is available
            // in article queries as GraphQL variables.
            skip: (10 * i)
          },
        })
      }
    })
  })
}
