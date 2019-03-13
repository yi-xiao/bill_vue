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
        methods: {
            init() {
                echarts.init(document.querySelector('#context')).setOption({
                    title: {
                        text: 'ECharts 柱状图',
                        left: 'center'
                    },
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
                echarts.init(document.querySelector('#context2')).setOption({
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
                });
            }
        },
        created () {

        }
    }
</script>
