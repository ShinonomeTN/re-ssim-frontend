<template>
<select 
    ref="select"
    class="form-control selectpicker"
    :data-live-search="liveSearch"
    :title="placeholder" 
    :multiple="multiple"

    :value="value" 
    @input="$emit('input',$event.target.value)">
    <option v-for="option in options" :value="option">{{option}}</option>
</select>
</template>

<script>
export default {
  props: ["options", "placeholder", "liveSearch", "multiple", "value"],

  mounted() {
    const select = $(this.$refs.select);
    this.value = select.value;
  },

  updated() {
    $(this.$refs.select).selectpicker("refresh");
  },

  beforeDestory() {
    $(this.$refs.select)
      .off()
      .selectpicker("destory");
  }
};
</script>

<style>
</style>

