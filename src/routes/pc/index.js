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
  path: "/pc",
  component: require("@/views/pc/"),
  children: [
    //
    // Homepage
    //
    {
      path: "current",
      alias: "",
      component: resolve => require(["@/views/pc/current"], resolve)
    },
    {
      path: "histories",
      component: resolve => require(["@/views/pc/histories"], resolve)
    },
    {
      path: "term/:term",
      component: resolve => require(["@/views/pc/current"], resolve),
      props: true
    },
    //
    // Querying
    //
    {
      path: "term/:term/courses",
      component: resolve => require(["@/views/pc/courseList"], resolve),
      props : true
    },
    {
      path: "term/:term/class",
      component: resolve => require(["@/views/pc/classQuery"], resolve),
      props: true
    },
    {
      path: "term/:term/teacher",
      component: resolve => require(["@/views/pc/teacherQuery"], resolve),
      props: true
    },
    //
    // Result
    //
    {
      name: "pcClassScheduleRoute",
      path: "term/:term/class/:class/schedule",
      component: resolve => require(["@/views/pc/lessonSchedule"], resolve),
      props: route => ({
        term: route.params.term,
        clazz: route.params.class,
        week: route.query.week,
        excludedTypes: route.query.excludedTypes
      })
    }
  ]
};
