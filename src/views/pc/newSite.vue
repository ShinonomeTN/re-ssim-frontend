<template>
    <div class="container" style="margin-top:30pt">
        <mu-paper :z-depth="1" style="padding:10pt">
            <div align="center">
                <h1>服务器新开张，还请稍等哈</h1>
                <p>服务器数据还没准备好，服务暂时不可用，敬请期待！</p>
                <div>
                    <mu-button @click='buttonClick()' :color="currentColor?currentColor:'secondary'">催促服务器</mu-button>
                </div>
            </div>
        </mu-paper>
    </div>
</template>

<script>
import Toast from 'muse-ui-toast';

const colors = ["secondary", "primary", "success", "warning", "info", "error"];

export default {
  data: () => ({
    counter: 0,
    currentColor: "secondary"
  }),

  methods: {
    buttonClick() {
      this.counter++;

      const defaultToastSettings = {
        theme: "primary",
        position: "top-right",
        duration: 1000,
        icon: "info"
      };

      switch (this.counter) {
        case 10:
          Toast.info(`OwO +${this.counter} `, defaultToastSettings);
          break;
        case 50:
          Toast.info(`O_o +${this.counter} `, defaultToastSettings);
          break;
        case 100:
          Toast.info(`咕咕 +${this.counter}`, defaultToastSettings);
          this.counter = 0;
          break;
        default:
          if (this.counter % 5 === 0) {
            Toast.info(`+${this.counter}`, defaultToastSettings);
            this.$router.push("/");
          }
          break;
      }

      this.currentColor =
        colors[Math.round(this.counter / 100 * (colors.length - 1))];
      console.log(this.currentColor);
    }
  }
};
</script>

<style>
</style>
