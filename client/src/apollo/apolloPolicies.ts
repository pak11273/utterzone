export const apolloPolicies = {
  // Product: {
  //   fields: {
  //     // Field policy map for the Product type
  //     isInCart: {
  //       // Field policy for the isInCart field
  //       read(_: any, { variables }: { variables: any }) {
  //         // The read function for the isInCart field
  //         return localStorage.getItem("CART")?.includes(variables.productId)
  //       },
  //     },
  //   },
  // },
  Me: {
    fields: {
      isLoggedIn: {
        read(_: any) {
          return false
        },
      },
    },
  },
}
