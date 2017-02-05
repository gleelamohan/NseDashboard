app.controller('Dashboard', function ($scope, $http) {


    
    

   

    $scope.param = {
        name: "%",
        fullname: "tata",
        dates: []
    }

    $scope.Apply = function () {
        intiilizeCommon();
        $("#md-notification1").modal('hide');
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


        $http.get('api/NSEUpload',
          config

        ).then(function successCallback(response) {

            for (var j = 0; j < response.data.data.lstDate1.length; j++)
            {

                var result = {
                    Name: "",
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

                     net_td1 = (response.data.data.lstDate1[j].NET_TRDQTY + 2 - response.data.data.lstDate2[j].NET_TRDQTY / response.data.data.lstDate2[j].NET_TRDQTY * 0.01);
                     net_td2 = (response.data.data.lstDate2[j].NET_TRDQTY + 2 - response.data.data.lstDate3[j].NET_TRDQTY / response.data.data.lstDate3[j].NET_TRDQTY * 0.01);
                     net_td3 = (response.data.data.lstDate3[j].NET_TRDQTY + 2 - response.data.data.lstDate4[j].NET_TRDQTY / response.data.data.lstDate4[j].NET_TRDQTY * 0.01);
                     net_td4 = (response.data.data.lstDate4[j].NET_TRDQTY + 2 - response.data.data.lstDate5[j].NET_TRDQTY / response.data.data.lstDate5[j].NET_TRDQTY * 0.01);
                     net_td5 = 0;
                     net_td6 = 0;
        

                     net_td1 = Math.round(net_td1 * 100) / 100;
                     net_td2 = Math.round(net_td2 * 100) / 100;
                     net_td3 = Math.round(net_td3 * 100) / 100;
                     net_td4 = Math.round(net_td4 * 100) / 100;
                     net_td5 = Math.round(net_td5 * 100) / 100;
                     net_td6 = Math.round(net_td6 * 100) / 100;

             

                result.Name = response.data.data.lstDate1[j].SYMBOL;
                result.d1 = response.data.data.lstDate1[j].HI_52_WK;
                result.d2 = response.data.data.lstDate1[j].LO_52_WK;
                result.d3 = response.data.data.lstDate1[j].CLOSE_PRICE;
                result.d4 = Math.round((response.data.data.lstDate1[j].CLOSE_PRICE - response.data.data.lstDate1[j].PREV_CLOSE) / (response.data.data.lstDate1[j].PREV_CLOSE * 0.01));
                result.d5 = net_td1;

                result.d6 = response.data.data.lstDate2[j].CLOSE_PRICE;
                result.d7 =  Math.round((response.data.data.lstDate2[j].CLOSE_PRICE - response.data.data.lstDate2[j].PREV_CLOSE) / (response.data.data.lstDate2[j].PREV_CLOSE * 0.01));;
                result.d8 = net_td2;

                result.d9 = response.data.data.lstDate3[j].CLOSE_PRICE;
                result.d10 =  Math.round((response.data.data.lstDate3[j].CLOSE_PRICE - response.data.data.lstDate3[j].PREV_CLOSE) / (response.data.data.lstDate3[j].PREV_CLOSE * 0.01));
                result.d11 = net_td3;

                result.d12 = response.data.data.lstDate4[j].CLOSE_PRICE;
                result.d13 =  Math.round((response.data.data.lstDate4[j].CLOSE_PRICE - response.data.data.lstDate4[j].PREV_CLOSE) / (response.data.data.lstDate4[j].PREV_CLOSE * 0.01));
                result.d14 = net_td4;

                result.d15 = response.data.data.lstDate5[j].CLOSE_PRICE;
                result.d16 =  Math.round((response.data.data.lstDate5[j].CLOSE_PRICE - response.data.data.lstDate5[j].PREV_CLOSE) / (response.data.data.lstDate5[j].PREV_CLOSE * 0.01));
                result.d17 = net_td5;

                result.d18 = response.data.data.lstDate6[j].CLOSE_PRICE;
                result.d19 =  Math.round((response.data.data.lstDate6[j].CLOSE_PRICE - response.data.data.lstDate6[j].PREV_CLOSE) / (response.data.data.lstDate6[j].PREV_CLOSE * 0.01));

                result.d20 = Math.round( (response.data.data.lstDate7[j].CLOSE_PRICE - response.data.data.lstDate7[j].PREV_CLOSE) / (response.data.data.lstDate7[j].PREV_CLOSE * 0.01));


                $scope.resultset.push(result);

                var result = {
                    Name: "",
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
                    set:'true'
                }

                result.Name = response.data.data.lstDate1[j].SECURITY;
                result.d1 = response.data.data.lstDate1[j].HI_52_WK;
                result.d2 = response.data.data.lstDate1[j].TRADES;
                result.d3 = response.data.data.lstDate1[j].NET_TRDQTY;
                result.d4 = response.data.data.lstDate2[j].TRADES;
                result.d5 = response.data.data.lstDate2[j].NET_TRDQTY;
                result.d6 = response.data.data.lstDate3[j].TRADES;
                result.d7 = response.data.data.lstDate3[j].NET_TRDQTY;

                result.d8 = response.data.data.lstDate4[j].TRADES;
                result.d9 = response.data.data.lstDate4[j].NET_TRDQTY;
                result.d10 = response.data.data.lstDate5[j].TRADES;

                result.d11 = response.data.data.lstDate5[j].NET_TRDQTY;
                result.d12 = response.data.data.lstDate6[j].TRADES;
                result.d13 = response.data.data.lstDate6[j].NET_TRDQTY;

                //result.d14 = response.data.data.lstDate5[j].TRADES;
                //result.d15 = response.data.data.lstDate5[j].NET_TRDQTY;
                //result.d16 = response.data.data.lstDate5[j].TRADES;

                //result.d17 = response.data.data.lstDate6[j].NET_TRDQTY;
                //result.d18 = response.data.data.lstDate6[j].TRADES;
                //result.d19 = "123";


                $scope.resultset.push(result);

              
            }
            bindSector(response.data.data.sectorInfo);
             }, function errorCallback(response) {

        });
    };

  

    intiilizeCommon();
   

  

});