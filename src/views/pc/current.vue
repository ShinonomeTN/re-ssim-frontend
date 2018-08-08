<template>
  <div>
    <div class="page-header">
      <h1 align="center">简单课表查询 <small>for 广东岭南职业技术学院</small></h1>
    </div>
    <div class="row">
      <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <div class="panel panel-primary">
          <div class="panel-heading welcome-panel-header">
            <div v-if="!term">
              <h3>
                <small style="color : white">{{currentTerm}}</small><br><span>7 月 1 日，第{{termWeek}} 星期一</span>
              </h3>
            </div>
            <div v-else>
              <h3>
                <small style="color : white">历史学期</small><br><span>{{currentTerm}}</span>
              </h3>
            </div>
          </div>
          <div class="list-group">
            <router-link v-for="(item,index) in functionList" :key="index" :to="item.to(currentTerm)" class="list-group-item">{{item.title}}</router-link>
          </div>
          <div class="panel-footer">
            <router-link to="/pc/histories" class="btn btn-default pull-right">历史学期</router-link>
            <div class="clearfix">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pc-current-term",
  
    props: {
      term: String
    },
  
    data: () => {
      return {
        termWeek: "二十周",
        functionList: [{
            title: "班级课表",
            to: (termName) => `/pc/term/${termName}/class`
          },
          {
            title: "教师课表",
            to: (termName) => `/pc/term/${termName}/teacher`
          },
          {
            title: "课程一览",
            to: (termName) => `/pc/term/${termName}/courses`
          }
        ]
      };
    },
    computed: {
      currentTerm: () => (this.term ? this.term : "2017-2018学年第二学期")
    }
  };
</script>