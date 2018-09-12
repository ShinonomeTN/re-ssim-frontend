<template>
  <div v-if="data && data.length > 0" class="ll-container mupaper mupaper-round mu-elevation-4" style="background : #FFFFFF">
    
    <div v-for="weekdayHead in weekdaysMax" :key="weekdayHead" style="display: flex;">

      <div class="week_head" :class="{head_activated : daysHasLessons[weekdayHead]}">{{weekMapping[weekdayHead - 1]}}</div>

      <div class="lesson_turns" v-if="daysHasLessons[weekdayHead]">
        <div v-for="lessonHead in lessonAmount" :key="lessonHead" class="ll-container" style="padding : 2pt 2pt 2pt 0 ;flex-direction: row;">
          <div class="turn_head ll-container" :class="{ head_activated : mappedTurn[`${weekdayHead}-${lessonHead}`] }">{{lessonHead}}</div>
          
          <div style="flex-grow:1">
            <div class="turn_item" v-for="(lesson,index) in mappedTurn[`${weekdayHead}-${lessonHead}`]" :key="index">
              <div v-if="lesson" style="border-bottom: solid 1pt #A0A0A0">
                <div>
                  <mu-badge :content="lesson.code" color="primary"></mu-badge> 
                  {{lesson.name}}（{{lesson.classType}})
                </div>
                <div style="padding-left: 10pt"><small>{{lesson.position}}， {{lesson.teacher}} 任课</small></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="ll-container" style="justify-content: center; aligin-items:center">
        <div class="turn-head" style="margin-left: 10pt">无课</div>
      </div>

    </div>

  </div>

  <div class="mupaper mupaper-round mu-elevation-1" v-else>
    <div style="padding: 10pt; align-items: center; justify-content: center;" class="ll-container">无数据</div>
  </div>
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
      default: 12
    }
  },

  data: () => ({}),

  methods: {
    getTurnLessons(day, turn) {
      for (var i = 0; i < this.data.length; i++) {
        if (
          this.data[i].timePoint.day === day &&
          this.data[i].timePoint.turn === turn
        )
          return this.data[i];
      }
    }
  },

  computed: {
    weekMapping: () => ["一", "二", "三", "四", "五", "六", "日"],

    mappedTurn() {
      var mapping = {};
      for (var i = 0; i < this.data.length; i++) {
        const data = this.data[i];
        mapping[`${data.timePoint.day}-${data.timePoint.turn}`] = data.lessons;
      }
      return mapping;
    },

    daysHasLessons() {
      var mapping = {};

      for (var i = 0; i < this.data.length; i++) {
        const data = this.data[i];
        mapping[`${data.timePoint.day}`] = true;
      }

      return mapping;
    }
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
}

.turn_head {
  padding: 0 3pt 0 0;
  margin-right: 3pt;
  text-align: center;

  width: 2em;
  align-items: center;
  justify-content: center;

  border-right: solid 2pt #9e9e9e;
}

.head_activated {
  border-right-color: #ff9800;
}

.turn_item {
}
</style>
