import Utils from "@/commons/utils";
import router from ".";

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
          .then(result => {
            let data = result.data;

            if (data.ping !== "pong") alert("WTF? API CHANGED!");

            if (!data.db_available) {
              next("/pc/db_empty");
              return;
            }

            next();
          })
          .catch(err => {
            console.log(err);
            next("/error");
          });
      },
      component: resolve => require(["@/views/pc/welcome"], resolve)
    },
    {
      path: "term/:term",
      component: resolve => require(["@/views/pc/welcome"], resolve),
      props: true
    },

    //
    // Querying
    //
    {
      path: "term/:term/courses",
      component: resolve => require(["@/views/pc/courseList"], resolve),
      props: true,
      meta: {
        title: "学院与课程",
        navBack: true
      }
    },
    {
      path: "term/:term/class",
      component: resolve => require(["@/views/pc/classQuery"], resolve),
      props: true,
      meta: {
        title: "班级课表查询",
        navBack: true
      }
    },
    {
      path: "term/:term/teacher",
      component: resolve => require(["@/views/pc/teacherQuery"], resolve),
      props: true,
      meta: {
        title: "教师课表查询",
        navBack: true
      }
    }
  ]
};
