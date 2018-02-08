/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('LineChartCtrl', LineChartCtrl);

    /** @ngInject */
    function LineChartCtrl($scope, $http, baConfig, $element, layoutPaths) {
        var layoutColors = baConfig.colors;
        var id = $element[0].getAttribute('id');

        var temperatures;

        function getTemperatures() {
            var promised = $http.post('/m/u/getTemperatures')
            promised.then(function success(response) {

                if (response.data.error == 0) {
                    //Actualizar valores de temperatura
                    temperatures = response.data.result
                    //Recargamos la grafica
                    reloadChart()

                } else {
                    console.log('Error: ', response.data)
                }

            }, function failed(data) {

            })

            //Volvemos a llamar a la funcion cada un minuto
            setTimeout(function () {
                getTemperatures()
            }, 60000)
        }

        getTemperatures()

        function reloadChart() {
            var arrayTempTotal = []

            angular.forEach(temperatures, function (temp) {
                var sqlDate = temp.time
                var sqlDate1 = sqlDate.split("-")
                var sqlDate2 = sqlDate1[2].split("T")
                var sqlDate3 = sqlDate2[1].split(":")
                var tHourMinute = (Number(sqlDate3[0])+1) + ":" + sqlDate3[1];

                var data = {time: tHourMinute, value: temp.temperature}
                arrayTempTotal.push(data)
            })

            //Hacemos la media de la temperatura tomada en el mismo minuto
            var t = arrayTempTotal[0].time
            var v = [arrayTempTotal[0].value]
            var arrayTemp = []

            function add(a,b){
                return a+b
            }

            for (var i=1; i<arrayTempTotal.length; i++){
                if(arrayTempTotal[i].time == t)
                    v.push(arrayTempTotal[i].value)
                else{
                    v = (v.reduce(add, 0)) / v.length
                    arrayTemp.push({time: t, value: v})

                    t = arrayTempTotal[i].time
                    v = [arrayTempTotal[i].value]
                }
            }
            v = (v.reduce(add, 0)) / v.length
            arrayTemp.push({time: t, value: v})

            //Actualizamos la grafica
            var lineChart = AmCharts.makeChart(id, {
                type: 'serial',
                theme: 'blur',
                color: layoutColors.defaultText,
                marginTop: 0,
                marginRight: 15,
                dataProvider: arrayTemp,
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
                        lineColor: layoutColors.warning,
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

    }

})();
