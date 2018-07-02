<template>
    <div class="row">
        <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <div class="panel panel-primary">
                <div class="panel-body">
                    <div class="page-head">
                        <h3>班级课表</h3>
                    </div>
                    <div>
                        <label>班级</label>
                        <input type="text">
                    </div>
                    <div>
                        <label>周</label>
                        <input type="number">
                    </div>
                    <div>
                        <label>排除课程类型</label>
                        <input type="check">
                    </div>
                    <div>
                        <button class="btn btn-success btn-block">查询</button>
                        <router-link to="/" class="btn btn-block btn-default">返回</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "classQuery"
};
</script>
