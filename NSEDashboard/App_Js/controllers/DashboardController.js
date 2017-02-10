app.controller('Dashboard', function ($scope, $http) {

  
    function candleotions() {
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
                    axisLabel: 'Dates',
                    tickFormat: function (d) {
                        return d3.time.format('%x')(new Date(d));
                    },
                    showMaxMin: false
                },

                yAxis: {
                    axisLabel: 'Stock Price',
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
    };

    $scope.data = [{ values: [] }];
   
    
    $scope.lastdate = [];

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
            showValues: true,
            valueFormat: function (d) {
                return d3.format(',.2f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: 'X Axis'
            },
            yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: -10
            }
        }
    };

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

    $scope.param = {
        name: "ANCAUTO",
        fullname: "",
        high52:"",
        low52: "",
        trades: "",
        gainer_losser: "",
        gainRs: "",
        gainPer: "",
        cDate1: "2017-01-16",
        cDate2: "2017-01-17"
    }

    $scope.Apply = function () {
        intiilizeCommon();
        $("#md-notification1").modal('hide');
    };

    $scope.bindCandle = function (sym) {

         var config = {
             params: sym
        }

        $scope.loading = true;

        $http.get('EQDashboard/api/GetChart?symbol=' + sym
        ).then(function successCallback(response) {

        

            $scope.data = [{
                values: []
            }];
            $scope.data1[0].values = [];
            $scope.data2[0].values = [];
            //$scope.data[0].values = response.data.data;

            for(var i=0;i< response.data. data.length;i++)
            {
                var c = {
                    "close": 0,
                    "open": 0,
                    "low": 0,
                    "high": 0,
                    "date": 0,
                    "volume":0
                        
                };

               c.close = response.data.data[i].close;
               c.open = response.data.data[i].open;
               c.low = response.data.data[i].low;
               c.high = response.data.data[i].high;
               c.date = new Date(response.data.data[i].date);
               c.volume = response.data.data[i].volume;

               $scope.data[0].values.push(c);
            }

            var j = 0;

            for (var i = response.data.data.length - 1; i >= (response.data.data.length /2); i--) {

                j = j + 1;

                if (i > 0) {
                    var cc = {
                        "label": "",
                        "value": 0,
                    };

                    var value = response.data.data[i].volume;
                    var prevvalue = response.data.data[i - 1].volume;

                    cc.label = "D" + (j);
                    cc.value = parseFloat(((value - prevvalue) / (prevvalue * 0.01))).toFixed(2);

                    $scope.data1[0].values.push(cc);

                    var cc1 = {
                        "label": "",
                        "value": 0,
                    }

                    var valueQ = response.data.data[i].quantity;
                    var prevvalueQ = response.data.data[i - 1].quantity;

                    cc1.label = "D" + (j);
                    cc1.value = parseFloat(((valueQ - prevvalueQ) / (prevvalueQ * 0.01))).toFixed(2);

                    $scope.data2[0].values.push(cc1);
                }
            }


            $scope.loading = false;
            candleotions();
        });

    };

    $scope.sector = [];
    function bindSector(obj) {

        $scope.sector = obj;
    };

    function intiilizeCommon() {
       
        var inputparams = [];
        $scope.resultset = [];
        //inputparams.push(params);

        var config = {
            params: $scope.param
        }

        $scope.loading = true;

        $http.get('EQDashboard/api/NSEUpload',
          config

        ).then(function successCallback(response) {

            $scope.lastdate = response.data.data.lastFiveDates;

            for (var j = 0; j < response.data.data.lstDate1.length; j++)
            {

                var result = {
                    Name: "",
                    Ex_date: "",
                    Purpose: "",
                    top20: "",
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
                    set:'false'
                }


                     var net_td1=0;
                     var net_td2=0;
                     var net_td3=0;
                     var net_td4=0;
                     var net_td5=0;
                     var net_td6 = 0;

                     net_td1 = (response.data.data.lstDate1[j].NET_TRDQTY + 2 - response.data.data.lstDate2[j].NET_TRDQTY)/ response.data.data.lstDate2[j].NET_TRDQTY * 0.01;
                     net_td2 = (response.data.data.lstDate2[j].NET_TRDQTY + 2 - response.data.data.lstDate3[j].NET_TRDQTY)/ response.data.data.lstDate3[j].NET_TRDQTY * 0.01;
                     net_td3 = (response.data.data.lstDate3[j].NET_TRDQTY + 2 - response.data.data.lstDate4[j].NET_TRDQTY)/ response.data.data.lstDate4[j].NET_TRDQTY * 0.01;
                     net_td4 = (response.data.data.lstDate4[j].NET_TRDQTY + 2 - response.data.data.lstDate5[j].NET_TRDQTY)/ response.data.data.lstDate5[j].NET_TRDQTY * 0.01;
                     net_td5 = 0;
                     net_td6 = 0;
        

                     net_td1 = parseFloat((net_td1 * 100) / 100).toFixed(2);
                     net_td2 = parseFloat((net_td2 * 100) / 100).toFixed(2);
                     net_td3 = parseFloat((net_td3 * 100) / 100).toFixed(2);
                     net_td4 = parseFloat((net_td4 * 100) / 100).toFixed(2);
                     net_td5 = parseFloat((net_td5 * 100) / 100).toFixed(2);
                     net_td6 = parseFloat((net_td6 * 100) / 100).toFixed(2);

             

                result.Name = response.data.data.lstDate1[j].SYMBOL;
                result.d1 = response.data.data.lstDate1[j].LO_52_WK;
                result.Ex_date = response.data.data.lstDate1[j].Ex_date;
                result.Purpose = response.data.data.lstDate1[j].Purpose;
                result.top20 = parseFloat(response.data.data.lstDate1[j].Top_Avg_20).toFixed(4);
                result.d2 = parseFloat((response.data.data.lstDate1[j].CLOSE_PRICE - response.data.data.lstDate1[j].PREV_CLOSE) / (response.data.data.lstDate1[j].PREV_CLOSE * 0.01)).toFixed(2);
                result.d3 = parseFloat((response.data.data.lstDate1[j].NET_TRDVAL - response.data.data.lstDate2[j].NET_TRDVAL) / (response.data.data.lstDate2[j].NET_TRDVAL * 0.01)).toFixed(2);
                result.d4 = parseFloat((response.data.data.lstDate1[j].TRADES - response.data.data.lstDate2[j].TRADES) / (response.data.data.lstDate2[j].TRADES * 0.01)).toFixed(2);


                result.d5 = parseFloat((response.data.data.lstDate2[j].CLOSE_PRICE - response.data.data.lstDate2[j].PREV_CLOSE) / (response.data.data.lstDate2[j].PREV_CLOSE * 0.01)).toFixed(2);
                result.d6 = parseFloat((response.data.data.lstDate2[j].NET_TRDVAL - response.data.data.lstDate3[j].NET_TRDVAL) / (response.data.data.lstDate3[j].NET_TRDVAL * 0.01)).toFixed(2);
                result.d7 = parseFloat((response.data.data.lstDate2[j].TRADES - response.data.data.lstDate3[j].TRADES) / (response.data.data.lstDate3[j].TRADES * 0.01)).toFixed(2);

                result.d8 = parseFloat((response.data.data.lstDate3[j].CLOSE_PRICE - response.data.data.lstDate3[j].PREV_CLOSE) / (response.data.data.lstDate3[j].PREV_CLOSE * 0.01)).toFixed(2);
                result.d9 = parseFloat((response.data.data.lstDate3[j].NET_TRDVAL - response.data.data.lstDate4[j].NET_TRDVAL) / (response.data.data.lstDate4[j].NET_TRDVAL * 0.01)).toFixed(2);
                result.d10 = parseFloat((response.data.data.lstDate3[j].TRADES - response.data.data.lstDate4[j].TRADES) / (response.data.data.lstDate4[j].TRADES * 0.01)).toFixed(2);

                result.d11 = parseFloat((response.data.data.lstDate4[j].CLOSE_PRICE - response.data.data.lstDate4[j].PREV_CLOSE) / (response.data.data.lstDate4[j].PREV_CLOSE * 0.01)).toFixed(2);
                result.d12 = parseFloat((response.data.data.lstDate4[j].NET_TRDVAL - response.data.data.lstDate5[j].NET_TRDVAL) / (response.data.data.lstDate5[j].NET_TRDVAL * 0.01)).toFixed(2);
                result.d13 = parseFloat((response.data.data.lstDate4[j].TRADES - response.data.data.lstDate5[j].TRADES) / (response.data.data.lstDate5[j].TRADES * 0.01)).toFixed(2);

                result.d14 = parseFloat((response.data.data.lstDate5[j].CLOSE_PRICE - response.data.data.lstDate5[j].PREV_CLOSE) / (response.data.data.lstDate5[j].PREV_CLOSE * 0.01)).toFixed(2);
                result.d15 = parseFloat((response.data.data.lstDate5[j].NET_TRDVAL - response.data.data.lstDate0[j].NET_TRDVAL) / (response.data.data.lstDate0[j].NET_TRDVAL * 0.01)).toFixed(2);
                result.d16 = parseFloat((response.data.data.lstDate5[j].TRADES - response.data.data.lstDate0[j].TRADES) / (response.data.data.lstDate0[j].TRADES * 0.01)).toFixed(2);

                result.d17 = parseFloat((response.data.data.lstDate6[j].CLOSE_PRICE - response.data.data.lstDate6[j].PREV_CLOSE) / (response.data.data.lstDate6[j].PREV_CLOSE * 0.01)).toFixed(2);

                result.d18 = parseFloat((response.data.data.lstDate7[j].CLOSE_PRICE - response.data.data.lstDate7[j].PREV_CLOSE) / (response.data.data.lstDate7[j].PREV_CLOSE * 0.01)).toFixed(2);

                //result.d5 = net_td1;

                //result.d6 = response.data.data.lstDate2[j].CLOSE_PRICE;
                //result.d7 = parseFloat((response.data.data.lstDate2[j].CLOSE_PRICE - response.data.data.lstDate2[j].PREV_CLOSE) / (response.data.data.lstDate2[j].PREV_CLOSE * 0.01)).toFixed(2);;
                //result.d8 = net_td2;

                //result.d9 = response.data.data.lstDate3[j].CLOSE_PRICE;
                //result.d10 = parseFloat((response.data.data.lstDate3[j].CLOSE_PRICE - response.data.data.lstDate3[j].PREV_CLOSE) / (response.data.data.lstDate3[j].PREV_CLOSE * 0.01)).toFixed(2);
                //result.d11 = net_td3;

                //result.d12 = response.data.data.lstDate4[j].CLOSE_PRICE;
                //result.d13 = parseFloat((response.data.data.lstDate4[j].CLOSE_PRICE - response.data.data.lstDate4[j].PREV_CLOSE) / (response.data.data.lstDate4[j].PREV_CLOSE * 0.01)).toFixed(2);
                //result.d14 = net_td4;

                //result.d15 = response.data.data.lstDate5[j].CLOSE_PRICE;
                //result.d16 = parseFloat((response.data.data.lstDate5[j].CLOSE_PRICE - response.data.data.lstDate5[j].PREV_CLOSE) / (response.data.data.lstDate5[j].PREV_CLOSE * 0.01)).toFixed(2);
                //result.d17 = net_td5;

                //result.d18 = response.data.data.lstDate6[j].CLOSE_PRICE;
                //result.d19 = parseFloat((response.data.data.lstDate6[j].CLOSE_PRICE - response.data.data.lstDate6[j].PREV_CLOSE) / (response.data.data.lstDate6[j].PREV_CLOSE * 0.01)).toFixed(2);

                //result.d20 = parseFloat((response.data.data.lstDate7[j].CLOSE_PRICE - response.data.data.lstDate7[j].PREV_CLOSE) / (response.data.data.lstDate7[j].PREV_CLOSE * 0.01)).toFixed(2);


                $scope.resultset.push(result);

                var result = {
                    Name: "",
                    Ex_date: "",
                    Purpose: "",
                    top20:"",
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

                result.Name = response.data.data.lstDate1[j].SECURITY;
                result.d1 = response.data.data.lstDate1[j].HI_52_WK;

                result.d2 = response.data.data.lstDate1[j].CLOSE_PRICE;
                result.d3 = response.data.data.lstDate1[j].NET_TRDVAL;
                result.d4 = response.data.data.lstDate1[j].TRADES;

                result.d5 = response.data.data.lstDate2[j].CLOSE_PRICE;
                result.d6 = response.data.data.lstDate2[j].NET_TRDVAL;
                result.d7 = response.data.data.lstDate2[j].TRADES;

                result.d8 = response.data.data.lstDate3[j].CLOSE_PRICE;
                result.d9 = response.data.data.lstDate3[j].NET_TRDVAL;
                result.d10 = response.data.data.lstDate3[j].TRADES;

                result.d11 = response.data.data.lstDate4[j].CLOSE_PRICE;
                result.d12 = response.data.data.lstDate4[j].NET_TRDVAL;
                result.d13 = response.data.data.lstDate4[j].TRADES;

                result.d14 = response.data.data.lstDate5[j].CLOSE_PRICE;
                result.d15 = response.data.data.lstDate5[j].NET_TRDVAL;
                result.d16 = response.data.data.lstDate5[j].TRADES;

                result.d17 = response.data.data.lstDate6[j].CLOSE_PRICE;

                result.d18 = response.data.data.lstDate7[j].CLOSE_PRICE;

                //result.d5 = response.data.data.lstDate2[j].NET_TRDQTY;
                //result.d6 = response.data.data.lstDate3[j].TRADES;
                //result.d7 = response.data.data.lstDate3[j].NET_TRDQTY;

                //result.d8 = response.data.data.lstDate4[j].TRADES;
                //result.d9 = response.data.data.lstDate4[j].NET_TRDQTY;
                //result.d10 = response.data.data.lstDate5[j].TRADES;

                //result.d11 = response.data.data.lstDate5[j].NET_TRDQTY;
                //result.d12 = response.data.data.lstDate6[j].TRADES;
                //result.d13 = response.data.data.lstDate6[j].NET_TRDQTY;

                //result.d14 = response.data.data.lstDate5[j].TRADES;
                //result.d15 = response.data.data.lstDate5[j].NET_TRDQTY;
                //result.d16 = response.data.data.lstDate5[j].TRADES;

                //result.d17 = response.data.data.lstDate6[j].NET_TRDQTY;
                //result.d18 = response.data.data.lstDate6[j].TRADES;
                //result.d19 = "123";


                $scope.resultset.push(result);

                $scope.bindCandle(response.data.data.lstDate0[0].SYMBOL);

                $scope.loading = false;
            }
            bindSector(response.data.data.sectorInfo);
             }, function errorCallback(response) {

        });
    };

  

    intiilizeCommon();   

  

});

app.directive('loading', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="loading" style="margin-left:600px;margin-top:100px;"><img src="EQDashboard/assets/plugins/elfinder/img/spinner-mini.gif"/>LOADING...</div>',
        link: function (scope, element, attr) {
            scope.$watch('loading', function (val) {
                if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
        }
    }
});