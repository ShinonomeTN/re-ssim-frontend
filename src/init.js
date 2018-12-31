import Toast from "muse-ui-toast";
import store from "@/store";

import Utils from "@/commons/utils";

function updateCalendar() {
  Utils.newRequest("/api/term/calendar")
    .then(resp => {
      const data = resp.data;

      if (data) {
        store.commit("pushNewCalendar", data);
      } else {
        Toast.info("现在是假期");
        store.commit("pushNewCalendar", {
          week: 0
        });
      }
    })
    .catch(err => {
      console.log(err);
      Toast.warning("无法获取校历！");
      store.commit("pushNewCalendar", {
        week: 0
      });
    });
}

function updateTermList() {
  Utils.newRequest("/api/term")
    .then(r => {
      const data = r.data;

      if (!data || data.length <= 0) {
        Toast.warning("没有学期数据！");
      } else {
        store.commit("updateSchoolTerms", data);
      }
    })
    .catch(err => {
      console.log(err);
      Toast.warning("获取学期数据失败");
    });
}

export default function() {
  updateCalendar();
  updateTermList();
};
