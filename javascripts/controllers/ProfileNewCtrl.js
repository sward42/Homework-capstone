"use strict";

app.controller("ProfileNewCtrl", function($scope, $rootScope, $location, $routeParams, ProfileFactory) {
    $scope.newProfile = {};

    $scope.gradeLevels = [
        {
            grade: "K",
            lexileTextLevel:" up to 190L"
        },
        {
            grade: 1,
            lexileTextLevel: "190L to 530L"
        },
        {
            grade: 2,
            lexileTextLevel: "420L to 650L"
        },
        {
            grade: 3,
            lexileTextLevel: "520L to 820L"
        },
        {
            grade: 4,
            lexileTextLevel: "740L to 940L"
        }
    ];

    $scope.createNewProfileThenReloadProfiles = function() {
        console.log("createNewProfileThenReloadProfiles");
        $scope.newProfile.profileName = $scope.newProfileName;
        $scope.newProfile.uid = $rootScope.user.uid;
        $scope.newProfile.rewardPoints = 0;
        $scope.newProfile.grade = $scope.newProfileGrade;
        $scope.newProfile.profileImage = $scope.newProfileImage;

        ProfileFactory.postNewProfile($scope.newProfile).then(function(itemId) {
          $location.url("/profiles/list");
          $scope.newProfile = {};
        });
    };

    $(document).ready(function(){
      $('.carousel').carousel();
    });
        

});

