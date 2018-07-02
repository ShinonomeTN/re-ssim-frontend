export default {
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
}