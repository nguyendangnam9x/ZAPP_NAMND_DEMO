/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

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
		"namnd/com/vn/ZAPP_NAMND_DEMO/test/integration/NavigationJourneyPhone",
		"namnd/com/vn/ZAPP_NAMND_DEMO/test/integration/NotFoundJourneyPhone",
		"namnd/com/vn/ZAPP_NAMND_DEMO/test/integration/BusyJourneyPhone"
	], function () {
		QUnit.start();
	});
});