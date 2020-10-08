/*global location */
sap.ui.define([
	"namnd/com/vn/ZAPP_NAMND_DEMO/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"namnd/com/vn/ZAPP_NAMND_DEMO/model/formatter",
	"sap/m/MessageBox"
], function(BaseController, JSONModel, formatter, MessageBox) {
	"use strict";
	return BaseController.extend("namnd.com.vn.ZAPP_NAMND_DEMO.controller.Home", {
		formatter: formatter,
		onInit: function() {

		},
		onCreate: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("create");
		},
		onEdit: function(oEvent) {
			this._getDialog().open();
			var id = oEvent.getSource().data("empid");
			var sUrl = "/sap/opu/odata/sap/ZODATA_NAMND_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(sUrl, {
				json: true,
				loadMetadataAsync: true
			});
			oModel.read("/EmployeeSet(EmpId='" + id + "')", {
				success: function(oData, oResponse) {
					sap.ui.getCore().byId("frg_id").setValue(oData.EmpId);
					sap.ui.getCore().byId("frg_name").setValue(oData.Name);
					sap.ui.getCore().byId("frag_address").setValue(oData.Address);
					sap.ui.getCore().byId("frag_phone").setValue(oData.Phone);
				},
				error: function(oError) {
					MessageBox.show("Error");
				}
			});
		},
		_getDialog: function() {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("namnd.com.vn.ZAPP_NAMND_DEMO.view.Edit", this);
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},
		onFrgSave: function() {
			var that = this;
			var sUrl = "/sap/opu/odata/sap/ZODATA_NAMND_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(sUrl, {
				json: true,
				loadMetadataAsync: true
			});
			var oEntry = {};

			var id = sap.ui.getCore().byId("frg_id").getValue();
			var name = sap.ui.getCore().byId("frg_name").getValue();
			var address = sap.ui.getCore().byId("frag_address").getValue();
			var phone = sap.ui.getCore().byId("frag_phone").getValue();

			oEntry.EmpId = id;
			oEntry.Name = name;
			oEntry.Address = address;
			oEntry.Phone = phone;

			oModel.update("/EmployeeSet(EmpId='" + id + "')", oEntry, {
				success: function(oData, oResponse) {
					var message = "Update successfully";
					MessageBox.show(message);
					that.onFrgCancel();
					that.onRefreshTable();
				},
				error: function(oError) {
					MessageBox.show("Update Error");
				}
			});
		},
		onFrgCancel: function() {
			sap.ui.getCore().byId("frg_id").setValue("");
			sap.ui.getCore().byId("frg_name").setValue("");
			sap.ui.getCore().byId("frag_address").setValue("");
			sap.ui.getCore().byId("frag_phone").setValue("");
			this._getDialog().close();
		},
		onRefreshTable: function() {
			this.getView().byId("tblEmployee").getModel().refresh(true);
			this.getView().byId("tblEmployee2").getModel().refresh(true);
			// sap.ui.getCore().byId("tblEmployee").getModel().refresh(true);
		},
		onDelete: function(oEvent) {
			var that = this;
			var id = oEvent.getSource().data("empid");
			MessageBox.confirm("Are you sure want to delete item EmpId = " + id + " ?", {
				actions: [MessageBox.Action.OK,
					MessageBox.Action.CANCEL
				],
				onClose: function(sButton) {
					if (sButton === MessageBox.Action.OK) {
						that.onActionDelete(id);
					}
				}
			});
		},
		onActionDelete: function(id) {
			var that = this;
			var sUrl = "/sap/opu/odata/sap/ZODATA_NAMND_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(sUrl, {
				json: true,
				loadMetadataAsync: true
			});

			oModel.remove("/EmployeeSet(EmpId='" + id + "')", {
				success: function(oData, oResponse) {
					var message = "Delete successfully";
					MessageBox.show(message);
					that.onRefreshTable();
				},
				error: function(oError) {
					MessageBox.show("Delete Error");
				}
			});
		}
	});
});