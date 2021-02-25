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
}
export default ({ app }, inject) => {
  inject('my', new MyInject(app))
}
