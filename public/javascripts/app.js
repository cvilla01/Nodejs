var app = angular.module('IoTApp', [])
app.factory('WatsonIoT',function(){
  return IBMIoTF.IotfApplication;
})

app.controller('main',['$scope','WatsonIoT',function($scope,WIoT){
  $scope.main ={}
  $scope.main.APIKey =""
  $scope.main.AuthToken =""
  $scope.main.OrgId =""
  $scope.main.EventLog =""
  var appClient  = null;
  var appClient2  = null;

  $scope.main.connect = function(){
    $scope.main.EventLog =""
    appClient  = new WIoT( {
      "org" : "jviqdf", //$scope.main.OrgId,
      "id" : "Raspberry01",
      "domain": "internetofthings.ibmcloud.com",
      "auth-key" : "a-jviqdf-i5urue2t11", //$scope.main.APIKey,
      "auth-token" : $scope.main.AuthToken
    }
    )
    appClient.connect();
    appClient.on("connect", function () {
        appClient.subscribeToDeviceEvents();
    });
    window.onbeforeunload = function () {
      appClient.disconnect();
      
       // Salidas para los eventos.
    };

    appClient2  = new WIoT( {
      "org" : "jviqdf", //$scope.main.OrgId,
      "id" : "Maqueta01",
      "domain": "internetofthings.ibmcloud.com",
      "auth-key" : "a-jviqdf-i5urue2t11", //$scope.main.APIKey,
      "auth-token" : $scope.main.AuthToken
    }
    )
    appClient2.connect();
    appClient2.on("connect", function () {
        appClient2.subscribeToDeviceEvents();
    });
    window.onbeforeunload = function () {
      appClient2.disconnect();
      
       // Salidas para los eventos.
    };


    appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
      var resultado = (payload)+'\n' +$scope.main.EventLog;
      if(deviceId == 'Raspberry01'){
      var string = new TextDecoder("utf-8").decode(payload);
      var json = JSON.parse(string);
      var temperatura= json.d.temperature;
      var humedad= json.d.humidity;
      var pressure= json.d.pressure;
       $scope.main.EventLog = (temperatura);
       $scope.main.EventHumedad = (humedad);
       $scope.main.EventPresion = (pressure);
      //console.log(json.d.temperature);
      $scope.$digest();
      }
    });


    appClient2.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
      var resultado = (payload)+'\n' +$scope.main.EventLog;
   
      if(deviceId == 'Maqueta01'){
      var string = new TextDecoder("utf-8").decode(payload);
      var json = JSON.parse(string);
      var id= json.values.variable[0].id[0];
        if(id == 'Medidor_1.VI3'){
          var volt= json.values.variable[0].value[0];
          $scope.main.EventVolt = (volt);
        }
        if(id == 'Medidor_1.AI3'){
          var ampere = json.values.variable[0].value[0];
          $scope.main.EventAmpere = (ampere);
        }
      console.log(json);
      $scope.$digest();
      }
    });
    }


}]);