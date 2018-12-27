export default {
  path: "staff",
  component: require("@/views/admin"),
  children: [{
    path: "login",
    component: resolve => require(["@/views/admin/managerLogin"], resolve)
  }]
}