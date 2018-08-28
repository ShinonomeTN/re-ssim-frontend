<template>
    <div>
        <div class="mu-paper mu-paper-round mu-elevation-1 week-bar" :class="{activated : hasActivatedWeeks}">
            <mu-flex>
              <mu-flex class="week-button" style="text-align:center;cursor:default">周数</mu-flex>
              <mu-flex v-for="index in maxWeek" :key="index" justify-content="center" fill class="week-button" tag="button" :ref="`wbtn-${index}`">
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
    return {};
  },

  watched:{
      activated : (newVal, oldVal) => {
          this.activated.forEach(element => {
            //   this.$refs[`wbtn-${element}`]
            console.log("activated week list changed");
          });
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
      this.activated ? this.activated : [];
    },

    hasActivatedWeeks(){
        return this.activatedWeeks;
    }
  }
};
</script>

<style scoped>
.week-bar.activated{
    background-color : #009688;
}

.week-bar{
    margin-top:5pt; 
    overflow:hidden;
    background-color: #e0e0e0;
}

.week-button {
  padding: 5pt;

  -webkit-appearance: none;
  border: none;

  color: #9e9e9e;
  background: #e0e0e0;
  cursor: not-allowed;
  
  font-weight: 500;
}

.week-button.activated {
  background: #ff6d00;
}

.week-button.disabled {
  color: #9e9e9e;
  background: #e0e0e0;
  cursor: not-allowed;
}
</style>
