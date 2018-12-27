<template>
  <mu-container style="margin-top:60pt">
    <div class="col-md-5 col-lg-4">
      <mu-paper
        :z-depth='1'
        style="padding: 10pt"
      >
        <!-- <mu-appbar title="校历" color="primary"></mu-appbar> -->
        <school-calendar :calendar="this.$store.state.calendar"></school-calendar>
      </mu-paper>

      <mu-paper :z-depth='1'>
        <mu-list>
          <mu-list-item
            button
            v-for="(item,index) in functionList"
            :key="index"
            @click="$router.push(item.to(currentTerm))"
            class="list-group-item"
          >
            <mu-list-item-action>
              <mu-icon :value="item.icon"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>{{item.title}}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </div>
  </mu-container>
</template>

<script>
import Utils from "@/commons/utils";
import Toast from "muse-ui-toast";

import SchoolCalendar from "@/components/schoolCalendar";

export default {
  name: "pc-welcome",

  components: {
    SchoolCalendar
  },

  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.updateCalendar();
  //     vm.updateTermList();
  //   });
  // },

  mounted() {
    // Utils.newRequest("/api/term/calendar").then(resp => {
    //   const data = resp.data;
    //   console.log(data);
    //   if (data) this.calendar = data;
    // });
  },

  data() {
    return {
      // The function menu
      functionList: [
        {
          title: "班级课表",
          to: termName => `/pc/term/${termName}/class`,
          icon: "face"
        },
        {
          title: "教师课表",
          to: termName => `/pc/term/${termName}/teacher`,
          icon: "assignment_ind"
        },
        {
          title: "课程一览",
          to: termName => `/pc/term/${termName}/courses`,
          icon: "dashboard"
        }
      ]
    };
  },

  computed: {
    currentTerm() {
      return this.$store.state.calendar.term;
    }
  },

  methods: {
    
  }
};
</script>

<style scoped>
.center-container {
  padding-top: 10pt;
  padding-bottom: 10pt;
}
</style>
