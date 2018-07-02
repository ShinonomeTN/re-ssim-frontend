<template>
<div class="row">
    <div class="col-sm-6 col-sm-offset-3">
        <div class="panel panel-primary">
            <div class="panel-body">
                <h3>历史学期</h3>
            </div>
            <div class="list-group">
                <a href="#" class="list-group-item">2017-2018 年第一学期</a>
                <a href="#" class="list-group-item">2016-2017 年第一学期</a>
                <a href="#" class="list-group-item">2015-2016 年第一学期</a>
                <a href="#" class="list-group-item">2014-2015 年第一学期</a>
            </div>
            <div class="panel-footer">
                <router-link to="/" class="btn btn-default btn-sm pull-right">返回</router-link>
                <div class="clearfix">
            </div>
            </div>
        </div>
    </div>
</div>
</template>
<style>
h3 {
    margin-top: 10pt;
}
</style>
<script>
export default {
    name : "histories"
}
</script>
