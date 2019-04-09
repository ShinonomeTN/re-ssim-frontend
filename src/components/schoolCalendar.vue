<template>
  <div style="text-align:center; font-size:x-large">{{termText}}<br>
    <small>{{date.getMonth() + 1}} 月 {{date.getDate()}} 日<span v-if="hasTerm">，第{{chineseTermWeek}}周</span> 星期{{chineseWeek}}</small>
  </div>
</template>

<script>
import Utils from "@/commons/utils";

export default {
  props: {
    calendar: {
      type: Object,
      default: function() {
        return {
          day: 0,
          term: null,
          week: 1
        };
      }
    }
  },

  data() {
    return {
      date: new Date()
    };
  },

  computed: {
    hasTerm() {
      return !!this.calendar.term;
    },

    termText() {
      const currentTerm = this.calendar.term;
      return !currentTerm ? "假期" : currentTerm;
    },

    chineseWeek() {
      return Utils.chineseWeekdayOf(this.date.getDay());
    },

    chineseTermWeek() {
      return Utils.chineseNumberOf(this.calendar.week);
    }
  }
};
</script>

<style scoped>
</style>
