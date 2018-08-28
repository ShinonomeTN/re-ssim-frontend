import Utils from "@/commons/utils";

export default {
  path: "/pc",
  component: require("@/views/pc/"),
  children: [
    //
    // Errors
    //
    {
      path: "db_empty",
      component: resolve => require(["@/views/pc/newSite"], resolve)
    },

    //
    // Homepage
    //
    {
      path: "current",
      alias: "",
      beforeEnter(to, from, next) {
        Utils.newRequest("/api/server?hello")
          .then((result) => {
            let data = result.data;

            if (!data.ping === "pong") alert("WTF? API CHANGED!");

            if (!data.db_available) {
              next("/pc/db_empty")
              return;
            }

            next();
          }).catch((err) => {
            console.log(err);
            next("/error")
          });
      },
      component: resolve => require(["@/views/pc/current"], resolve)
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
      props: true
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