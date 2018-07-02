// 不同功能模块的路由应代码分离
import page1 from './page1'
import page2 from './page2'

export default [{
    path: '/index',
    alias: '/',
    component: require('@/views/home/'),
    children: [{
      path: "",
      component(resolve) {
        require(["@/views/home/current"], resolve)
      }
    }, {
      path: "histories",
      component(resolve) {
        require(["@/views/home/histories"], resolve)
      }
    }]
  },

  page1,

  page2,

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