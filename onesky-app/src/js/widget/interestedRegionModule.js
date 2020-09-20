/**
 Interested Regions Module
 */
(function (OsWidget) {

    var _type = 'interested-regions';
    var _selector = OsAppApi.findAppSelectorByExperienceType(OsSelectors, _type);
    var _expanded = false;

    // called by widget init
    var _loader = function () {
        var interestedRegionsSelector = OsAppApi.findAppSelectorByExperienceType(OsSelectors, _type);
        OsAppApi.loadUserInterestedRegions(onesky.app.apiKey, onesky.app.id, OsWidget.getUser(), interestedRegionsSelector, function (preferencedValues) {
            OsWidget.render(_type, preferencedValues);
        });
    }

    // called by widget render after the caller loader is loaded
    var _selectorRender = function (preferencedValues) {
        OsWidget.addStyle(_selector.css);
        Array.prototype.slice.call(document.getElementsByTagName(_selector.htmlTag)).map(function (htmlTagElement) {
            var preferencedLocales = _selector.locales.filter(function (locale) {
                return preferencedValues.includes(locale.id);
            });

            // no selector options match user preferences
            if (preferencedLocales.length === 0) {
                preferencedLocales = _selector.locales.filter(function (locale) {
                    return locale.id === _selector.defaultValue;
                });
            }

            // Clean up the element
            htmlTagElement.innerHTML = '';

            if (_selector.theme === 'general') {
                htmlTagElement.appendChild(_generalStyleElement(preferencedLocales));
            }
            else {
                htmlTagElement.appendChild(_nonGeneralStyleElement(preferencedLocales));
            }
        });
    };

    var _onClicked = function (event) {

        var checkboxes = document.getElementById("oswidget-interested-regions");
        if (!_expanded) {
            checkboxes.style.display = "block";
            _expanded = true;
        } else {
            checkboxes.style.display = "none";
            _expanded = false;
            var targetLocales = [];
            var inputElements = document.getElementsByName('oswidget-interested-regions');
            for(var i=0; inputElements[i]; ++i){
                if(inputElements[i].checked){
                    var targetLocale = _selector.locales.find(function (locale) {
                        return locale.platformLocale == inputElements[i].id;
                    });
                    if (targetLocale) {
                        targetLocales.push(targetLocale.id);
                    }
                }
            }
            OsAppApi.saveUserInterestedRegions(onesky.app.apiKey, onesky.app.id, OsWidget.getUser(), targetLocales, function (response) {
            });
        }

    };

    var _generalStyleElement = function (preferencedLocales) {
        // Create "general" dropdown with on-click event listener
        /** Sample in HTML
         <form>
         <div class="oswidget-interested-regions-multi-select-checkbox">
         <div class="oswidget-interested-regions-select-option"">
         <select>
         <option>Select an option</option>
         </select>
         <div class="oswidget-interested-regions-select-bg"></div>
         </div>
         <div id="oswidget-interested-regions">
         <label for="US">
         <input type="checkbox" id="US" name="oswidget-interested-regions"/>US
         </label>
         <label for="HK">
         <input type="checkbox" id="HK" name="oswidget-interested-regions" />HK
         </label>
         <label for="TH">
         <input type="checkbox" id="TH" name="oswidget-interested-regions" />TH
         </label>
         </div>
         </div>
         </form>
         */

        var formElement = document.createElement('form');
        var multiSelectCheckboxDivElement = document.createElement('div');
        var selectOptionDivElement = document.createElement('div');
        var interestedRegionsDivElement = document.createElement('div');
        var selectElement = document.createElement('select');
        var optionElement = document.createElement('option');
        var selectBgDivElement = document.createElement('div');

        _selector.options.map(function (option) {
            var optionLocale = _selector.locales.find(function (locale) {
                // selector options are in locale id, not platform locale
                return locale.id === option;
            });

            var label = document.createElement('label');
            label.htmlFor = optionLocale.platformLocale;

            var inputElement = document.createElement('input');
            inputElement.setAttribute('name', 'oswidget-interested-regions');
            inputElement.setAttribute('type', 'checkbox');
            inputElement.setAttribute('id', optionLocale.platformLocale);
            label.appendChild(inputElement);
            var labelText = document.createTextNode(optionLocale.displayName);
            label.appendChild(labelText);

            var optionLocaleSelected = preferencedLocales.find(function (preferencedLocale) {
                return optionLocale.platformLocale == preferencedLocale.platformLocale;
            });
            if (optionLocaleSelected) {
                inputElement.checked = true;
            }
            interestedRegionsDivElement.appendChild(label);
        });

        optionElement.innerHTML = 'Select interested regions';
        selectElement.appendChild(optionElement);
        selectBgDivElement.className = 'oswidget-interested-regions-select-bg';
        selectOptionDivElement.className = 'oswidget-interested-regions-select-option';
        selectOptionDivElement.appendChild(selectElement);
        selectOptionDivElement.appendChild(selectBgDivElement);
        selectOptionDivElement.addEventListener('click', _onClicked);

        multiSelectCheckboxDivElement.className = 'oswidget-interested-regions-multi-select-checkbox';
        interestedRegionsDivElement.setAttribute('id', 'oswidget-interested-regions');

        multiSelectCheckboxDivElement.appendChild(selectOptionDivElement);
        multiSelectCheckboxDivElement.appendChild(interestedRegionsDivElement);
        formElement.appendChild(multiSelectCheckboxDivElement);

        return formElement;
    };

    var _nonGeneralStyleElement = function (preferencedLocale, directionStyle) {
        // Create "non-general" dropdown with on-click event listener
        /** Sample in HTML
         <div class="oswidget-dropdown-region">
         <button class="oswidget-dropdown-region-button">
         <div class="oswidget-dropdown-region-current-selection">
         <span class="oswidget-dropdown-region-current-selection-name">
         <div class="oswidget-dropdown-region-arrow">&#x25BE;</div>
         </div>
         <div class="oswidget-dropdown-region-content">
         <a>Region 1</a>
         <a>Region 2</a>
         <a>Region 3</a>
         </div>
         </button>
         </div>
         */
        var dropdownElement = document.createElement('div');
        dropdownElement.className = 'oswidget-dropdown-region' + directionStyle;

        var buttonElement = document.createElement('button');
        buttonElement.className = 'oswidget-dropdown-region-button' + directionStyle;

        var dropdownCurrentRegionElement = document.createElement('div');
        dropdownCurrentRegionElement.className = 'oswidget-dropdown-region-current-selection' + directionStyle;

        var dropdownCurrentRegionNameElement = document.createElement('span');
        dropdownCurrentRegionNameElement.className = 'oswidget-dropdown-region-current-selection-name' + directionStyle;
        dropdownCurrentRegionNameElement.innerHTML = preferencedLocale.displayName;

        var dropdownArrowElement = document.createElement('div');
        dropdownArrowElement.className = 'oswidget-dropdown-region-arrow' + directionStyle;
        dropdownArrowElement.innerHTML = '&#x25BE';

        var dropdownContentElement = document.createElement('div');
        dropdownContentElement.className = 'oswidget-dropdown-region-content' + directionStyle;

        dropdownElement.appendChild(buttonElement);
        buttonElement.appendChild(dropdownCurrentRegionElement);

        if (_selector.respectOrder.includes('user-input')) {
            buttonElement.appendChild(dropdownContentElement);
            dropdownCurrentRegionElement.appendChild(dropdownCurrentRegionNameElement);
            dropdownCurrentRegionElement.appendChild(dropdownArrowElement);

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
