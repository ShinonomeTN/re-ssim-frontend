<template>
<div class="row">
    <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <div class="panel panel-primary">
            <div class="panel-heading welcome-panel-header">
                <h3><small style="color : white">{{termName}}</small><br><span>7 月 1 日，第{{termWeek}} 星期一</span></h3>
            </div>
            <div class="list-group">
                <router-link v-for="(item,index) in functionList" :key="index" :to="item.to" class="list-group-item">{{item.title}}</router-link>
                <!-- <router-link to="/courses/teacher" class="list-group-item">教师课表</router-link>
                <router-link to="/courses" class="list-group-item">课程一览</router-link> -->
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
    name : "current",
    data : () => {
        return {
            termName : "2017-2018学年第一学期",
            termWeek : "二十周",
            functionList : [{
                title : "班级课表",
                to : "/courses/class"
            },{
                title : "教师课表",
                to : "/courses/teacher"
            },{
                title : "课程一览",
                to : "/courses"
            }]
        }
    }
}
</script>