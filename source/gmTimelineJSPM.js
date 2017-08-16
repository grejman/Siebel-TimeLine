if (typeof(SiebelAppFacade.gmTimelineJSPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.gmTimelineJSPM");
 define("siebel/custom/gmTimelineJSPM", ["siebel/listpmodel"],
  function () {
    SiebelAppFacade.gmTimelineJSPM = (function () {

      var consts = SiebelJS.Dependency("SiebelApp.Constants");
      var utils = SiebelJS.Dependency("SiebelApp.Utils");

      function gmTimelineJSPM(pm) {
        SiebelAppFacade.gmTimelineJSPM.superclass.constructor.apply(this, arguments);
      }

      SiebelJS.Extend(gmTimelineJSPM, SiebelAppFacade.ListPresentationModel);

      gmTimelineJSPM.prototype.Init = function () {
        SiebelAppFacade.gmTimelineJSPM.superclass.Init.apply(this, arguments);
      }

      gmTimelineJSPM.prototype.Setup = function (propSet) {
        SiebelAppFacade.gmTimelineJSPM.superclass.Setup.apply(this, arguments);
        processCustomUserProperty.call(this,propSet,"TLType"              ,"");
        processCustomUserProperty.call(this,propSet,"TLFieldReference"    ,"");
        processCustomUserProperty.call(this,propSet,"TLFieldStartDT"      ,"");
        processCustomUserProperty.call(this,propSet,"TLFieldEndDT"        ,"");
        processCustomUserProperty.call(this,propSet,"TLFieldDuarionMin"   ,"");  // Used fi End Date is not knowen
        processCustomUserProperty.call(this,propSet,"TLFieldStatus"       ,"");
        processCustomUserProperty.call(this,propSet,"TLFieldType"         ,"");
        processCustomUserProperty.call(this,propSet,"TLFieldComment"      ,"Comment");
        processCustomUserProperty.call(this,propSet,"TLFieldDescription"  ,"Description");

        processCustomUserProperty.call(this,propSet,"TLFieldActionOwner"    ,"");
        processCustomUserProperty.call(this,propSet,"TLFieldActionEmailFrom","");
        processCustomUserProperty.call(this,propSet,"TLFieldActionEmailTo"  ,"");
        processCustomUserProperty.call(this,propSet,"TLFieldActionEmailBody","");
        processCustomUserProperty.call(this,propSet,"TLFieldActionEmailRecip","");

        processCustomUserProperty.call(this,propSet,"TLNavPosition"       ,"top");
      }

      function processCustomUserProperty(propSet,propertyName, aDefaultVal) {
        var userProps = propSet.GetChildByType(consts.get("SWE_APPLET_PM_PS"));
        if (userProps) {
          var propVal = userProps.GetProperty(propertyName);
          if (!utils.IsEmpty(propVal)) {
            this.AddProperty(propertyName, propVal);
          } else {
            this.AddProperty(propertyName, aDefaultVal);
          }
        }
      }
      return gmTimelineJSPM;
    }()
  );
  return "SiebelAppFacade.gmTimelineJSPM";
 })
}
