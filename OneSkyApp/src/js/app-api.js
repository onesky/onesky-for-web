var OsAppApi = (function () {
  
    var _cookieExpirationDays = 3650;

    var _loadRemoteStoredPreferences = function(appId, user, experienceType, callback, nextLoad) {
        var endpoint = '/apps/' + appId + '/users/' + user.id
        var httpClient = new AppApiClient();
        if(user.hasOwnProperty('userHash')){
            httpClient.setAuthToken(user.userHash);
        }
        httpClient.get(endpoint, function(res) {
            if (res && res.app.user) {
                var preference = res.app.user.preferences.find(function(preference){
                    return preference.type === experienceType;
                });
                if (typeof preference != 'undefined') {
                    return callback(preference.values);
                }
            }

            if (nextLoad) {
                return nextLoad(callback);
            }
        });
    };

    var _loadLocalStoredPreferences = function(appId, user, experienceType, callback, nextLoad) {
        var cookieAppId = appId ? '_' + appId : '';
        var cookieUserId = user ? '_' + user.id : '';
        var cookieValue = OsAppApi.readCookie('os_' + experienceType + cookieAppId + cookieUserId);
        if (cookieValue) {
            return callback(cookieValue.split(','));
        }
        
        if (nextLoad) {
            return nextLoad(callback);
        }
    };

    var _loadLocalSettingPreferences = function(experienceType, callback, nextLoad) {
        
        if (experienceType === 'display-language') {
            // Begin load user's preferred languages from browser setting
            if(typeof window.navigator.languages != 'undefined' && typeof window.navigator.languages[0] == 'string'){
                return callback(
                    window.navigator.languages.map(function(language) {
                        return language.replace('-','_');
                    })
                );
            }

            if(typeof window.navigator.language == 'string') {
                return callback([window.navigator.language.replace('-','_')]);
            }

            if(typeof window.navigator.browserLanguage == 'string'){
                return callback([window.navigator.browserLanguage.replace('-','_')]);
            }

            if(typeof window.navigator.userLanguage == 'string'){
                return callback([window.navigator.userLanguage.replace('-','_')]);
            }
            // End load user's preferred languages from browser setting
        }

        if (nextLoad) {
            return nextLoad(callback);
        }
    };

    var AppApiClient = function() {

        this.authToken = null;
        this.apiUrl = 'https://app-api.onesky.app/v1';

        this.setAuthToken = function(authToken) {
            this.authToken = typeof authToken !== 'undefined' ? authToken : null;
        },
        
        this.get = function(endpoint, callback) {
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function() { 
                if (httpRequest.readyState == 4) {
                    if (httpRequest.status == 200) {
                        try {
                            return callback(JSON.parse(httpRequest.responseText));
                        } catch(err) {
                            console.log("Error when calling endpoint " + endpoint + ", responsed: " + httpRequest.responseText);
                            console.log(err);
                            return callback(null);
                        }
                    }
                    else{
                        return callback(null);
                    }
                }
            }
            httpRequest.open("GET", this.apiUrl + endpoint, true);
            if (this.authToken) {
                httpRequest.setRequestHeader("Authorization", this.authToken);   
            }
            httpRequest.send(null);
        },

        this.post = function(endpoint, body, callback) {
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function() { 
                if (httpRequest.readyState == 4) {
                    if (httpRequest.status == 200) {
                        try {
                            return callback(JSON.parse(httpRequest.responseText));
                        } catch(err) {
                            console.log("Error when calling endpoint " + endpoint + ", responsed: " + httpRequest.responseText);
                            console.log(err);
                            return callback(httpRequest.responseText);
                        }
                    }
                    else{
                        return callback(null);
                    }
                }
            }
            httpRequest.open("POST", this.apiUrl + endpoint, true);
            httpRequest.setRequestHeader("Content-Type", "application/json");
            if (this.authToken) {
                httpRequest.setRequestHeader("Authorization", this.authToken);
            }
            httpRequest.send(body);
        }
    };

    var getAppSelectorsByAppId = function(appId, displayLanguageId, callback) {

        var httpClient = new AppApiClient();
        httpClient.get('/apps/' + appId + '?languageId=' + displayLanguageId, function(response) {
            
            if (response) {
                return callback(response.app.selectors);
            }
            else {
                return callback([]);
            }
        });
    };

    var findAppSelectorByExperienceType = function(appSelectors, experienceType) {

        return appSelectors.find(function(selector) {
            return selector.type === experienceType;
        });
    }

    var readPreferenceValues = function(appId, user, experienceType, respectOrder, fallbackValue, callback) {

        var isAutoDetectionEnabled = respectOrder.includes('auto-detection');
        var isAutoDetectionFirst = respectOrder[0] === 'auto-detection';

        if (isAutoDetectionFirst) {
            // detect local setting first
            return _loadLocalSettingPreferences(experienceType, callback, function(){
                // then local stored
                return _loadLocalStoredPreferences(appId, user, experienceType, callback, function(){
                    // then remote stored
                    if (appId && user) {
                        return _loadRemoteStoredPreferences(appId, user, experienceType, callback, null);
                    }
                });
            });
        }
        else {
            // local stored first
            return _loadLocalStoredPreferences(appId, user, experienceType, callback, function(){
                // then remote stored
                if (appId && user) {
                    return _loadRemoteStoredPreferences(appId, user, experienceType, callback, function(){
                        // then local setting
                        return _loadLocalSettingPreferences(experienceType, callback, null);
                    });
                }
                else {
                    if (isAutoDetectionEnabled) {
                        // for anonymous user, skip remote storage found
                        return _loadLocalSettingPreferences(experienceType, callback, null);
                    }
                }
            });
        }

        return callback([fallbackValue]);
    };

    var writePreferenceValues = function(appId, user, experienceType, preferenceValues, callback) {
        // Begin store user preference in cookie for both anonymous and identified user
        var cookieAppId = appId ? '_' + appId : '';
        var cookieUserId = user ? '_' + user.id : '';
        OsAppApi.writeCookie('os_' + experienceType + cookieAppId + cookieUserId, preferenceValues.join(','));
        // End store user preference in cookie for both anonymous and identified user

        var response = {
            type: experienceType,
            values: preferenceValues,
            message: "Preference updated successfully"
        };

        // Begin call Locale API to save identified user languages
        if (appId && user) {
            var endpoint = '/apps/' + appId + '/users/' + user.id
            var httpClient = new AppApiClient();
            if(user.hasOwnProperty('userHash')){
                httpClient.setAuthToken(user.userHash);
            }
            
            var userName = typeof user.name != 'undefined' ? user.name : null;
            var userEmail = typeof user.email != 'undefined' ? user.email : null;

            var postBody = {
                name: userName,
                email: userEmail,
                preference: {
                    type: experienceType,
                    values: preferenceValues
                }
            };

            httpClient.post(endpoint, JSON.stringify(postBody), function(res) {
                response.message = res ? res.message : '';
                return callback(response);
            });
        }
        else {
            return callback(response);
        }
    };

    var translateAppTexts = function(appId, postBody, callback) {
        // Begin call Locale API to save identified user languages
        if (appId && postBody) {
            var endpoint = '/apps/' + appId + '/translations';
            var httpClient = new AppApiClient();

            // limit the source content to length limit
            var textLengthLimit = 5000;
            var limitedSourceTexts = postBody.sourceTexts.map(function(text){
                return text.substring(0, textLengthLimit);
            });
            postBody.sourceTexts = limitedSourceTexts;

            httpClient.post(endpoint, JSON.stringify(postBody), function(response) {
                return callback(response);
            });
        }
    };

    var readCookie = function(cookieKey) {
        var name = cookieKey + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return(c.substring(name.length, c.length));
            }
        }
        return null;
    };

    var writeCookie = function(cookieKey, value) {
        var d = new Date();
        d.setTime(d.getTime() + (_cookieExpirationDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cookieKey + "=" + value + "; " + expires + "; path=/";
    };

    return {
        getAppSelectorsByAppId: getAppSelectorsByAppId,
        findAppSelectorByExperienceType: findAppSelectorByExperienceType,
        readCookie: readCookie,
        writeCookie: writeCookie,
        readPreferenceValues: readPreferenceValues,
        writePreferenceValues: writePreferenceValues,
        translateAppTexts: translateAppTexts
    };

})();


/**
Display Language Preference Module
*/
(function (OsAppApi) {

    var _experienceType = 'display-language';

    OsAppApi.loadUserDisplayLanguage = function(appId, user, appSelector, callback){
        OsAppApi.readPreferenceValues(appId, user, _experienceType, appSelector.respectOrder, appSelector.defaultValue, function(preferences){
            return callback(preferences);
        });
    };

    OsAppApi.saveUserDisplayLanguage = function(appId, user, value, callback) {
        return OsAppApi.writePreferenceValues(appId, user, _experienceType, [value], callback);
    };
    
    return OsAppApi;

})(OsAppApi || {});


/**
Interested Regions Preference Module
*/
(function (OsAppApi) {

    var _experienceType = 'interested-regions';

    OsAppApi.loadUserInterestedRegions = function(appId, user, appSelector, callback){
        OsAppApi.readPreferenceValues(appId, user, _experienceType, appSelector.respectOrder, appSelector.defaultValue, function(preferences){
            return callback(preferences);
        });
    };

    OsAppApi.saveUserInterestedRegions = function(appId, user, values, callback){
        return OsAppApi.writePreferenceValues(appId, user, _experienceType, values, callback);
    };

    return OsAppApi;

})(OsAppApi);


/**
Display Currency Preference Module
*/
(function (OsAppApi) {

    var _experienceType = 'display-currency';

    OsAppApi.loadUserDisplayCurrency = function(appId, user, appSelector, callback){
        OsAppApi.readPreferenceValues(appId, user, _experienceType, appSelector.respectOrder, appSelector.defaultValue, function(preferences){
            return callback(preferences);
        });
    };

    OsAppApi.saveUserDisplayCurrency = function(appId, user, value, callback) {
        return OsAppApi.writePreferenceValues(appId, user, _experienceType, [value], callback);
    };
    
    return OsAppApi;

})(OsAppApi);


/**
Stationed Timezone Preference Module
*/
(function (OsAppApi) {

    var _experienceType = 'display-timezone';

    OsAppApi.loadUserStationedTimezone = function(appId, user, appSelector, callback){
        OsAppApi.readPreferenceValues(appId, user, _experienceType, appSelector.respectOrder, appSelector.defaultValue, function(preferences){
            return callback(preferences);
        });
    };

    OsAppApi.saveUserStationedTimezone = function(appId, user, value, callback) {
        return OsAppApi.writePreferenceValues(appId, user, _experienceType, [value], callback);
    };
    
    return OsAppApi;

})(OsAppApi);