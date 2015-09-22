angular.module('starter.controllers', ['ionic', 'ui.bootstrap', 'angularUtils.directives.dirPagination','ngCordova'])

.service('bookingService', function() {
  var bookingInfomation = [];

  var addBooking = function(newObj) {
      bookingInfomation.push(newObj);
  };

  var getBooking = function(){
      return bookingInfomation;
  };

  return {
    addBooking: addBooking,
    getBooking: getBooking
  };

})

.controller('AppCtrl', function($scope, $ionicModal) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //}); 
      
        
    $scope.logout = function() {       
        window.localStorage.removeItem("CurrentUser");
        window.localStorage.setItem("loggedin", '');
        //window.localStorage.clear(); very dangerous
        window.location = 'index.html';       
    }
    // Show or hide dynamically functions according to Login status
    $scope.loggedIn = window.localStorage.getItem("loggedin");
    if ($scope.loggedIn == "true") {
        $scope.loggedOut = "";
    }else {
        $scope.loggedOut = "true";
    }

})
.controller('LoginCtrl', function($scope, $ionicModal, $ionicPopup, $state,$ionicHistory) {
    var email = 'admin@gmail.com';
    var password = 'admin';
    $scope.loginData = {};  
    
    $scope.doLogin = function() {
        var credentials = {
            'email': $scope.email,
            'password': $scope.password
        };
        console.log('Doing login', $scope.loginData); 
        if($scope.loginData.email == email && $scope.loginData.password == password){
            var keyName = window.localStorage.key(0);
            window.localStorage.setItem("CurrentUser", email);
            window.localStorage.setItem("loggedin", 'true');
            window.location = 'index.html';
        }else{
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        }           
    };
})

.controller('ProfileCtrl', function($scope, $ionicPlatform, $ionicPopup) {    
    // download Service Agreement
    
    function init(){
        document.addEventListener("deviceready", ready, true);     
    }    
    function ready() {
        console.log("Thunderbirds are go!");
    }
    $scope.downloadFile = function() {
    var remoteFile = "https://www.iscp.ie/sites/default/files/pdf-sample.pdf";
    var localFileName = remoteFile.substring(remoteFile.lastIndexOf('/')+1);           
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        fileSystem.root.getDirectory("Download", {create: true, exclusive: false}, function(dirEntry) { 
        dirEntry.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
            var localPath = fileEntry.fullPath;
            
            if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
                localPath = localPath.substring(7);
                alert(localPath);
            }
            var ft = new FileTransfer();
            ft.download(remoteFile,
                localPath, function(entry) {
                    var dwnldImg = document.getElementById("dwnldImg");
                    dwnldImg.src = entry.fullPath;
                    dwnldImg.style.visibility = "visible";
                    dwnldImg.style.display = "block";
                }, fail);
                var alertPopup = $ionicPopup.alert({
                    title: 'Download Status!',
                    template: 'Download successfully! Please check your download folder!'
                });
            }, fail);
        }, fail);
    }, fail);
}
    function fail(error) {
        var alertPopup = $ionicPopup.alert({
            title: 'Download Status!',
            template: 'Error! Cannot download'
        });
        console.log(error.code);
    }
})

.controller('Barcode_scannerCtrl', function($scope,$cordovaBarcodeScanner){
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });    
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('SearchCtrl', function($scope, $stateParams) {
})

.controller('DetailCtrl',function($scope,$stateParams){
    document.getElementById("statusDetailPage").style.display ="block";
    document.getElementById("contentDetail").style.display ="none";
    $scope.detail = [];
    var idPackage = $stateParams.id;
    $.ajax({url: 'http://androidgames.space/GitPackage/api/SearchPackageById.php',
            type: 'GET',
            data: {id:idPackage},
            dataType: 'html',
            crossOrigin: true,
            success: function(data){
                obj = JSON.parse(data);
                    $scope.detail = ({
                        icon:"home",
                        name:obj["Name"],
                        description:obj["Description"],
                        bookingCondition:obj["BookingCondition"],
                        otherCondition:obj["OtherCondition"],
                        coverImage:obj["CoverPhotoURL"]
                    });
                 //console.log(obj);
                /*Apply new change*/
                document.getElementById("statusDetailPage").style.display ="none";
                document.getElementById("contentDetail").style.display ="block";
                $scope.$apply();  
                         
            },error: function (xhr, ajaxOptions, thrownError) {alert("ERROR: Page will reload now...");}
            });
})

.controller('PreviewBookingCtrl', function($scope,$ionicHistory,bookingService){
    $scope.booking = {};
    var receiveBookingInfo = bookingService.getBooking();
    $scope.booking.email = receiveBookingInfo[0]["email"];
    $scope.booking.firstname = receiveBookingInfo[0]["firstname"];
    $scope.booking.surname = receiveBookingInfo[0]["surname"];
    $scope.booking.phone = receiveBookingInfo[0]["phone"];
    $scope.booking.packageQuantity = receiveBookingInfo[0]["packageQuantity"];
    $scope.booking.adults = receiveBookingInfo[0]["adults"];
    $scope.booking.children = receiveBookingInfo[0]["children"];
    $scope.booking.infant = receiveBookingInfo[0]["infant"];
    $scope.booking.total = receiveBookingInfo[0]["total"];
    $scope.booking.packageName = receiveBookingInfo[0]["packageName"];
    $scope.booking.bookingName = receiveBookingInfo[0]["bookingName"];
    console.log(receiveBookingInfo);
    
    $scope.goBack = function() {
        $ionicHistory.goBack() 
    };
})

.controller('FAQCtrl',function($scope,$stateParams,$ionicPopup,$state,bookingService){
$scope.groups = [];
    var title=[];
    title.push("How to register in GIT Package as Company Director or Authorized person?");
    title.push("How to find my Country, State and City name on registration form? ");
    title.push("How to register as a Freelance tour leader or Tour Guide? ");
    title.push("How to download the service agreement?  ");
    title.push("How to view a package? ");
    title.push("How to add photos in my package? ");
    title.push("How to add more language in the product? ");
    title.push("How to increase and decrease allotment? ");
    title.push("How to export allotments in CSV or Excel format? ");
    title.push("How to check Sales Report as Supplier? ");
    title.push("How to check Booking Schedule?");
    title.push("How to view / search booking?");
    title.push("How to approve a booking?");
    title.push("How to check-in and verify a voucher? ");  
    title.push("How to cancel a booking?");    
    title.push("How to make a booking?");
    
    title.push("How to amend a booking?");
    title.push("How to update guest list for accommodation?");
    title.push("How to check credit facility?");  
    title.push("How to pay using credit card?");    
    title.push("How can a  Direct Customers make a booking? ");
    title.push("How can a Direct Customer login?");
    
    var contentfaq=[];
    contentfaq.push('Registration:\r\nFor you to be able to use the platform, you have to sign up by making an account.\r\n»Click on CREATE NEW ACCOUNT.\r\n»System will open the online registration form. Fill in your LOGIN INFORMATION and PERSONAL INFORMATION.\r\n»Using the drop down button, choose YES, I AM if you are the authorizing personnel (Owner, Supervisor, Manager etc..) creating the account and click on SUBMIT REGISTRATION\r\n»Click box to agree with Terms and Conditions / Company Policy\r\n\r\n\r\n\r\n\r\n\r\nPeople who can Register to Gitpackage.com:\r\n»Supplier - Company Owner\r\n»Inbound Tour Operator - Company Owner\r\nOutbound Travel Agency - Company Owner\r\n»Freelancers\r\n\r\n\r\n»Direct Consumers\r\n»Staff of Operating Company that is is Registered on Gitpackage.com\r\n\r\nFor more details, please watch our video tutorial below.');

  for (var i=0; i<title.length; i++) {
    $scope.groups[i] = {
      name: title[i],
      items: []
    };
    for (var j=0; j<1; j++) {
      $scope.groups[i].items.push(contentfaq[0]);
    }
  }
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
})

.controller('BookingCtrl',function($scope,$stateParams,$ionicPopup,$state,bookingService){
    document.getElementById("statusBookingPage").style.display ="block";
    document.getElementById("contentBooking").style.display ="none";
    $scope.detailBooking = [];
    $scope.booking = {};
    
    var idPackage = $stateParams.id;
    $.ajax({url: 'http://androidgames.space/GitPackage/api/SearchPackageById.php',
            type: 'GET',
            data: {id:idPackage},
            dataType: 'html',
            crossOrigin: true,
            success: function(data){
                obj = JSON.parse(data);
                    $scope.detailBooking = ({
                        icon:"home",
                        name:obj["Name"],
                        description:obj["Description"],
                        bookingCondition:obj["BookingCondition"],
                        otherCondition:obj["OtherCondition"],
                        coverImage:obj["CoverPhotoURL"]
                    });
                 //console.log(obj);
                /*Apply new change*/
                document.getElementById("statusBookingPage").style.display ="none";
                document.getElementById("contentBooking").style.display ="block";
                $scope.$apply();  
                         
            },error: function (xhr, ajaxOptions, thrownError) {alert("ERROR: Page will reload now...");}
            });
    
    //Preview button event
    $scope.BookingPreview = function(){
        if(!!$scope.booking.email & !!$scope.booking.firstname & !!$scope.booking.surname & !!$scope.booking.phone & !!$scope.booking.packageQuantity & !!$scope.booking.total){
            bookingService.addBooking({bookingName:$scope.booking.bookingName,packageName:$scope.detailBooking.name,email:$scope.booking.email,firstname:$scope.booking.firstname,surname:$scope.booking.surname,phone:$scope.booking.phone,packageQuantity:$scope.booking.packageQuantity,adults:$scope.booking.Adults,children:$scope.booking.Children,infant:$scope.booking.Infant,total:$scope.booking.total});
            
            $state.go("app.PreviewBooking");
        }else{
            var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: 'Please check all field.'
                });
            
            // Validate field
            if(!$scope.booking.email){
                document.getElementById("booking_form_email").style.display ="block";
            }else{
                document.getElementById("booking_form_email").style.display ="none";
            }
            
            if(!$scope.booking.firstname){
                document.getElementById("booking_form_firstname").style.display ="block";
            }else{
                document.getElementById("booking_form_firstname").style.display ="none";
            }
            
            if(!$scope.booking.surname){
                document.getElementById("booking_form_surname").style.display ="block";
            }else{
                document.getElementById("booking_form_surname").style.display ="none";
            }
            
            if(!$scope.booking.phone){
                document.getElementById("booking_form_phone").style.display ="block";
            }else{
                document.getElementById("booking_form_phone").style.display ="none";
            }
            
            if(!$scope.booking.packageQuantity){
                document.getElementById("booking_form_packageQuantity").style.display ="block";
            }else{
                document.getElementById("booking_form_packageQuantity").style.display ="none";
            }
            
            if(!$scope.booking.total){
                document.getElementById("booking_form_total").style.display ="block";
            }else{
                document.getElementById("booking_form_total").style.display ="none";
            }
            
            // End
        }
    }
    
})

.controller("createNewAccountCtrl", function($scope, $state){
})

.controller("ListController", function($scope, $state){
    document.getElementById("status").innerHTML = "<div class='spinner-loader centered'></div>";
    var keyword="";
    /*Reset*/
    $scope.reset= function(){
        $scope.searchText = "";
    }
    /*End*/
    
    /*Status*/
        $scope.status = "Searching muahahaha";
    /*End*/
    
    /*Detail package*/
    $scope.detail = function(data){
        //data == id
        $state.go("app.detail",{id:data});
    }
    /*End*/    
       
    /*Booking package*/
    $scope.booking = function(data){
        //data == id
        $state.go("app.booking",{id:data});
    }
    /*End*/
    
    document.getElementById("paginate").style.display ="none";
    $scope.items = [];
    $.ajax({url: 'http://androidgames.space/GitPackage/api/PackageTest.php',
            type: 'GET',
            data: {keyword:""},
            dataType: 'html',
            crossOrigin: true,
            success: function(data){
               //console.log("Connect to php");
                obj = JSON.parse(data);
                //console.log(obj);
                //alert(obj[0]["BookingCondition"]);
                obj.forEach(function(entry){                    
                    //console.log(entry["CoverPhotoID"]);                    
                    $scope.items.push({
                        icon:"home",
                        id:entry["ID"],
                        title:entry["Name"],
                        image:entry["CoverPhotoURL"],
                        description:entry["Description"]
                    });
                });                 
                
                /*Apply new change*/
                $scope.$apply();  
                         
                document.getElementById("status").innerHTML = "";
                document.getElementById("paginate").style.display ="block";
            },error: function (xhr, ajaxOptions, thrownError) {alert("ERROR: Page will reload now...");}
            });
            
    
    })

;

