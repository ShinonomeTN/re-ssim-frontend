<template>
  <div class="mupaper mupaper-round mu-elevation-4" style="display: flex; background : #FFFFFF; margin-bottom: 10pt">
    <div class="week_head" v-if="weekday" :class="{head_activated : !noData}">{{weekday}}</div>
    <!-- Turn list -->
    <div class="lesson_turns" v-if="!noData">
      <div v-for="lessonHead in maxLessonCount" :key="lessonHead" class="ll-container" style="padding : 2pt 2pt 2pt 0 ;flex-direction: row;">
        <!-- Turn header -->
        <div class="turn_head ll-container" :class="{ head_activated : data[`${lessonHead}`] }">{{lessonHead}}</div>
        <!-- Lesson content -->
        <div style="flex-grow:1">
          <div v-for="(lesson,index) in data[`${lessonHead}`]" :key="index">
            <div v-if="lesson" class="turn_item">
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

    <!-- If data is empty -->
    <div v-else class="ll-container" style="justify-content: center; aligin-items:center">
      <div class="turn-head" style="margin-left: 10pt; padding : 10pt">无课</div>
    </div>
  </div>
</template>

<script>
import Utils from "@/commons/utils";

export default {
  props: {
    weekday: {
      type: String,
      defalut : ""
    },

    maxLessonCount: {
      type: Number,
      default: 12
    },

    data: {
      type: Object,
      defalut: {}
    }
  },

  computed : {
    noData() {
      return Object.keys(this.data).length === 0;
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
  border-bottom: solid 1pt #a0a0a0;
}
</style>
