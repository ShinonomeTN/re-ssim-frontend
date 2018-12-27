<template>
  <div>
    <!-- Full list view -->
    <div v-if="data && data.length > 0" class="ll-container">
      <weekday-bar class="mu-elevation-2" v-model="currentDay"></weekday-bar>
      <div style="margin-top: 10pt">
        <day-item v-if="currentDay === weekdayIndex" v-for="weekdayIndex in weekdayMax" :key="weekdayIndex" :data="getDayLessons(weekdayIndex)">
          <template slot-scope="scope">
            <slot v-bind:lesson="scope.lesson">
              {{scope.lesson}}
            </slot>
          </template>
        </day-item>
      </div>
    </div>

    <div class="mupaper mupaper-round mu-elevation-1" style="padding : 10pt;" v-else>
      {{placeholder}}
    </div>
  </div>
</template>

<script>
import WeekDayBar from "@/components/weekdayBar";
import DayItem from "./lessonListDayItem";

export default {
  name: "pc-lesson-week-page",

  props: {
    data: {
      type: Array,
      default: []
    },

    weekdayMax: {
      type: Number,
      default: 7
    },

    placeholder: {
      type: String,
      default: "选择班级与周以预览课程"
    }
  },

  components: {
    "weekday-bar": WeekDayBar,
    DayItem
  },

  data: () => ({
    currentDay: 1
  }),

  methods: {
    getDayLessons(day) {
      const data = this.data;
      var result = {};

      for (var i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.timePoint.day === day) {
          result[`${item.timePoint.turn}`] = item.lessons;
        }
      }

      return result;
    }
  }
};
</script>

<style scoped>
.ll-container {
  display: flex;
  flex-direction: column;
}
</style>
