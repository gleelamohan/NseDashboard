
app.controller('FODashboard', function ($scope, $http) {

    $scope.data = [{ values: [] }];

    $scope.data1 = [
        {
            key: "Volume Delta",
            values: []
        }
    ];

    $scope.data2 = [
       {
           key: "Qunatity Delta",
           values: []
       }
    ];

    $scope.options = {
        chart: {
            type: 'candlestickBarChart',
            height: 200,
            margin: {
                top: 20,
                right: 20,
                bottom: 40,
                left: 60
            },
            x: function (d) { return d['date']; },
            y: function (d) { return d['close']; },
            duration: 100,

            xAxis: {
                axisLabel: '',
                tickFormat: function (d) {
                    return d3.time.format('%x')(new Date(d));
                },
                showMaxMin: false
            },

            yAxis: {
                axisLabel: '',
                tickFormat: function (d) {
                    return 'Rs ' + d3.format(',.1f')(d);
                },
                showMaxMin: false
            },
            zoom: {
                enabled: true,
                scaleExtent: [1, 10],
                useFixedDomain: false,
                useNiceScale: false,
                horizontalOff: false,
                verticalOff: true,
                unzoomEventType: 'dblclick.zoom'
            }
        }
    };

    $scope.options1 = {
        chart: {
            type: 'discreteBarChart',
            height: 200,
            margin: {
                top: 20,
                right: 20,
                bottom: 50,
                left: 55
            },
            x: function (d) { return d.label; },
            y: function (d) { return d.value; },
            showValues: false,
            valueFormat: function (d) {
                return d3.format(',.2f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: ''
            },
            yAxis: {
                axisLabel: '',
                axisLabelDistance: -10
            }
        }
    };

    function intiilizeCommon() {

        //var inputparams = [];
        $scope.resultset = [];
        ////inputparams.push(params);

        //if ($scope.param.name === null || $scope.param.name === '') {
        //    $scope.param.name = '%';
        //}

        //var config = {
        //    params: $scope.param
        //}

        $scope.loading = true;

        $http.get('http://localhost/EQDashboard/api/NSEFO').then(function successCallback(response) {

            $scope.lastdate = response.data.data.lastFiveDates;
            if (response.data.data.lstDate1.length > 0) {
                for (var j = 0; j < response.data.data.lstDate1.length; j++) {

                    var result = {
                        Symbol: "",
                        Ex_date: "",
                        StrPrice: "",
                        Opt: "",
                        d1: "",
                        d2: "",
                        d3: "",
                        d4: "",
                        d5: "",
                        d6: "",
                        d7: "",
                        d8: "",
                        d9: "",
                        d10: "",
                        d11: "",
                        d12: "",
                        d13: "",
                        d14: "",
                        d15: "",
                        d16: "",
                        d17: "",
                        d18: "",
                        d19: "",
                        d20: "",
                        d21: "",
                        d22: "",
                        set: 'false'
                    }




                    result.Symbol = response.data.data.lstDate1[j].SYMBOL;
                    result.d1 = response.data.data.lstDate1[j].HI_PRICE;
                    result.Ex_date = response.data.data.lstDate1[j].EXP_DATE;
                    result.StrPrice = response.data.data.lstDate1[j].STR_PRICE;
                   
                    result.d2 = parseFloat((response.data.data.lstDate1[j].CLOSE_PRICE - response.data.data.lstDate2[j].CLOSE_PRICE) / (response.data.data.lstDate2[j].CLOSE_PRICE * 0.01)).toFixed(2);
                    result.d3 = parseFloat((response.data.data.lstDate1[j].OPEN_Int - response.data.data.lstDate2[j].OPEN_Int) / (response.data.data.lstDate2[j].OPEN_Int * 0.01)).toFixed(2);
                    result.d4 = parseFloat((response.data.data.lstDate1[j].TRD_QTY - response.data.data.lstDate2[j].TRD_QTY) / (response.data.data.lstDate2[j].TRD_QTY * 0.01)).toFixed(2);


                    result.d5 = parseFloat((response.data.data.lstDate2[j].CLOSE_PRICE - response.data.data.lstDate3[j].CLOSE_PRICE) / (response.data.data.lstDate3[j].CLOSE_PRICE * 0.01)).toFixed(2);
                    result.d6 = parseFloat((response.data.data.lstDate2[j].OPEN_Int - response.data.data.lstDate3[j].OPEN_Int) / (response.data.data.lstDate3[j].OPEN_Int * 0.01)).toFixed(2);
                    result.d7 = parseFloat((response.data.data.lstDate2[j].TRD_QTY - response.data.data.lstDate3[j].TRD_QTY) / (response.data.data.lstDate3[j].TRD_QTY * 0.01)).toFixed(2);

                    result.d8 = parseFloat((response.data.data.lstDate3[j].CLOSE_PRICE - response.data.data.lstDate4[j].CLOSE_PRICE) / (response.data.data.lstDate4[j].CLOSE_PRICE * 0.01)).toFixed(2);
                    result.d9 = parseFloat((response.data.data.lstDate3[j].OPEN_Int - response.data.data.lstDate4[j].OPEN_Int) / (response.data.data.lstDate4[j].OPEN_Int * 0.01)).toFixed(2);
                    result.d10 = parseFloat((response.data.data.lstDate3[j].TRD_QTY - response.data.data.lstDate4[j].TRD_QTY) / (response.data.data.lstDate4[j].TRD_QTY * 0.01)).toFixed(2);

                    result.d11 = parseFloat((response.data.data.lstDate4[j].CLOSE_PRICE - response.data.data.lstDate4[j].CLOSE_PRICE) / (response.data.data.lstDate4[j].CLOSE_PRICE * 0.01)).toFixed(2);
                    result.d12 = parseFloat((response.data.data.lstDate4[j].OPEN_Int - response.data.data.lstDate5[j].OPEN_Int) / (response.data.data.lstDate5[j].OPEN_Int * 0.01)).toFixed(2);
                    result.d13 = parseFloat((response.data.data.lstDate4[j].TRD_QTY - response.data.data.lstDate5[j].TRD_QTY) / (response.data.data.lstDate5[j].TRD_QTY * 0.01)).toFixed(2);

                    result.d14 = parseFloat((response.data.data.lstDate5[j].CLOSE_PRICE - response.data.data.lstDate5[j].CLOSE_PRICE) / (response.data.data.lstDate5[j].CLOSE_PRICE * 0.01)).toFixed(2);
                    result.d15 = parseFloat((response.data.data.lstDate5[j].OPEN_Int - response.data.data.lstDate0[j].OPEN_Int) / (response.data.data.lstDate0[j].OPEN_Int * 0.01)).toFixed(2);
                    result.d16 = parseFloat((response.data.data.lstDate5[j].TRD_QTY - response.data.data.lstDate0[j].TRD_QTY) / (response.data.data.lstDate0[j].TRD_QTY * 0.01)).toFixed(2);

                   
                    $scope.resultset.push(result);

                    var result = {
                        Symbol: "",
                        Ex_date: "",
                        StrPrice: "",
                        Opt: "",
                        d1: "",
                        d2: "",
                        d3: "",
                        d4: "",
                        d5: "",
                        d6: "",
                        d7: "",
                        d8: "",
                        d9: "",
                        d10: "",
                        d11: "",
                        d12: "",
                        d13: "",
                        d14: "",
                        d15: "",
                        d16: "",
                        d17: "",
                        d18: "",
                        d19: "",
                        d20: "",
                        d21: "",
                        d22: "",
                        set: 'true'

                    }

                    result.Symbol = response.data.data.lstDate1[j].SYMBOL.substring(0, 8);
                    result.StrPrice = response.data.data.lstDate1[j].STR_PRICE;
                    result.Ex_date = response.data.data.lstDate1[j].EXP_DATE;
                    result.d1 = response.data.data.lstDate1[j].LO_PRICE;

                    result.d2 = response.data.data.lstDate1[j].CLOSE_PRICE;
                    result.d3 = response.data.data.lstDate1[j].OPEN_Int;
                    result.d4 = response.data.data.lstDate1[j].TRD_QTY;

                    result.d5 = response.data.data.lstDate2[j].CLOSE_PRICE;
                    result.d6 = response.data.data.lstDate2[j].OPEN_Int;
                    result.d7 = response.data.data.lstDate2[j].TRD_QTY;

                    result.d8 = response.data.data.lstDate3[j].CLOSE_PRICE;
                    result.d9 = response.data.data.lstDate3[j].OPEN_Int;
                    result.d10 = response.data.data.lstDate3[j].TRD_QTY;

                    result.d11 = response.data.data.lstDate4[j].CLOSE_PRICE;
                    result.d12 = response.data.data.lstDate4[j].OPEN_Int;
                    result.d13 = response.data.data.lstDate4[j].TRD_QTY;

                    result.d14 = response.data.data.lstDate5[j].CLOSE_PRICE;
                    result.d15 = response.data.data.lstDate5[j].OPEN_Int;
                    result.d16 = response.data.data.lstDate5[j].TRD_QTY;


                    $scope.resultset.push(result);

                    //$scope.bindCandle(response.data.data.lstDate0[0].SYMBOL);

                    $scope.loading = false;
                }
            }
            else {
                $scope.loading = false;
                $('#message').html('').prepend('<div class="alert alert-warning" style="text-align:center"> No data available for the Search.</div>').show();
                setTimeout(function () {
                    $('#message').hide();
                }, 10000);
            }
            //bindSector(response.data.data.sectorInfo);
        }, function errorCallback(response) {

            // Handle error here
            $scope.loading = false;

        });
    };



    intiilizeCommon();

});

