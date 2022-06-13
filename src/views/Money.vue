<template>
    <Layout class-prefix="layout">
        <NumberPad/>
        <Types/>
        <Notes/>
        <Tags :data-source="tags" v-on:getTags="tagsInfo"/>
    </Layout>
</template>

<script lang="js">
    import NumberPad from '@/components/Money/NumberPad.vue';
    import Types from '@/components/Money/Types.vue';
    import Notes from '@/components/Money/Notes.vue';
    import Tags from '@/components/Money/Tags.vue';

    export default {
        name: 'Money',
        components: {Tags, Notes, Types, NumberPad},
        data() {
            return {
                tags: ['衣', '食', '住', '行','娱乐']
            }
        },
        methods:{
            tagsInfo(name){
                this.tags.push(name)
            }
        }
    };
</script>
<style lang="scss">
    .layout-body-content {
        display: flex;
        flex-direction: column-reverse;
    }
</style>
