import store from "@/store";

import AdminContainer from "@/views/admin";
import ManagerLogin from "@/views/admin/managerLogin";

export default {
  path: "/staff",
  component: AdminContainer,
  children: [{
    path: "login",
    alias: "",
    component: ManagerLogin,
    meta: {
      appBar: {
        title: "课表查询 - 登录",
        navBack: true
      }
    }
  }]

};