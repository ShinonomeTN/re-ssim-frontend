<template>
<div class="row">
    <div class="col-sm-6 col-sm-offset-3">
        <div class="panel panel-primary">
            <div class="panel-body welcome-panel-header">
                <h3><small>2017-2018 学年第一学期</small><br><span>7 月 1 日，第二十周 星期一</span></h3>
            </div>
            <div class="list-group">
                <a href="#" class="list-group-item">班级课表</a>
                <a href="#" class="list-group-item">教师课表</a>
                <a href="#" class="list-group-item">课程一览</a>
            </div>
            <div class="panel-footer">
                <router-link to="/histories" class="btn btn-default btn-sm pull-right">历史学期</router-link>
                <div class="clearfix">
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name : "current"
}
</script>