
export const getScreenConfiguration = (headerConfig) => {
    const { screenName } = headerConfig || {}

    return {
      component: screenName,
      options: {
        headerShown: false,
        // title: headerTitle
      }
    }
  }