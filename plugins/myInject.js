class MyInject {
  constructor (app) {
    this.app = app
  }

  pageTitle (routeName) {
    const jsonPath = `pages.${routeName.replace(/-/g, '.')}`
    const title = this.app.i18n.t(jsonPath)
    return (typeof (title) === 'object') ? title.index : title
  }

  homeLinkTo (name = 'profile') {
    return { name }
  }

  errorHandler ({ status, statusText }) {
    return this.error({ statusCode: status, message: statusText })
  }
}
export default ({ app, error }, inject) => {
  inject('my', new MyInject({ app, error }))
}
