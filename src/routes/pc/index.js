// 不同功能模块的路由应代码分离
// import homepage from "./homepage"
// import courseQuery from './courseQuery'

// export default [
//   // Homepage
//   homepage,

//   // Course queries
//   courseQuery
// ]

export default {
  path: '/pc',
  component: require('@/views/pc/'),
  children: [
    // Homepage
    {
      path: "",
      component: (resolve) => require(["@/views/pc/current"], resolve)
    },
    {
      path: ":term",
      component: (resolve) => require(["@/views/pc/current"], resolve),
      props: true
    },
    {
      path: "histories",
      component: (resolve) => require(["@/views/pc/histories"], resolve)
    },
    //
    // Querying
    //
    {
      path: "courses/:term",
      component: (resolve) => require(['@/views/pc/courseList'], resolve)
    },
    {
      path: 'class/:term',
      component: (resolve) => require(['@/views/pc/classQuery'], resolve),
      props: true
    },
    {
      path: 'teacher/:term',
      component: (resolve) => require(['@/views/pc/teacherQuery'], resolve),
      props: true
    }
  ]
}