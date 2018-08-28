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
import UX from "@/commons/ux";

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
          UX.toast(`OwO +${this.counter} `, defaultToastSettings);
          break;
        case 50:
          UX.toast(`O_o +${this.counter} `, defaultToastSettings);
          break;
        case 100:
          UX.toast(`咕咕 +${this.counter}`, defaultToastSettings);
          this.counter = 0;
          break;
        default:
          if (this.counter % 5 === 0) {
            UX.toast(`+${this.counter}`, defaultToastSettings);
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
