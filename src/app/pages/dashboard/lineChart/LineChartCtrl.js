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

        var values;

        function getValues() {
            var promised = $http.post('/m/u/getValues')
            promised.then(function success(response) {

                if (response.data.error == 0) {
                    //Actualizar valores de temperatura
                    values = response.data.result
                    //Recargamos la grafica
                    reloadChart()

                } else {
                    console.log('Error: ', response.data)
                }

            }, function failed(data) {

            })

            //Volvemos a llamar a la funcion cada minuto
            setTimeout(function () {
                getValues()
            }, 60000)
        }

        getValues()

        function reloadChart() {
            var arrayValTotal = []
            var arrayValues = []

            angular.forEach(values, function (val) {
                var sqlDate = val.time
                var sqlDate1 = sqlDate.split("-")
                var sqlDate2 = sqlDate1[2].split("T")
                var sqlDate3 = sqlDate2[1].split(":")
                var tHourMinute = (Number(sqlDate3[0])+1) + ":" + sqlDate3[1];

                var data = {time: tHourMinute, temperature: val.temperature,
                            ventiladorPower: val.ventiladorPower, resistenciaPower: val.resistenciaPower}
                arrayValTotal.push(data)
            })

            //Hacemos la media de los valores tomados en el mismo minuto
            var t = arrayValTotal[0].time
            var temp = [arrayValTotal[0].temperature]
            var vent = [arrayValTotal[0].ventiladorPower]
            var res = [arrayValTotal[0].resistenciaPower]

            function add(a,b){
                return a+b
            }

            for (var i=1; i<arrayValTotal.length; i++){
                if(arrayValTotal[i].time == t) {
                    temp.push(arrayValTotal[i].temperature)
                    vent.push(arrayValTotal[i].ventiladorPower)
                    res.push(arrayValTotal[i].resistenciaPower)
                }else{
                    temp = (temp.reduce(add, 0)) / temp.length
                    vent = (vent.reduce(add, 0)) / vent.length
                    res = (res.reduce(add, 0)) / res.length
                    arrayValues.push({time: t, temperature: temp, ventiladorPower: vent, resistenciaPower: res})

                    t = arrayValTotal[i].time
                    temp = [arrayValTotal[i].temperature]
                    vent = [arrayValTotal[i].ventiladorPower]
                    res = [arrayValTotal[i].resistenciaPower]
                }
            }

            temp = (temp.reduce(add, 0)) / temp.length
            vent = (vent.reduce(add, 0)) / vent.length
            res = (res.reduce(add, 0)) / res.length
            arrayValues.push({time: t, temperature: temp, ventiladorPower: vent, resistenciaPower: res})

            //Actualizamos la grafica
            var layoutColors = baConfig.colors;
            var id = $element[0].getAttribute('id');
            var chart = AmCharts.makeChart(id, {
                "type": "serial",
                "theme": "none",
                "color": layoutColors.defaultText,
                "dataDateFormat": "JJ:NN",
                "categoryField": 'time',
                "precision": 2,
                "valueAxes": [{
                    color: layoutColors.defaultText,
                    axisColor: layoutColors.defaultText,
                    gridColor: layoutColors.defaultText,
                    "id": "v1",
                    "title": "Temperature",
                    "position": "left",
                    "autoGridCount": false,
                    "labelFunction": function(value) {
                        return Math.round(value) + "ºC";
                    }
                }, {
                    color: layoutColors.defaultText,
                    axisColor: layoutColors.defaultText,
                    gridColor: layoutColors.defaultText,
                    maximum: 100,
                    "id": "v2",
                    "title": "Power",
                    "gridAlpha": 0,
                    "position": "right",
                    "autoGridCount": false,
                    "labelFunction": function(value) {
                        return value + "%";
                    }
                }],
                "graphs": [{
                    "id": "g1",
                    "valueAxis": "v1",
                    "bullet": "round",
                    "bulletBorderAlpha": 1,
                    "bulletColor": layoutColors.defaultText,
                    color: layoutColors.defaultText,
                    "bulletSize": 5,
                    "hideBulletsCount": 50,
                    "lineThickness": 2,
                    "lineColor": layoutColors.danger,
                    "type": "smoothedLine",
                    "title": "Temperature",
                    "useLineColorForBulletBorder": true,
                    "valueField": "temperature",
                    "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]] ºC</b>"
                }, {
                    "id": "g2",
                    "valueAxis": "v2",
                    color: layoutColors.defaultText,
                    "bullet": "round",
                    "bulletBorderAlpha": 1,
                    "bulletColor": layoutColors.defaultText,
                    "bulletSize": 5,
                    "hideBulletsCount": 50,
                    "lineThickness": 2,
                    "lineColor": layoutColors.info,
                    "type": "smoothedLine",
                    "dashLength": 5,
                    "title": "Ventilador Power",
                    "useLineColorForBulletBorder": true,
                    "valueField": "ventiladorPower",
                    "precision": 0,
                    "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]] %</b>"
                }, {
                    "id": "g3",
                    "valueAxis": "v2",
                    color: layoutColors.defaultText,
                    "bullet": "round",
                    "bulletBorderAlpha": 1,
                    "bulletColor": layoutColors.defaultText,
                    "bulletSize": 5,
                    "hideBulletsCount": 50,
                    "lineThickness": 2,
                    "lineColor": layoutColors.warning,
                    "type": "smoothedLine",
                    "dashLength": 5,
                    "title": "Resistencia Power",
                    "useLineColorForBulletBorder": true,
                    "valueField": "resistenciaPower",
                    "precision": 0,
                    "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]] %</b>"
                }],
                "chartScrollbar": {
                    "graph": "g1",
                    "oppositeAxis": false,
                    "offset": 30,
                    gridAlpha: 0,
                    color: layoutColors.defaultText,
                    scrollbarHeight: 50,
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
                "chartCursor": {
                    "categoryBalloonDateFormat": 'JJ:NN',
                    "pan": true,
                    "cursorColor" : layoutColors.danger,
                    "valueLineEnabled": true,
                    "valueLineBalloonEnabled": true,
                    "cursorAlpha": 0,
                    "valueLineAlpha": 0.2
                },
                "categoryAxis": {
                    "minPeriod": 'mm',
                    "axisColor": layoutColors.defaultText,
                    "color": layoutColors.defaultText,
                    "gridColor": layoutColors.defaultText,
                    "parseDates": true,
                    "dashLength": 1,
                    "minorGridAlpha": 0.1,
                    "gridAlpha": 0.5,
                    "minorGridEnabled": true
                },
                "legend": {
                    "useGraphSettings": true,
                    "position": "top",
                    "color": layoutColors.defaultText
                },
                "balloon": {
                    "borderThickness": 1,
                    "shadowAlpha": 0
                },
                "export": {
                    "enabled": true
                },
                "dataProvider": arrayValues,
                pathToImages: layoutPaths.images.amChart
            });
        }

    }

})();
