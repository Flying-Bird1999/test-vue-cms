<template>
  <div class="handleTeam">
    <div class="item">
      <div class="words">
        <h1>队伍评分柱形图</h1>
      </div>
      <div id="main"
           ref="chart"
           style="width: 100%;height:420px;"></div>
    </div>
    <div class="item">
      <div class="words">
        <h1>队伍评分折线图</h1>
      </div>
      <div id="main1"
           ref="chart1"
           style="width: 100%;height:420px;"></div>
    </div>

  </div>
</template>

<script>
import { getScore } from "../../api/http";
import echarts from 'echarts'
export default {
  data () {
    return {
      myChart: '',
      myChart1: '',
      teams: [],
      score: []
    }
  },
  created () {
    getScore().then(res => {
      if (res.data.code === 200) {
        console.log(res.data.data);
        this.teams = res.data.data.map(item => item.teamName)
        this.score = res.data.data.map(item => item.score)
        this.init()
        this.init1()
      }
    })
  },
  mounted () {
    window.onresize = () => {
      this.myChart.resize()
      this.myChart1.resize()
    }
  },
  methods: {
    init () {
      this.myChart = echarts.init(this.$refs.chart);

      // 指定图表的配置项和数据
      let option = {
        title: {
          text: ''
        },
        tooltip: {},
        legend: {
          data: ['队伍评分']
        },
        xAxis: {
          data: this.teams
        },
        yAxis: {},
        series: [{
          name: '队伍评分',
          type: 'bar',
          data: this.score,
          showBackground: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          },
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },
    init1 () {
      // 基于准备好的dom，初始化echarts实例
      this.myChart1 = echarts.init(this.$refs.chart1);

      // 指定图表的配置项和数据
      let option = {
        title: {
          text: ''
        },
        tooltip: {},
        legend: {
          data: ['队伍评分']
        },
        xAxis: {
          data: this.teams
        },
        yAxis: {},
        series: [
          {
            name: '队伍评分',
            data: this.score,
            type: 'line',
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.myChart1.setOption(option);
    }
  }
}
</script>

<style scoped lang="scss">
.handleTeam {
  display: flex;
  margin-top: 10px;
  .item {
    background: #f2f6fc;
    border-radius: 8px;
    margin-right: 30px;
    box-shadow: 5px 5px 5px #e4e7ed;
    max-width: 550px;
    width: 100%;
    .words {
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 2px solid #dcdfe6;
      h1 {
        font-size: 22px;
        color: #606266;
      }
    }
  }
}
</style>