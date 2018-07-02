// 不同功能模块的路由应代码分离
import homepage from "./homepage"
import courseQuery from './courseQuery'

export default [
  // Homepage
  homepage,

  // Course queries
  courseQuery,

  { // 404 置后
    path: '*',
    component: {
      beforeCreate() {
        window.swal({
          type: 'warning',
          title: '404 NOT FOUND',
          timer: 1000,
          showConfirmButton: false
        })
        this.$router.replace('/')
      },
      template: '<div></div>'
    }
  }
]