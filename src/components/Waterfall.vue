<template>
    <div class="waterfall">
        <div class="waterfall-item" v-for="(item, index) in wList"
             :style="{top: item.top + 'px', left: item.left + 'px', width: item.width + 'px', height: item.height + 'px'}">
            <img class="waterfall-img" :src="list[index].objurl"/>
            <button class="waterfall-more" @click="reqMore(index)"></button>
        </div>
        <button class="waterfall-append" @click="append"></button>
    </div>
</template>

<script>
    import Wfall from '../assets/waterfall';
    import json from '../assets/data';

    export default {
        name: 'waterfall',
        props: {
            msg: String
        },
        data() {
            return {
                list: [],
                wList: []
            }
        },
        methods: {
            reqMore(index) {
                setTimeout(_ => {
                    this.updateList(index + 1, json.data);
                }, 500);
            },
            updateList(offset, list) {
                this.wfall.insert(offset, list);

                const dataList = [...this.list];
                dataList.splice(offset, 0, ...list);

                this.list = dataList;
                this.wList = this.wfall.getWfallList();
            },
            append() {
                const list = json.data;

                this.wfall.append(list);

                this.list = [...this.list].concat(list);
                this.wList = this.wfall.getWfallList();
            }
        },
        created() {
            this.list = json.data;
        },
        mounted() {
            this.wfall = new Wfall(this.$el.clientWidth, 2, 2, 2, json.data);
            this.wList = this.wfall.getWfallList();
        }
    }
</script>

<style scoped>
    .waterfall {
        position: relative;
    }

    .waterfall-item {
        position: absolute;
        display: inline-block;
        transition: 0.5s;
    }

    .waterfall-img {
        width: 100%;
        height: 100%;
    }

    .waterfall-more {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 30px;
        height: 30px;
        background: url("https://mms-graph.cdn.bcebos.com/activity/icon_tag.png") no-repeat center;
        background-size: contain;
    }

    .waterfall-append {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 30px;
        height: 30px;
        background: url("../assets/more.png") no-repeat center;
        background-size: contain;
        border: none;
    }
</style>
