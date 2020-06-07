<template>
  <div class="hello" ref="chartdiv">
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);


export default {
  name: 'TopPages',
  props: {
    data: Array
  },
  mounted() {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

    var title = chart.titles.create();
    title.text = "Top pages";
    title.fontSize = 25;
    title.marginBottom = 30;

    chart.padding(40, 40, 40, 40);

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "network";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "network";
    series.dataFields.valueX = "MAU";
    series.tooltipText = "{valueX.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

    var labelBullet = series.bullets.push(new am4charts.LabelBullet())
    labelBullet.label.horizontalCenter = "left";
    labelBullet.label.dx = 10;
    labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.locationX = 1;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function(fill, target){
      return chart.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;
    chart.data = this.$props.data;

    this.chart = chart;
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>
