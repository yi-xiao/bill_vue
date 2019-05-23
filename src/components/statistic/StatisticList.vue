<template>
    <div class="charts-container">
        <!--<p>图形展示</p>-->
        <div id="context"></div>
        <div id="context2"></div>
        <div id="context3"></div>
    </div>
</template>
<style scope>
    #context, #context2, #context3{
        min-width: 400px;
        min-height: 500px;
        margin: 30px auto;
    }
</style>
<script>
    //整体引入
    // import echarts from 'echarts'

    //按需加载(时刻注意，很容易漏引用)
    import echarts from 'echarts/lib/echarts'
    // 引入柱状图、饼图组件
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/chart/pie'
    // 引入提示框、title、legend、legendScroll组件
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/legendScroll'

    import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
                seriesData: [
                    {
                        name: '爱新觉罗',
                        value: 1000
                    },
                    {
                        name: '蒙娜丽莎',
                        value: 2000
                    },
                    {
                        name: '莎士比亚',
                        value: 3000
                    },
                    {
                        name: '唐吉坷德',
                        value: 5000
                    },
                ],
                legendData: ['爱新觉罗','蒙娜丽莎','莎士比亚','唐吉坷德',],
                selectedData: {
                    '爱新觉罗': true,
                    '蒙娜丽莎': true,
                    '莎士比亚': true,
                    '唐吉坷德': true,
                },
            }
        },
        mounted() {//dom节点挂载完毕执行
            this.init()
        },
        computed: {
            ...mapGetters({
                recordList: 'getRecordList'
            })
        },
        methods: {
            init() {
                // console.log(this.recordList)
                echarts.init(document.querySelector('#context')).setOption(
                    this.formatData()
                );
                // echarts.init(document.querySelector('#context2')).setOption(
                //     this.formatData({ type: 1 })
                // );
            },
            formatData({ type = 0 } = {}){
                switch (type) {
                    case 1:
                        //todo.. 数据处理
                        return {
                            title: {
                                text: 'ECharts 饼图',
                                left: 'center',
                                x:'center'
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                type: 'scroll',
                                orient: 'vertical',
                                right: 10,
                                top: 20,
                                bottom: 20,
                                data: this.legendData,
                                selected: this.selectedData,
                                label: {
                                    normal: {
                                        formatter: '{b} {d}%'
                                    }
                                },
                            },
                            series: [
                                {
                                    name: '姓名',
                                    type: 'pie',
                                    radius : '55%',
                                    center: ['40%', '50%'],
                                    data: this.seriesData,
                                    label: {
                                        normal: {
                                            formatter: '{b} {c} {d}%'
                                        }
                                    },
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
                        }
                        break
                    default:
                        let userGroup = {}, dataList = [];
                        //按用户归类
                        this.recordList.filter(item => {
                            if(!item.category_info.type){
                                let obj = userGroup[item.user.id];
                                if(!obj) obj = []
                                obj.push(item)
                                userGroup[item.user.id] = obj;
                            }
                        })
                        //变成数组
                        for(let i in userGroup){
                            dataList.push(userGroup[i])
                        }
                        //组合需要用到的数据
                        dataList = dataList.map(item => {
                            let price = 0;
                            item.filter(item => price+= item.price)
                            return {
                                name: item[0].user.name,
                                price: price/100
                            }
                        })
                        return {
                            title: {
                                text: '成员支出柱状图',
                                left: 'center'
                            },
                            tooltip: {},
                            xAxis: {
                                data: dataList.map(item => item.name)
                            },
                            yAxis: {},
                            series: [{
                                name: '支出',
                                type: 'bar',
                                data: dataList.map(item => item.price)
                            }]
                        }
                        break
                }
            }
        },
        created () {

        }
    }
</script>
