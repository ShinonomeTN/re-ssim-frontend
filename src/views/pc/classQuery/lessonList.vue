<template>
    <!-- <mu-paper :z-depth="1"> -->
      <div v-if="data && data.length > 0" class="ll-container mupaper mupaper-round mu-elevation-4">
        
        <div v-for="weekdayHead in weekdaysMax" :key="weekdayHead" style="display: flex;">

          <div class="week_head">{{weekMapping[weekdayHead - 1]}}</div>

          <div class="lesson_turns">
            <div v-for="lessonHead in lessonAmount" :key="lessonHead" class="ll-container" style="padding : 2pt ;flex-direction: row;">
              <div class="lesson_head mupaper mupaper-round mu-elevation-1">{{lessonHead}}</div>
              <div style="flex-grow:1">
                content
              </div>
            </div>
          </div>

        </div>

      </div>
      <div v-else>空</div>
    <!-- </mu-paper> -->
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    },

    weekdaysMax: {
      type: Number,
      default: 7
    },

    lessonAmount: {
      type: Number,
      default: 10
    }
  },

  data: () => ({}),

  computed: {
    weekMapping: () => ["一", "二", "三", "四", "五", "六", "日"]
  }
};
</script>

<style scoped>
.week_head {
  padding: 10pt;
  margin: 3pt 0;

  display: flex;
  flex-direction: column;
  justify-content: center;

  border-right: solid 2pt #9e9e9e;
}

.ll-container {
  display: flex;
  flex-direction: column;
  outline: none;
}

.lesson_turns {
  margin: 3pt;
  flex-grow: 1;
}

.lesson_head {
  padding: 0 3pt;
  margin-right: 3pt;
  text-align: center;
  width: 2em;
}
</style>
