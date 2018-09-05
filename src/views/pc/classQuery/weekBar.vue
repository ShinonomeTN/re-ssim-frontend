<template>
    <div>
        <div class="mu-paper mu-paper-round week-bar" v-bind:class="{activated : hasActivatedWeeks}">
            <mu-flex>
              <mu-flex v-bind:class="{activated : hasActivatedWeeks}" class="week-bar-header" style="text-align:center;cursor:default">周</mu-flex>
              <mu-flex 
                v-for="index in maxWeek" 
                :key="index" 
                justify-content="center" 
                fill 
                class="week-button" 
                v-bind:class="{available : activated.includes(index), activated : current === index}" 
                tag="button"
                @click="onWeekButtonClick(index)">

                {{index + (minWeek - 1)}}
              </mu-flex>
            </mu-flex>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    max: Number,
    min: Number,
    activated: Array
  },

  data() {
    return {
      current : 0
    };
  },

  methods : {
    onWeekButtonClick(index) {
      this.current = index;
      this.$emit("changed",index);
    }
  },

  computed: {
    maxWeek() {
      return this.max ? this.max : 0;
    },

    minWeek() {
      return this.min ? this.min : 0;
    },

    activatedWeeks() {
      return this.activated ? this.activated : [];
    },

    hasActivatedWeeks() {
      return this.activatedWeeks.length > 0;
    }
  }
};
</script>

<style scoped>
.week-bar.activated {
  background-color: #009688;
}

.week-bar {
  overflow: hidden;
  background-color: #fff;

  outline: none;
}

.week-bar-header {
  padding: 5pt;

  -webkit-appearance: none;
  border: none;

  color: #9e9e9e;
  background: #e0e0e0;
  cursor: not-allowed;

  font-weight: 500;
}

.week-bar-header.activated {
  color: #fff;
  background-color: #009688;
}

.week-button {
  padding: 5pt;

  -webkit-appearance: none;
  border: none;

  color: #9e9e9e;
  background: #e0e0e0;
  cursor: not-allowed;

  font-weight: 500;

  outline: none;
}

.week-button.available {
  background: #009688;
  color: #fff;
  cursor: pointer;
}

.week-button.activated {
  background: #ff6d00;
  color: #fff;
}

.week-button.disabled {
  color: #9e9e9e;
  background: #e0e0e0;
  cursor: not-allowed;
}
</style>
