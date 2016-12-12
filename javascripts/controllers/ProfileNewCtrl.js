"use strict";

app.controller("ProfileNewCtrl", function($scope, $rootScope, $location, $routeParams, ProfileFactory) {
    $scope.newProfile = {};

    $scope.gradeLevels = [
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
        },
        {
            grade: 5,
            lexileTextLevel: "830L to 1010L"
        },
        {
            grade: 6,
            lexileTextLevel: "925L to 1070L"
        },
        {
            grade: 7,
            lexileTextLevel: "970L to 1120L"
        },
        {
            grade: 8,
            lexileTextLevel: "1010L to 1185L"
        },
        {
            grade: 9,
            lexileTextLevel: "1050L to 1260L"
        },
        {
            grade: 10,
            lexileTextLevel: "1080L to 1335L"
        },
        {
            grade: 11,
            lexileTextLevel: "1185L to 1385L"
        },
        {
            grade: 12,
            lexileTextLevel: "1185L to 1385L"
        }

    ];

    $scope.createNewProfileThenReloadProfiles = function() {
        console.log("createNewProfileThenReloadProfiles");
        $scope.newProfile.profileName = $scope.newProfileName;
        $scope.newProfile.uid = $rootScope.user.uid;
        $scope.newProfile.grade = $scope.newProfileGrade;

        ProfileFactory.postNewProfile($scope.newProfile).then(function(itemId) {
          $location.url("/profiles/list");
          $scope.newProfile = {};
        });
    };

});

