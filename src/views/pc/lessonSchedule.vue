<template>
  <div>
    <div class="page-header">
      <h1>
        <small>{{term}}</small><br>{{clazz}}课表 <small style="display:inline-block">at 第 {{week}} 周</small>
      </h1>
      <div>
        <button class="pull-right btn btn-default" @click="$router.go(-1)">返回</button>
        <div class="clearfix"></div>
      </div>
    </div>
    <div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>节</th>
            <th v-for="weekDay in ['一','二','三','四','五','六','日']" :key="weekDay">{{weekDay}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="turn in [1,2,3,4,5,6,7,8,9,10,11,12]" :key="turn">
            <td v-for="day in [0,1,2,3,4,5,6,7]" :key="day">
              <div v-if="day === 0">{{turn}}</div>
              <div v-else>
                <div v-if="lessonMapping[`${day}-${turn}`]" v-for="lesson in lessonMapping[`${day}-${turn}`]" :key="lesson.code + lesson.teacher">
                  <small>{{lesson.name}}</small>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import Utils from "@/commons/utils";
  
  export default {
    name: "pc-lesson-schedule",
  
    props: {
      term: String,
      clazz: String,
      week: Number | String,
      excludedTypes: Array | String
    },
  
    data() {
      return {
        lessonMapping: {}
      };
    },
  
    mounted() {
      Utils.newQuery(`/api/term/${this.term}/course`, {
        class: this.clazz,
        week: this.week,
        excludedType: this.excludedTypes
      }).then(response => {
        var mapping = {}
        response.data.forEach(element => {
          const t = element.timePoint;
          mapping[`${t.day}-${t.turn}`] = element.lessons;
        });
        this.lessonMapping = mapping;
      });
    }
  };
</script>

<style>
  
</style>
