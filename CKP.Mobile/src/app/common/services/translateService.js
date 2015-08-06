app.factory('translateService',
        ['$http', '$q', 'localStorageService', 'ngAuthSettings',
    function ($http, $q, localStorageService, ngAuthSettings) {

        var translateFactory = {};
        var requestCount = 0;
        var pageVersions = [
        { pageName: "Login", version: "1" },
          { pageName: "Home", version: "1" }
        ];
        var translations = [
            { resourceName: "login", resourceValue: "ytytyt", version : '2' , language : ' en-US' },
            { resourceName: "user name", resourceValue: "User Name", version: '2', language: ' en-US' },
            { resourceName: "password", resourceValue: "Password", version: '2', language: ' en-US' },
            { resourceName: "forgot password", resourceValue: "Forgot Password", version: '2', language: ' en-US' },
            { resourceName: "password hint", resourceValue: "Password Hint", version: '2', language: ' en-US' },
            { resourceName: "signin", resourceValue: "Sign In", version: '2', language: ' en-US' }
        ];

        var getVersionByPage = function (pageName) {
            var version = "";
            angular.forEach(pageVersions, function (item) {
                if (item.pageName === pageName) {
                    version = item.version;
                    return version;
                }
            });
            return version;
        }

        var forceGetTranslation = function (pageName, language, version) {

            var deferred = $q.defer();
            //to do need to add api call for get trnsaltion by page name
            //var url = "https://qachecknet.checkpt.com/webapi/api/core/MobileApp/GetPasswordHint?username=" + username;
            //$http.get(url).success(function (result) {
            //    deferred.resolve(result);

            //}).error(function (err, status) {
            //    deferred.reject('Faild to retrieve password hint!' + err);
            requestCount = 1;
            //});
            deferred.resolve(translations);
            return deferred.promise;
           

        }
        var getTranslation = function (translateData) {
            
            var deferred = $q.defer();

            var pageName = translateData.pageName;
            var language = translateData.selectedLanague;
            var version = getVersionByPage(pageName);

            var localStorageKeyByPage = pageName + language + version;


          
            var translations = localStorageService.get(localStorageKeyByPage);
            if (translations) {
                deferred.resolve(translations);
            }
            else {
                forceGetTranslation(pageName, language, version).then(function (result) {
                    deferred.resolve(result);
                });
            }

            return deferred.promise;
        }


        var getTranslationByName = function (resourceName) {
            
            var resourceValue = resourceName;
            angular.forEach(translations, function (item) {
                if (item.resourceName === resourceName) {
                    resourceValue = item.resourceValue;
                    return resourceValue;
                }
            });
            return resourceValue;
        }


        translateFactory.getVersionByPage = getVersionByPage;

        translateFactory.getTranslation = getTranslation;
        translateFactory.getTranslationByName = getTranslationByName;

        return translateFactory;
    }]);