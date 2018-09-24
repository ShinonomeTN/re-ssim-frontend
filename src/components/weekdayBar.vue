<template>
  <div class="ll-container mupaper mupaper-round" style="flex-direction: row; justify-content: center">
    <button v-for="weekday in weekdayMax" :key="weekday" 
          :class="{weekday_tab_activated : value === weekday }" 
          class="weekday_tab"
          style="flex-grow:1;padding: 5pt" align="center"
          @click="_onClick(weekday)">
          
          {{weekNameMapping[weekday-1]}}
          
    </button>
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "changed"
  },

  props: {
    value: {
      type: Number,
      default: 0
    },

    weekdayMax: {
      type: Number,
      default: 7
    },

    weekNameMapping: {
      type: Array,
      default: () => ["一", "二", "三", "四", "五", "六", "日"]
    }
  },

  methods: {
    clear() {
      this.$emit("changed", 0);
    },

    _onClick(weekday) {
      this.$emit("changed", weekday);
    }
  }
};
</script>

<style scoped>
.ll-container {
  display: flex;
  flex-direction: column;
  outline: none;
}

.weekday_tab {
  -webkit-appearance: none;
  border: none;

  background: #fff;

  cursor: pointer;
  font-weight: 500;

  outline: none;
}

.weekday_tab_activated {
  color: #fff;

  background-color: #ff9800;
}
</style>
