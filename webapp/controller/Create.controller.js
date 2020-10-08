/*global location */
sap.ui.define([
	"namnd/com/vn/ZAPP_NAMND_DEMO/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"namnd/com/vn/ZAPP_NAMND_DEMO/model/formatter",
	"sap/m/MessageBox"
], function(BaseController, JSONModel, formatter, MessageBox) {
	"use strict";
	return BaseController.extend("namnd.com.vn.ZAPP_NAMND_DEMO.controller.Create", {
		formatter: formatter,
		onInit: function() {

		},
		onCancel: function() {
			var oComponent = this.getOwnerComponent();
			MessageBox.confirm("Are you want to cancel?", {
				styleClass: oComponent.getContentDensityClass(),
				onClose: function(oAction) {
					if (oAction === sap.m.MessageBox.Action.OK) {
						history.go(-1);
					}
				}
			});
		},
		onCreate: function() {
			var that = this;
			var sUrl = "/sap/opu/odata/sap/ZODATA_NAMND_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(sUrl, {
				json: true,
				loadMetadataAsync: true
			});
			var oEntry = {};

			var name = this.getView().byId("name").getValue();
			var address = this.getView().byId("address").getValue();
			var phone = this.getView().byId("phone").getValue();
			
			oEntry.Name = name;
			oEntry.Address = address;
			oEntry.Phone = phone;

			oModel.create("/EmployeeSet", oEntry, {
				success: function(oData, oResponse) {
					var message = "Created successfully";
					MessageBox.show(message, {
						icon: MessageBox.Icon.SUCCESS,
						title: "Title success",
						actions: [MessageBox.Action.OK]
					});
					that.onClearVal();
				},
				error: function(oError) {
					MessageBox.show("Error");
				}
			});
		},
		onClearVal : function() {
			this.getView().byId("name").setValue("");
			this.getView().byId("address").setValue("");
			this.getView().byId("phone").setValue("");
		}
	});
});