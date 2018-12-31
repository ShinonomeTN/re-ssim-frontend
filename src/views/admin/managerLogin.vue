<template>
  <div style="margin-top: 60pt">
    <div class="row">
      <div class="col-md-7 col-lg-8"></div>
      <div class="col-md-6 col-lg-4">
        <mu-paper :z-depth="1" style="padding: 10pt; margin-bottom: 10pt">
          <div style="font-size:x-large">登录系统</div>
          <div>暂时只有管理员可登录系统并操作管理后台</div>
        </mu-paper>
        <mu-paper :z-depth="1" style="padding: 10pt">
          <mu-form ref="form" :model="loginForm">
            <mu-form-item label="用户名" help-text="英文用户名" prop="username" :rules="usernameRules">
              <mu-text-field v-model="loginForm.username" prop="username"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="密码" prop="password" :rules="passwordRules">
              <mu-text-field type="password" v-model="loginForm.password" prop="password"></mu-text-field>
            </mu-form-item>
          </mu-form>
          <mu-button color="primary" @click="submit" full-width>登录</mu-button>
        </mu-paper>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pc-staff-login",

  mounted() {},

  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },

      usernameRules: [
        { validate: val => !!val, message: "用户名不能为空" },
        {
          validate: val => val.length >= 6,
          message: "用户名太短"
        }
      ],
      passwordRules: [
        { validate: val => !!val, message: "密码不能为空" },
        {
          validate: val => val.length >= 6 && val.length <= 64,
          message: "密码长度不在范围"
        }
      ]
    };
  },

  methods: {
    submit() {
      this.$refs.form.validate().then(r => {
        if (r) {
          console.log(r);
        } else {
        }
      });
    }
  }
};
</script>

<style>
</style>
