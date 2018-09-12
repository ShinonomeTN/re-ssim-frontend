<template>
    <div>
        <div class="mu-paper mu-paper-round week-bar" v-bind:class="{activated : hasActivatedWeeks}">
            <mu-flex>
              <mu-flex v-bind:class="{activated : hasActivatedWeeks}" class="week-bar-header" style="text-align:center;cursor:default">周</mu-flex>
              <mu-flex 
                v-for="index in max" 
                :key="index" 
                justify-content="center" 
                fill 
                class="week-button" 
                v-bind:class="{available : activated.includes(index), activated : current === index}" 
                tag="button"
                @click="_onWeekButtonClick(index)">

                {{index + (min - 1)}}
              </mu-flex>
            </mu-flex>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    max: {
      type: Number,
      default: 0
    },

    min: {
      type: Number,
      default: 0
    },

    activated: {
      type: Array,
      default: []
    }
  },

  data() {
    return {
      current: 0
    };
  },

  methods: {
    _onWeekButtonClick(index) {
      if (!this.activated.includes(index)) return;

      this.current = index;
      this.$emit("changed", index);
    },

    select(week) {
      if (week) this._onWeekButtonClick(week);
      else this.clearSelected();
    },

    clearSelected() {
      this.current = 0;
    }
  },

  watch: {
    activated(newVal, oldVal) {
      if (!this.activated.includes(this.current)) this.clearSelected();
    }
  },

  computed: {
    hasActivatedWeeks() {
      return this.activated.length > 0;
    }
  }
};
</script>

<style scoped>
.week-bar.activated {
  background-color: #2196f3;
}

.week-bar {
  overflow: hidden;
  background-color: #e0e0e0;

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
  background-color: #2196f3;
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

  width: 2em;
}

.week-button.available {
  background: #2196f3;
  color: #fff;
  cursor: pointer;
}

.week-button.activated {
  background: #ff9800;
  color: #fff;
}

.week-button.disabled {
  color: #9e9e9e;
  background: #e0e0e0;
  cursor: not-allowed;
}
</style>
