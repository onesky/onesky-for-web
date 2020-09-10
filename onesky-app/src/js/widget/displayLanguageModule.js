/**
 Display Language Module
 */
(function (OsWidget) {

    var _type = 'display-language';
    var _selector = OsAppApi.findAppSelectorByExperienceType(OsSelectors, _type);

    // called by widget init
    var _loader = function () {
        var displayLanguageSelector = OsAppApi.findAppSelectorByExperienceType(OsSelectors, _type);
        OsAppApi.loadUserDisplayLanguage(onesky.app.apiKey, onesky.app.id, OsWidget.getUser(), displayLanguageSelector, function (preferencedValues) {
            OsWidget.render(_type, preferencedValues);
        });
    }

    // called by widget render after the caller loader is loaded
    var _selectorRender = function (preferencedValues) {
        OsWidget.addStyle(_selector.css);
        Array.prototype.slice.call(document.getElementsByTagName(_selector.htmlTag)).map(function (htmlTagElement) {
            var preferencedLocale = _selector.locales.find(function (locale) {
                return locale.id === preferencedValues[0];
            });

            if (preferencedLocale) {
                // Begin reflect preference locale on url by rewriting (no refresh) url path
                var mappedTransition = _selector.webTransitionMappings.find(function (mapping) {
                    return mapping.localeId == preferencedLocale.id;
                });

                if (mappedTransition && mappedTransition.location) {

                    var queryComponents = mappedTransition.location.split('=');
                    var isQueryLocation = queryComponents.length == 2;
                    var isHostnameLocation = mappedTransition.location.includes('://');

                    if (isQueryLocation) {
                        // query
                        var parameter = queryComponents[0];
                        parameter = parameter.replace('?', '').replace('&', '');
                        OsWidget.rewriteParameteredUrlWithoutRefresh(parameter, preferencedLocale.platformLocale);
                    }
                    else if (!isHostnameLocation) {
                        // path
                        var urlPathObject = OsWidget.getUrlPathObject(window.location.pathname);
                        OsWidget.rewritePathUrlWithoutRefresh(mappedTransition.location + urlPathObject.fileName);
                    }
                }
            }
            // End reflect preference locale on url by rewriting (no refresh) url path

            // no selector options match user preferences
            if (typeof preferencedLocale === 'undefined') {
                preferencedLocale = _selector.locales.find(function (locale) {
                    return locale.id === _selector.defaultValue;
                });
            }

            // need to handle language direction issue for display-language experience
            var direction = 'ltr';
            if (typeof preferencedLocale.additionalProperties !== 'undefined') {
                var directionObject = preferencedLocale.additionalProperties.find(function (property) {
                    return property.key === 'direction';
                });
                direction = directionObject.value;
            }

            var directionStyle = document.getElementById("os-direction-style");
            if (directionStyle) {
                directionStyle.innerHTML = '*{direction: ' + direction + ';}';
            }
            else {
                directionStyle = document.createElement("style");
                directionStyle.setAttribute("id", "os-direction-style");
                directionStyle.type = "text/css";
                directionStyle.innerHTML = '*{direction: ' + direction + ';}';
                document.head.appendChild(directionStyle);
            }

            var directionStylePostfix = direction === 'rtl' ? '-rtl' : '';

            // Clean up the element
            htmlTagElement.innerHTML = '';

            if (_selector.theme === 'general') {
                htmlTagElement.appendChild(_generalStyleElement(preferencedLocale, directionStylePostfix));
            }
            else {
                htmlTagElement.appendChild(_nonGeneralStyleElement(preferencedLocale, directionStylePostfix));
            }
        });
    };

    var _onClicked = function (event) {
        // selector option (this.value) is a platform locale
        var platformLocale = this.value;

        var targetLocale = null;
        var direction = null;
        // the displayLanguageFromUrl is platform locale, we need to convert it to locale id for matching
        targetLocale = _selector.locales.find(function (locale) {
            return locale.platformLocale == platformLocale;
        });
        if (targetLocale) {

            if (typeof targetLocale.additionalProperties !== 'undefined') {
                var directionObject = targetLocale.additionalProperties.find(function (property) {
                    return property.key === 'direction';
                });
                direction = directionObject.value;

                var directionStyle = document.getElementById("os-direction-style");
                if (directionStyle) {
                    directionStyle.innerHTML = '*{direction: ' + direction + ';}';
                }
                else {
                    directionStyle = document.createElement("style");
                    directionStyle.setAttribute("id", "os-direction-style");
                    directionStyle.type = "text/css";
                    directionStyle.innerHTML = '*{direction: ' + direction + ';}';
                    document.head.appendChild(directionStyle);
                }
            }
        }

        OsAppApi.saveUserDisplayLanguage(onesky.app.apiKey, onesky.app.id, OsWidget.getUser(), targetLocale.id, function (response) {
            OsWidget.webTransition(_selector, [targetLocale.platformLocale]);
        });
    };

    var _generalStyleElement = function (preferencedLocale, directionStyle) {
        // Create "general" dropdown with on-click event listener
        /** Sample in HTML
         <select>
         <option>Language 1</option>
         <option>Language 2</option>
         <option>Language 3</option>
         </select>
         */

        var selectElement = document.createElement('select');
        selectElement.addEventListener('change', _onClicked);

        if (!_selector.respectOrder.includes('user-input')) {
            selectElement.disabled = true;
            var optionElement = document.createElement('option');
            optionElement.innerHTML = preferencedLocale.displayName;
            optionElement.value = preferencedLocale.platformLocale;
            selectElement.appendChild(optionElement);
        } else {
            _selector.options.map(function (option) {
                var optionLocale = _selector.locales.find(function (locale) {
                    // selector options are in locale id, not platform locale
                    return locale.id === option;
                });

                var optionElement = document.createElement('option');
                optionElement.innerHTML = optionLocale.displayName;
                optionElement.value = optionLocale.platformLocale;
                if (optionLocale.platformLocale == preferencedLocale.platformLocale) {
                    optionElement.selected = true;
                }

                selectElement.appendChild(optionElement);
            });
        }

        return selectElement;
    };

    var _nonGeneralStyleElement = function (preferencedLocale, directionStyle) {
        // Create "non-general" dropdown with on-click event listener
        /** Sample in HTML
         <div class="oswidget-dropdown-language">
         <button class="oswidget-dropdown-language-button">
         <div class="oswidget-dropdown-language-current-selection">
         <span class="oswidget-dropdown-language-current-selection-name">
         <div class="oswidget-dropdown-language-arrow">&#x25BE;</div>
         </div>
         <div class="oswidget-dropdown-language-content">
         <a>Language 1</a>
         <a>Language 2</a>
         <a>Language 3</a>
         </div>
         </button>
         </div>
         */
        var dropdownElement = document.createElement('div');
        dropdownElement.className = 'oswidget-dropdown-language' + directionStyle;

        var buttonElement = document.createElement('button');
        buttonElement.className = 'oswidget-dropdown-language-button' + directionStyle;

        var dropdownCurrentLanguageElement = document.createElement('div');
        dropdownCurrentLanguageElement.className = 'oswidget-dropdown-language-current-selection' + directionStyle;

        var dropdownCurrentLanguageNameElement = document.createElement('span');
        dropdownCurrentLanguageNameElement.className = 'oswidget-dropdown-language-current-selection-name' + directionStyle;
        dropdownCurrentLanguageNameElement.innerHTML = preferencedLocale.displayName;

        var dropdownArrowElement = document.createElement('div');
        dropdownArrowElement.className = 'oswidget-dropdown-language-arrow' + directionStyle;
        dropdownArrowElement.innerHTML = '&#x25BE';

        var dropdownContentElement = document.createElement('div');
        dropdownContentElement.className = 'oswidget-dropdown-language-content' + directionStyle;

        dropdownElement.appendChild(buttonElement);
        buttonElement.appendChild(dropdownCurrentLanguageElement);

        if (_selector.respectOrder.includes('user-input')) {
            buttonElement.appendChild(dropdownContentElement);
            dropdownCurrentLanguageElement.appendChild(dropdownCurrentLanguageNameElement);
            dropdownCurrentLanguageElement.appendChild(dropdownArrowElement);

            _selector.options.map(function (option) {

                var optionLocale = _selector.locales.find(function (locale) {
                    return locale.id === option;
                });

                var optionElement = document.createElement('a');
                optionElement.innerHTML = optionLocale.displayName;
                optionElement.value = option;
                optionElement.addEventListener('click', _onClicked);
                dropdownContentElement.appendChild(optionElement);
            });
        }

        return dropdownElement;
    };

    OsWidget.addLoader({ type: _type, loader: _loader });
    OsWidget.addSelectorRender({ type: _type, render: _selectorRender });

    return OsWidget;

})(OsWidget);
