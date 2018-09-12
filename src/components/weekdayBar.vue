<template>
  <div class="ll-container mupaper mupaper-round" style="flex-direction: row; justify-content: center">
    <button v-for="weekday in weekdayMax" :key="weekday" 
          :class="{weekday_tab_activated : tabActivated === weekday }" 
          class="weekday_tab"
          style="flex-grow:1;padding: 5pt" align="center"
          @click="_onClick(weekday)">
          
          {{weekMapping[weekday-1]}}

    </button>
  </div>
</template>

<script>

export default {
  props : {
    weekdayMax : {
      type : Number,
      default: 7
    }
  },

  data : () => ({
    tabActivated: 1
  }),

  methods : {
    clear() {
      this.current = 0;
    },

    _onClick(weekday){
      this.tabActivated = weekday;
      this.$emit("changed",weekday);
    }
  },

  computed : {
    weekMapping: () => ["一", "二", "三", "四", "五", "六", "日"]
  }
}
</script>

<style scoped>
.ll-container {
  display: flex;
  flex-direction: column;
  outline: none;
}

.weekday_tab{
-webkit-appearance: none;
  border: none;

  background: #FFF;

  cursor: pointer;
  font-weight: 500;

  outline: none;
}

.weekday_tab_activated {
  color : #FFF;
  
  background-color: #ff9800;
}
</style>
