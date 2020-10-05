/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 EmployeeSet in the list

sap.ui.require([
	"sap/ui/test/Opa5",
	"namnd/com/vn/ZAPP_NAMND_DEMO/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"namnd/com/vn/ZAPP_NAMND_DEMO/test/integration/pages/App",
	"namnd/com/vn/ZAPP_NAMND_DEMO/test/integration/pages/Browser",
	"namnd/com/vn/ZAPP_NAMND_DEMO/test/integration/pages/Master",
	"namnd/com/vn/ZAPP_NAMND_DEMO/test/integration/pages/Detail",
	"namnd/com/vn/ZAPP_NAMND_DEMO/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "namnd.com.vn.ZAPP_NAMND_DEMO.view."
	});

	sap.ui.require([
		"namnd/com/vn/ZAPP_NAMND_DEMO/test/integration/MasterJourney",
		"namnd/com/vn/ZAPP_NAMND_DEMO/test/integration/NavigationJourney",
		"namnd/com/vn/ZAPP_NAMND_DEMO/test/integration/NotFoundJourney",
		"namnd/com/vn/ZAPP_NAMND_DEMO/test/integration/BusyJourney",
		"namnd/com/vn/ZAPP_NAMND_DEMO/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});