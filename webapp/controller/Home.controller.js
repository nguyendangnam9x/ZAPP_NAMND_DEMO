/*global location */
sap.ui.define([
		"namnd/com/vn/ZAPP_NAMND_DEMO/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"namnd/com/vn/ZAPP_NAMND_DEMO/model/formatter"
	], function (BaseController, JSONModel, formatter) {
		"use strict";
		return BaseController.extend("namnd.com.vn.ZAPP_NAMND_DEMO.controller.Home", {
			formatter: formatter,
			onInit : function () {
				
			}
		});
	}
);