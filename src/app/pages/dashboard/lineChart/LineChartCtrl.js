/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('LineChartCtrl', LineChartCtrl);

  /** @ngInject */
  function LineChartCtrl($scope, baConfig, $element, layoutPaths) {
    var layoutColors = baConfig.colors;
    var id = $element[0].getAttribute('id');
    var lineChart = AmCharts.makeChart(id, {
      type: 'serial',
      theme: 'blur',
      color: layoutColors.defaultText,
      marginTop: 0,
      marginRight: 15,
      dataProvider: [
        {
          time: '10',
          value: 19.2
        },
        {
          time: '10:05',
          value: 19.4
        },
        {
          time: '10:10',
          value: 20.3
        },
        {
          time: '10:15',
          value: 20.1
        },
        {
          time: '10:20',
          value: 21.3
        },
        {
          time: '10:25',
          value: 21.9
        },
        {
          time: '10:30',
          value: 22.5
        },
        {
          time: '10:35',
          value: 23.6
        },
        {
          time: '10:40',
          value: 23.1
        },
        {
          time: '10:45',
          value: 24.5
        },
        {
          time: '10:50',
          value: 22.3
        },
        {
          time: '10:55',
          value: 19.2
        },
        {
          time: '11:00',
          value: 18.6
        }
      ],
      valueAxes: [
        {
          axisAlpha: 0,
          position: 'left',
          title: 'Temperature',
          gridAlpha: 0.5,
          gridColor: layoutColors.border,
        }
      ],
      graphs: [
        {
          id: 'g1',
          balloonText: '[[value]]',
          bullet: 'round',
          bulletSize: 8,
          lineColor: layoutColors.danger,
          lineThickness: 1,
          negativeLineColor: layoutColors.warning,
          type: 'smoothedLine',
          valueField: 'value'
        }
      ],
      chartScrollbar: {
        graph: 'g1',
        gridAlpha: 0,
        color: layoutColors.defaultText,
        scrollbarHeight: 55,
        backgroundAlpha: 0,
        selectedBackgroundAlpha: 0.05,
        selectedBackgroundColor: layoutColors.defaultText,
        graphFillAlpha: 0,
        autoGridCount: true,
        selectedGraphFillAlpha: 0,
        graphLineAlpha: 0.2,
        selectedGraphLineColor: layoutColors.defaultText,
        selectedGraphLineAlpha: 1
      },
      chartCursor: {
        categoryBalloonDateFormat: 'JJ:NN',
        cursorAlpha: 0,
        valueLineEnabled: true,
        valueLineBalloonEnabled: true,
        valueLineAlpha: 0.5,
        fullWidth: true
      },
      dataDateFormat: 'JJ:NN',
      categoryField: 'time',
      categoryAxis: {
        minPeriod: 'mm',
        parseDates: true,
        minorGridAlpha: 0.1,
        minorGridEnabled: true,
        gridAlpha: 0.5,
        gridColor: layoutColors.border,
      },
      export: {
        enabled: true
      },
      creditsPosition: 'bottom-right',
      pathToImages: layoutPaths.images.amChart
    });

    lineChart.addListener('rendered', zoomChart);
    if (lineChart.zoomChart) {
      lineChart.zoomChart();
    }

    function zoomChart() {
      lineChart.zoomToIndexes(Math.round(lineChart.dataProvider.length * 0.4), Math.round(lineChart.dataProvider.length * 0.55));
    }
  }

})();
