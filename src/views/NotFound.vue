<template>
    <div>
        <h1>404 NotFound</h1>
        <ul>
            <li>出现未知错误，请检查你输入的网址是否正确。</li>
            <li>请检查你是否正确链接网络。</li>
            <li>如果你设置了代理服务器，请联系管理员。</li>
        </ul>
        <router-link to="/money">返回首页</router-link>
    </div>
</template>

<script>
    export default {
        name: "NotFound"
    }
</script>

<style scoped>

</style>