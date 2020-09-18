(function () {

    // Begin code-gen: Selector of app rule
    console.log("Keep this placeholder mark for selectors code generation: begin");
    window.OsSelectors = [{"type":"display-language","htmlTag":"language-selector","theme":"general","options":["ar_AE","en_US","ru_RU","zh_Hans_CN","zh_Hant_TW"],"defaultValue":"en_US","respectOrder":["user-input","auto-detection"],"webTransitionMappings":[{"localeId":"ar_AE","location":"?lang=ar-AE"},{"localeId":"en_US","location":"?lang=en-US"}, {"localeId":"ru_RU","location":"?lang=ru-RU"},{"localeId":"zh_Hans_CN","location":"?lang=zh-Hans-CN"},{"localeId":"zh_Hant_TW","location":"?lang=zh-Hant-TW"}], "isWebTransitionReloadPage":false,"locales":[{"id":"ar_AE","displayName":"العربية","platformLocale":"ar-AE","additionalProperties":[{"key":"direction","value":"rtl"}]}, {"id":"en_US","displayName":"English","platformLocale":"en-US","additionalProperties":[{"key":"direction","value":"ltr"}]},{"id":"ru_RU","displayName":"русский", "platformLocale":"ru-RU","additionalProperties":[{"key":"direction","value":"ltr"}]},{"id":"zh_Hans_CN","displayName":"简体中文 (中国)","platformLocale":"zh-Hans-CN", "additionalProperties":[{"key":"direction","value":"ltr"}]},{"id":"zh_Hant_TW","displayName":"繁體中文 (台灣)","platformLocale":"zh-Hant-TW","additionalProperties": [{"key":"direction","value":"ltr"}]}], "css":".oswidget-dropdown-language-current-selection,.oswidget-dropdown-language-current-selection-rtl{background-image:url(https://onesky-locale-widget-web-stag.firebaseapp.com/images/global.png);background-repeat:no-repeat;background-size:19px 19px}.oswidget-dropdown-language{position:relative;display:inline-block}.oswidget-dropdown-language-button{padding:0;font-size:13px;border:none;outline:0;cursor:pointer}.oswidget-dropdown-language-current-selection{border:1px solid #cacaca;background-color:#fafafa;padding:5px 5px 5px 20px;width:170px;background-position:4px 50%}.oswidget-dropdown-language-current-selection-name{width:150px}.oswidget-dropdown-language-arrow{float:right}.oswidget-dropdown-language-content{display:none;position:absolute;min-width:195px;box-shadow:0 2px 4px 0 rgba(0,0,0,.2);border:1px solid #cacaca;z-index:99}.oswidget-dropdown-language-content a{color:#333;padding:10px 10px 10px 32px;text-decoration:none;text-align:left;display:block}.oswidget-dropdown-language-content a:hover{background-color:#ddd;color:#000}.oswidget-dropdown-language:hover .oswidget-dropdown-language-content{display:block;background-color:#fafafa}.oswidget-dropdown-language:hover .oswidget-dropdown-language-button{color:#00a4bd}.oswidget-dropdown-language-rtl{position:relative;display:inline-block}.oswidget-dropdown-language-button-rtl{padding:0;font-size:13px;border:none;outline:0;cursor:pointer}.oswidget-dropdown-language-current-selection-rtl{border:1px solid #cacaca;background-color:#fafafa;padding:5px 20px 5px 5px;width:170px;background-position:171px 50%}.oswidget-dropdown-language-current-selection-name-rtl{width:150px}.oswidget-dropdown-language-arrow-rtl{float:left}.oswidget-dropdown-language-content-rtl{display:none;position:absolute;min-width:195px;box-shadow:0 0 4px 2px rgba(0,0,0,.2);border:1px solid #cacaca;z-index:99}.oswidget-dropdown-language-content-rtl a{color:#333;padding:10px 32px 10px 10px;text-decoration:none;text-align:right;display:block}.oswidget-dropdown-language-content-rtl a:hover{background-color:#ddd;color:#000}.oswidget-dropdown-language-rtl:hover .oswidget-dropdown-language-content-rtl{display:block;background-color:#fafafa}.oswidget-dropdown-language-rtl:hover .oswidget-dropdown-language-button-rtl{color:#00a4bd}"},{"type":"display-region","htmlTag":"region-selector","theme":"general","options":["CN","JP","TW","US","RU"],"defaultValue":"US","respectOrder": ["user-input","auto-detection"],"webTransitionMappings":[{"localeId":"CN","location":"?region=CN"},{"localeId":"JP","location":"?region=JP"},{"localeId":"TW","location":"?region=TW"}, {"localeId":"US","location":"?region=US"},{"localeId":"AE","location":"?region=AE"},{"localeId":"RU","location":"?region=RU"}],"isWebTransitionReloadPage":true,"locales": [{"id":"AE","displayName":"United Arab Emirates","regionLanguages":[],"platformLocale":"AE"},{"id":"CN","displayName":"China","regionLanguages":[],"platformLocale":"CN"}, {"id":"JP","displayName":"Japan","regionLanguages":[],"platformLocale":"JP"},{"id":"RU","displayName":"Russia","regionLanguages":[],"platformLocale":"RU"},{"id":"TW","displayName": "Taiwan","regionLanguages":[],"platformLocale":"TW"},{"id":"US","displayName":"United States","regionLanguages":[],"platformLocale":"US"}], "css":".oswidget-dropdown-region-current-selection,.oswidget-dropdown-region-current-selection-rtl{background-image:url(https://onesky-locale-widget-web-stag.firebaseapp.com/images/global.png);background-repeat:no-repeat;background-size:19px 19px}.oswidget-dropdown-region{position:relative;display:inline-block}.oswidget-dropdown-region-button{padding:0;font-size:13px;border:none;outline:0;cursor:pointer}.oswidget-dropdown-region-current-selection{border:1px solid #cacaca;background-color:#fafafa;padding:5px 5px 5px 20px;width:170px;background-position:4px 50%}.oswidget-dropdown-region-current-selection-name{width:150px}.oswidget-dropdown-region-arrow{float:right}.oswidget-dropdown-region-content{display:none;position:absolute;min-width:195px;box-shadow:0 2px 4px 0 rgba(0,0,0,.2);border:1px solid #cacaca;z-index:99}.oswidget-dropdown-region-content a{color:#333;padding:10px 10px 10px 32px;text-decoration:none;text-align:left;display:block}.oswidget-dropdown-region-content a:hover{background-color:#ddd;color:#000}.oswidget-dropdown-region:hover .oswidget-dropdown-region-content{display:block;background-color:#fafafa}.oswidget-dropdown-region:hover .oswidget-dropdown-region-button{color:#00a4bd}.oswidget-dropdown-region-rtl{position:relative;display:inline-block}.oswidget-dropdown-region-button-rtl{padding:0;font-size:13px;border:none;outline:0;cursor:pointer}.oswidget-dropdown-region-current-selection-rtl{border:1px solid #cacaca;background-color:#fafafa;padding:5px 20px 5px 5px;width:170px;background-position:171px 50%}.oswidget-dropdown-region-current-selection-name-rtl{width:150px}.oswidget-dropdown-region-arrow-rtl{float:left}.oswidget-dropdown-region-content-rtl{display:none;position:absolute;min-width:195px;box-shadow:0 0 4px 2px rgba(0,0,0,.2);border:1px solid #cacaca;z-index:99}.oswidget-dropdown-region-content-rtl a{color:#333;padding:10px 32px 10px 10px;text-decoration:none;text-align:right;display:block}.oswidget-dropdown-region-content-rtl a:hover{background-color:#ddd;color:#000}.oswidget-dropdown-region-rtl:hover .oswidget-dropdown-region-content-rtl{display:block;background-color:#fafafa}.oswidget-dropdown-region-rtl:hover .oswidget-dropdown-region-button-rtl{color:#00a4bd}"},{"type":"interested-regions","htmlTag": "interested-regions-selector","theme":"general", "options":["US", "JP", "TW", "RU"],"defaultValue": "US","locales":[{"id":"AE","displayName":"United Arab Emirates","regionLanguages":[],"platformLocale":"AE"},{"id":"CN","displayName":"China","regionLanguages":[],"platformLocale":"CN"}, {"id":"JP","displayName":"Japan","regionLanguages":[],"platformLocale":"JP"},{"id":"RU","displayName":"Russia","regionLanguages":[],"platformLocale":"RU"},{"id":"TW","displayName": "Taiwan","regionLanguages":[],"platformLocale":"TW"},{"id":"US","displayName":"United States","regionLanguages":[],"platformLocale":"US"}], "css":".oswidget-interested-regions-multi-select-checkbox{width:200px}.oswidget-interested-regions-select-option{position:relative}.oswidget-interested-regions-select-option select{width:100%;font-weight:700}.oswidget-interested-regions-select-bg{position:absolute;left:0;right:0;top:0;bottom:0}#oswidget-interested-regions{display:none;border:1px solid #dadada}#oswidget-interested-regions label{display:block;padding:0;font-size:13px}#checkboxes label:hover{background-color:#1e90ff}"},{"type":"understood-languages","htmlTag": "understood-languages-selector","theme":"general", "options":["en_US", "zh_Hant_TW", "ru_RU"],"defaultValue": "en_US","locales":[{"id":"ar_AE","displayName":"العربية","platformLocale":"ar-AE","additionalProperties":[{"key":"direction","value":"rtl"}]}, {"id":"en_US","displayName":"English","platformLocale":"en-US","additionalProperties":[{"key":"direction","value":"ltr"}]},{"id":"ru_RU","displayName":"русский", "platformLocale":"ru-RU","additionalProperties":[{"key":"direction","value":"ltr"}]},{"id":"zh_Hans_CN","displayName":"简体中文 (中国)","platformLocale":"zh-Hans-CN", "additionalProperties":[{"key":"direction","value":"ltr"}]},{"id":"zh_Hant_TW","displayName":"繁體中文 (台灣)","platformLocale":"zh-Hant-TW","additionalProperties": [{"key":"direction","value":"ltr"}]}], "css":".oswidget-understood-languages-multi-select-checkbox{width:200px}.oswidget-understood-languages-select-option{position:relative}.oswidget-understood-languages-select-option select{width:100%;font-weight:700}.oswidget-understood-languages-select-bg{position:absolute;left:0;right:0;top:0;bottom:0}#oswidget-understood-languages{display:none;border:1px solid #dadada}#oswidget-understood-languages label{display:block;padding:0;font-size:13px}#checkboxes label:hover{background-color:#1e90ff}"}];
    console.log("Keep this placeholder mark for selectors code generation: end");
    // End code-gen: Selector of app rule

    window.OsWidget = {
        loaders: new Array(),   // {type: _type, loader: _loader} to be iterated when init
        selectorRenders: new Array(),   // {type: _type, render: _render}

        init: function () {
            window.addEventListener('load', function () {
                OsWidget.initWithUrl('display-language');
                OsWidget.initWithUrl('display-region');
                OsWidget.initWithUrl('interested-regions');
                OsWidget.initWithUrl('understood-languages');

                OsWidget.loaders.forEach(function (loaderObject) {
                    loaderObject.loader();
                });
            });
        },

        // when a locale preference is located a few clicks away and the app manipulates the dom after DOMContentLoaded event is fired
        // this fixes the dom event listener fires the DOMContentLoaded event before the document is loaded
        replace: function () {
            window.OsWidget.initWithUrl('display-language');
            window.OsWidget.initWithUrl('display-region');
            window.OsWidget.initWithUrl('interested-regions');
            window.OsWidget.initWithUrl('understood-languages');
            window.OsWidget.loaders.forEach(function (loaderObject) {
                loaderObject.loader();
            });
        },

        // handle selector's selected options according to url hostname, path or query
        initWithUrl: function (experienceType) {
            var localeId =
                OsWidget.getUrlQueryLocaleFromMappedLocation(experienceType) ||
                OsWidget.getUrlPathLocaleFromMappedLocation(experienceType) ||
                OsWidget.getUrlHostnameLocaleFromMappedLocation(experienceType);

            var targetLocales = [];

            if (localeId) {

                var targetLocale = null;

                var matchedOption = OsSelectors.find(function (selector) {

                    if (selector.type == experienceType) {
                        // the displayLanguageFromUrl is platform locale, we need to convert it to locale id for matching
                        targetLocale = selector.locales.find(function (locale) {
                            return locale.platformLocale == localeId;
                        });

                        if (targetLocale) {
                            return selector.options.includes(targetLocale.id);
                        }
                        else {
                            console.warn('Platform locale ' + localeId + ' not found for the type ' + experienceType + '.');
                        }
                    }
                });

                // extracted options from URL is valid
                if (matchedOption) {
                    targetLocales.push(targetLocale.id);

                    // remove the current type loader so that it won't be called to override the preference from URL
                    OsWidget.loaders = OsWidget.loaders.filter(function (loaderObject) {
                        return loaderObject.type !== experienceType;
                    });
                }
            }

            // render the selector with the locale value extracted from URL. Even there has no locale matches on URL, the selector will still being rendered
            OsWidget.render(experienceType, targetLocales);
        },

        // to be itereated when init
        addLoader: function (loader) {
            OsWidget.loaders.push(loader);
        },

        // called by other modules
        addSelectorRender: function (selectorRender) {
            OsWidget.selectorRenders.push(selectorRender);
        },

        // called by other modules
        addStyle: function (css) {
            var style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = css;
            document.head.appendChild(style);
        },

        // get user
        getUser: function () {
            var user = typeof onesky.identifiedUser !== 'undefined' ? onesky.identifiedUser : null;
            if (user) {
                user.id = typeof user.id !== 'undefined' ? user.id : null;
                user.name = typeof user.name !== 'undefined' ? user.name : '';
                user.email = typeof user.email !== 'undefined' ? user.email : '';
            }
            return user;
        },

        // called by init function, render selectors after loaded user's display language preference
        render: function (experienceType, preferencedValues) {
            var selectorRender = OsWidget.selectorRenders.find(function (selectorRenderObject) {
                return selectorRenderObject.type === experienceType;
            });
            selectorRender.render(preferencedValues);
        },

        // called when an option is clicked in selector
        webTransition: function (selector, values) {

            var targetPlatformLocale = values[0];

            var targetLocale = selector.locales.find(function (locale) {
                return locale.platformLocale == targetPlatformLocale;
            });

            if (targetLocale) {
                var mappedTransition = selector.webTransitionMappings.find(function (mapping) {
                    return mapping.localeId == targetLocale.id;
                });

                if (mappedTransition && mappedTransition.location) {

                    var queryComponents = mappedTransition.location.split('=');
                    var isQueryLocation = queryComponents.length == 2;
                    var isHostnameLocation = mappedTransition.location.includes('://');

                    if (isQueryLocation) {
                        // query
                        var parameter = queryComponents[0];
                        parameter = parameter.replace('?', '').replace('&', '');
                        OsWidget.rewriteParameteredUrlWithRefresh(parameter, targetPlatformLocale);
                    }
                    else if (isHostnameLocation) {
                        // hostname changes must need reload
                        window.location.href = mappedTransition.location;
                    }
                    else {
                        // path
                        var urlPathObject = OsWidget.getUrlPathObject(window.location.pathname);
                        OsWidget.rewritePathUrlWithRefresh(mappedTransition.location + urlPathObject.fileName);
                    }
                }
                else {
                    console.warn("Transition location of locale '" + targetLocale.id + "' is not defined.");
                }
            }
        },

        getUrlPathObject: function (fullPath) {
            var noFilePath = fullPath.substring(0, fullPath.lastIndexOf("/"));
            var fileName = fullPath.replace(noFilePath, '');
            return {
                path: noFilePath,
                fileName: fileName
            }
        },

        getUrlQueryParameterValue: function (parameterName) {
            return decodeURIComponent((new RegExp('[?|&]' + parameterName + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
        },

        getQueryParameterNameFromOutput: function (output) {
            if (output.url && output.url.query) {
                return output.url.query.pattern.split('=')[0];
            }
            return null;
        },

        urlGetAddedParameter: function (url, param, value) {
            var hash = {};
            var parser = document.createElement('a');
            parser.href = url;

            var parameters = parser.search.split(/\?|&/);
            for (var i = 0; i < parameters.length; i++) {
                if (!parameters[i])
                    continue;

                var ary = parameters[i].split('=');
                hash[ary[0]] = ary[1];
            }

            hash[param] = value;

            var list = [];
            Object.keys(hash).forEach(function (key) {
                list.push(key + '=' + hash[key]);
            });

            parser.search = '?' + list.join('&');
            return parser.href;
        },

        // get locale id from url if the hostname matched
        getUrlHostnameLocaleFromMappedLocation: function (experienceType) {

            var hostname = window.location.hostname;

            var selector = OsSelectors.find(function (selector) {
                return selector.type === experienceType;
            });

            var localeFromUrl = '';

            if (selector && selector.webTransitionMappings) {
                selector.webTransitionMappings.map(function (mapping) {
                    if (mapping.location == hostname) {
                        localeFromUrl = mapping.localeId;
                    }
                });
            }

            return localeFromUrl;
        },

        // get locale id from url if the path matched
        getUrlPathLocaleFromMappedLocation: function (experienceType) {

            var urlPathObject = OsWidget.getUrlPathObject(window.location.pathname);

            var selector = OsSelectors.find(function (selector) {
                return selector.type === experienceType;
            });

            var localeFromUrl = '';

            if (selector && selector.webTransitionMappings) {
                selector.webTransitionMappings.map(function (mapping) {
                    if (mapping.location == urlPathObject.path) {
                        localeFromUrl = mapping.localeId;
                    }
                });
            }

            return localeFromUrl;
        },

        // get locale id from url if the query param matched
        getUrlQueryLocaleFromMappedLocation: function (experienceType) {
            // query from url in JSON
            var queryJson = OsWidget.queryStringToJson(window.location.search);

            // url location query params from rules definition
            var queryParams = [];

            // check if the query, path or hostname match the selector mapping locations
            var localeFromUrl = '';

            var selector = OsSelectors.find(function (selector) {
                return selector.type === experienceType;
            });

            if (selector && selector.webTransitionMappings) {
                selector.webTransitionMappings.map(function (mapping) {
                    Object.keys(OsWidget.queryStringToJson(mapping.location)).map(function (key) {
                        if (!queryParams.includes(key)) {
                            queryParams.push(key);
                        }
                    });
                });
            }

            Object.keys(queryJson).map(function (key) {
                if (queryParams.includes(key)) {
                    localeFromUrl = queryJson[key];
                }
            });

            return localeFromUrl;
        },

        queryStringToJson: function (queryString) {
            try {
                return JSON.parse('{"' + queryString.replace('?', '').replace(/=/g, '":"').replace(/&/g, '","') + '"}');
            }
            catch (err) {
                return {};
            }
        },

        rewriteParameteredUrlWithRefresh: function (parameterName, parameterValue) {
            var url = OsWidget.urlGetAddedParameter(location.href, parameterName, parameterValue);
            window.location.href = url;
        },

        rewriteParameteredUrlWithoutRefresh: function (parameterName, parameterValue) {
            var url = OsWidget.urlGetAddedParameter(location.href, parameterName, parameterValue);
            window.history.replaceState({}, 'title', url);
            OsWidget.init();
        },

        rewritePathUrlWithRefresh: function (path) {
            window.location.pathname = path;
        },

        rewritePathUrlWithoutRefresh: function (path) {
            var locationSplit = location.href.split(location.pathname);
            var url = locationSplit[0] + path + locationSplit[1];
            window.history.replaceState({}, 'title', url);
            OsWidget.init();
        }
    },

        window.OsWidgetStylist = {
            renderHtmlSelector: function (htmlTagElement, options, preferencedValue, onChangedCallback) {
                // clean up the element
                htmlTagElement.innerHTML = '';

                // Create SELECT with on change event listener
                var selectorElement = document.createElement('SELECT');
                selectorElement.addEventListener('change', onChangedCallback);
                htmlTagElement.appendChild(selectorElement);

                options.map(function (option) {
                    // TODO: make sure preferencedValue is the platform locale
                    // console.log(option.value + ' vs ' + preferencedValue);
                    var isSelected = (option.value == preferencedValue) ? true : false;
                    var optionElement = document.createElement('OPTION');
                    optionElement.value = option.value;
                    optionElement.text = option.name;
                    optionElement.selected = isSelected;
                    selectorElement.appendChild(optionElement);
                });
            }
        };
}());
