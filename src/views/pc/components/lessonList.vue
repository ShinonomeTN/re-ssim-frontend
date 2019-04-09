<template>
  <div>
    <!-- Full list view -->
    <div
      v-if="data && data.length > 0"
      class="ll-container"
    >
      <day-item
        v-for="weekdayIndex in weekdayMax"
        :key="weekdayIndex"
        :weekday="weekMapping[weekdayIndex - 1]"
        :data="getDayLessons(weekdayIndex)"
      >
        <template slot-scope="scope">
          <slot v-bind:lesson="scope.lesson">
            {{scope.lesson}}
          </slot>
        </template>
      </day-item>
    </div>

    <div
      class="mupaper mupaper-round mu-elevation-1"
      v-else
    >
      <div style="padding: 10pt">{{placeholder}}</div>
    </div>
  </div>
</template>

<script>
import WeekdayBar from "@/components/weekdayBar";
import DayItem from "./lessonListDayItem";

export default {
  name: "pc-lesson-list",

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
    "day-item": DayItem
  },

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
  },

  computed: {
    weekMapping: () => ["一", "二", "三", "四", "五", "六", "日"]
  }
};
</script>

<style scoped>
</style>
