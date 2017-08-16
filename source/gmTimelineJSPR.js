if (typeof(SiebelAppFacade.gmTimelineJSPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.gmTimelineJSPR");
 define("siebel/custom/gmTimelineJSPR", ["siebel/phyrenderer","siebel/custom/timelineJS3/js/timeline"],
  function () {
   SiebelAppFacade.gmTimelineJSPR = (function () {
    var gUtils     = SiebelJS.Dependency("SiebelApp.Utils");
    var gConstants = SiebelJS.Dependency("SiebelApp.Constants");

    function gmTimelineJSPR(pm) {
      var cjsonTLJSon  = {"scale": "human", "events": []};
      var gConfig      = {Accending:true, LastDirection:"None", TLEventOff:false, TLOnChange:false, TLNavShowNext:false, TLNavShowPre:false};

      this.Config = function() {
        return gConfig;
      };
      var gContainer = null;
      this.SetContainer = function(aValue) {
        gContainer = aValue;
      };
      this.GetContainer = function() {
        return gContainer;
      };
      var gTimeLineId;
      this.SetTimeLineId = function(aValue) {
        gTimeLineId = aValue;
      };
      this.GetTimeLineId = function() {
        return gTimeLineId;
      };
      var gObjTimeLine = null;
      this.SetObjTimeLine = function(aValue) {
        gObjTimeLine = aValue;
      };
      this.GetObjTimeLine = function() {
        return gObjTimeLine;
      };
      SiebelAppFacade.gmTimelineJSPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(gmTimelineJSPR, SiebelAppFacade.PhysicalRenderer);

      gmTimelineJSPR.prototype.Init = function () {
      SiebelAppFacade.gmTimelineJSPR.superclass.Init.apply(this, arguments);
    }

    gmTimelineJSPR.prototype.ClearData = function() {
      var lTemp = this.GetObjTimeLine();
      if (lTemp === null) {
        this.GetContainer().empty();
      } else {
        this.Config().TLEventOff=true;
        this.GetObjTimeLine()._loadLanguage(this.cjsonTLJSon);
        this.GetObjTimeLine().updateDisplay();
        this.Config().TLEventOff=false;
      }
    }

    gmTimelineJSPR.prototype.ShowUI = function () {

      SiebelAppFacade.gmTimelineJSPR.superclass.ShowUI.apply(this, arguments);

      var lPM       = this.GetPM();
      var lTemp     = $("#" + lPM.Get("GetPlaceholder") + "d").empty();

      this.SetTimeLineId(lPM.Get("GetPlaceholder") + "_vc_timeline_div");

      lTemp.html('<div id="' + this.GetTimeLineId() + '" style="width: 100%; height: 500px;"></div>');

      this.SetObjTimeLine(null);
      this.SetContainer($("#" + this.GetTimeLineId()));
      this.ClearData();

      this.SetObjTimeLine(new TL.Timeline(this.GetTimeLineId(), this.cjsonTLJSon, {timenav_position:lPM.Get("TLNavPosition"),start_at_end:this.Config().Accending}));
    }

    gmTimelineJSPR.prototype.BindData = function (bRefresh) {

      SiebelAppFacade.gmTimelineJSPR.superclass.BindData.apply(this, arguments);

      var lPM           = this.GetPM();
      var lQueryMode    = lPM.Get("IsInQueryMode");
      var lRecordSet    = lPM.Get("GetRecordSet");
      var lRecordRawSet = lPM.Get('GetRawRecordSet');
      var lRecSel       = lPM.Get("GetSelection");
      var lLstSize      = lPM.Get("GetRowListRowCount");

      var lRecSetLen    = lRecordSet.length;
      var jsonTLJSon    = {"scale": "human", "events": []};
      var jsonTLEvent   = {};
      var lStartDT      = null;
      var lEndDT        = null;

      // if Refresh then clear.
      if(bRefresh) { this.ClearData(); }

      // If not records clear the container || in Query Mode.
      if (lRecSetLen === 0 || lQueryMode) {
        this.ClearData();
        return;
      }

      // Set height based on Row List Count.
      this.GetContainer().css("height",(lLstSize*60) + "px");

      // Loop Records and Load
      for (var i = 0; i < lRecSetLen; i++) {
        jsonTLEvent   = {"start_date":{"year":"","month":"","day":"","hour":"","minute":"","second":"","millisecond":""},"end_date":{"year":"","month":"","day":"","hour":"","minute":"","second":"","millisecond":""},"group":"","text":{"headline":"","text":""},"media":{"caption":"","credit":"","url":"","thumbnail":""},"autolink":true,"unique_id":""};
        //jsonTLEvent   = {"start_date":{"year":"","month":"","day":"","hour":"","minute":"","second":"","millisecond":""},"end_date":{"year":"","month":"","day":"","hour":"","minute":"","second":"","millisecond":""},"group":"","background":{"url":"/images/custom/vodacom/vc_background_01.jpg"},"text":{"headline":"","text":""},"media":{"caption":"","credit":"","url":"","thumbnail":""},"autolink":true,"unique_id":""};

        // set Start Date of event
        lStartDT = new Date(lRecordRawSet[i][lPM.Get("TLFieldStartDT")]);
        jsonTLEvent.start_date.year         = lStartDT.getFullYear();
        jsonTLEvent.start_date.month        = lStartDT.getMonth();
        jsonTLEvent.start_date.day          = lStartDT.getDay();
        jsonTLEvent.start_date.hour         = lStartDT.getHours();
        jsonTLEvent.start_date.minute       = lStartDT.getMinutes();
        jsonTLEvent.start_date.second       = lStartDT.getSeconds();
        jsonTLEvent.start_date.millisecond  = lStartDT.getMilliseconds();

        // set End Date of event
        if (lRecordRawSet[i][lPM.Get("TLFieldEndDT")] !== "") {
          lEndDT = new Date(lRecordRawSet[i]["Planned Completion"]);
        } else {
          if (lRecordRawSet[i][lPM.Get("TLFieldDuarionMin")] && lRecordRawSet[i][lPM.Get("TLFieldDuarionMin")] !== "") {
            lEndDT = new Date(lStartDT.getTime() + (parseInt(lRecordRawSet[i][lPM.Get("TLFieldDuarionMin")])*60000));
          } else {
            lEndDT = lStartDT;
          }
        }
        jsonTLEvent.end_date.year        = lEndDT.getFullYear();
        jsonTLEvent.end_date.month       = lEndDT.getMonth();
        jsonTLEvent.end_date.day         = lEndDT.getDay();
        jsonTLEvent.end_date.hour        = lEndDT.getHours();
        jsonTLEvent.end_date.minute      = lEndDT.getMinutes();
        jsonTLEvent.end_date.second      = lEndDT.getSeconds();
        jsonTLEvent.end_date.millisecond = lEndDT.getMilliseconds();

        // set text of event
        jsonTLEvent.text.headline    = lRecordRawSet[i][lPM.Get("TLFieldDescription")];
        jsonTLEvent.media.credit     = lRecordRawSet[i][lPM.Get("TLFieldType")];
        jsonTLEvent.text.text        = "<b>Type: </b>"     + lRecordRawSet[i][lPM.Get("TLFieldType")]      + "<br>" +
                                       "<b>Refrence: </b>" + lRecordRawSet[i][lPM.Get("TLFieldReference")] + "<br>";
                                       "<b>Status: </b>"   + lRecordRawSet[i][lPM.Get("TLFieldStatus")]    + "<br>";
                                      
        // Action: set media of event
        if (lPM.Get("TLType")==="Action") {

          jsonTLEvent.text.text     +=     "<b>Owner: </b>"    + lRecordRawSet[i][lPM.Get("TLFieldActionOwner")]  + "<br>";

          switch (lRecordRawSet[i][lPM.Get("TLFieldType")]) {
            case "Email - Inbound":
              jsonTLEvent.group            = "Inbound";
              jsonTLEvent.media.thumbnail  = "IMAGES/\icon_gemail_enabled.gif";
              jsonTLEvent.media.url        = "<blockquote style=\"white-space: pre-line;\" class='vc_tl_emailbody'>" + lRecordRawSet[i][lPM.Get("TLFieldComment")].replace(/(\s\n\r)/g, " ")  + "</blockquote>";
              jsonTLEvent.media.caption    = "Email Receaved.";
              jsonTLEvent.text.text       += "<b>Email Type:</b> Inbound<br>" +
                                             "<b>Email Sender:</b> "    + lRecordRawSet[i][lPM.Get("TLFieldActionEmailFrom")] + "<br>" +
                                             "<b>Email Recipient:</b> " + lRecordRawSet[i][lPM.Get("TLFieldActionEmailRecip")];
            break;
            case "Email - Outbound":
            case "Communication With Customer":
              jsonTLEvent.group            = "Outbound";
              jsonTLEvent.media.thumbnail  = "IMAGES/\icon_email_enabled.gif";
              jsonTLEvent.media.caption    = "Email Sent.";
              jsonTLEvent.text.text       += "<b>Email Type:</b> Outbound<br>" +
                                             "<b>Email Sent From:</b> " + lRecordRawSet[i][lPM.Get("TLFieldActionEmailTo")];

              if (lRecordRawSet[i][lPM.Get("TLFieldActionEmailBody")] != "") {
                var lTmpId = "#" + this.GetTimeLineId() + " iframe";
                jsonTLEvent.media.url      = "<iframe frameborder='0' //onload=\"vc_tl_iFrameLoad(this,$('" + lTmpId + "'));\" class=\"vc_tl_emailbody\" src=\"data:text/html;charset=utf-8," + encodeURIComponent(lRecordRawSet[i][lPM.Get("TLFieldActionEmailBody")]) + "\"></iframe>";
              } else {
                jsonTLEvent.media.url      = "<blockquote style=\"white-space: pre-line;\" class=\"vc_tl_emailbody\">" + lRecordRawSet[i][lPM.Get("TLFieldComment")].replace(/(\s\n\r)/g, " ") + "</blockquote>";
              }
            break;
            default:
              jsonTLEvent.group            = "System";
              jsonTLEvent.text.text       += lRecordRawSet[i][lPM.Get("TLFieldComment")];
              jsonTLEvent.media.caption    = lRecordRawSet[i][lPM.Get("TLFieldStatus")];
          }
        }
        // Alert: set media of event
        if (lPM.Get("TLType")==="Alert") {
          jsonTLEvent.group            = lRecordRawSet[i][lPM.Get("TLFieldType")];
          jsonTLEvent.text.text       += lRecordRawSet[i][lPM.Get("TLFieldComment")];
        }

        jsonTLEvent.unique_id  = lRecordRawSet[i]["Id"] + ";" + i;
        // add event
        jsonTLJSon.events.push(jsonTLEvent);
      }

      this.Config().TLEventOff=true;
      this.GetObjTimeLine().options.start_at_end = this.Config().LastDirection==="Back"?true:(this.Config().LastDirection==="Forward"?false:this.Config().Accending);
      this.GetObjTimeLine()._loadLanguage(jsonTLJSon);
      this.GetObjTimeLine().updateDisplay();
      this.Config().TLEventOff=false;
      this.Config().LastDirection  = "None";

      // position on record, delayed call
      self = this;
      setTimeout(function() {
        var tlObj = self.GetObjTimeLine();

        if (tlObj.options.start_at_end) { 
          tlObj.goToEnd();
          tlObj._timenav.goToId(tlObj.current_id);
			    tlObj._storyslider.goToId(tlObj.current_id, false, true);
          tlObj.fire("change", {unique_id: tlObj.current_id}, tlObj);
        } else {
          tlObj.goToStart();
          tlObj._timenav.goToId(tlObj.current_id);
			    tlObj._storyslider.goToId(tlObj.current_id, false, true);
          tlObj.fire("change", {unique_id: tlObj.current_id}, tlObj);
        }
        self.TLUIUpdate();
      }, 1000);
    }

    // Set blockquote, iframe size, delay settings so page can load
    gmTimelineJSPR.prototype.TLUIUpdate = function () {
      self = this;
      setTimeout(function() {
        var objTL    = self.GetObjTimeLine();  
        var lLstSize = self.GetPM().Get("GetRowListRowCount");

        //self.GetContainer().find("blockquote").css("height",(lLstSize*35) + "px").css("overflow","scroll");
        //self.GetContainer().find("iframe"    ).css("height",(lLstSize*35) + "px").css("overflow","scroll");

        if (self.Config().TLNavShowNext===true) {
          objTL._storyslider.showNav(objTL._storyslider._nav.next, true);
          objTL._storyslider._nav.next._update({ title: "Next Set", description: "",date: "" });
        }

        if (self.Config().TLNavShowPre===true) {
          objTL._storyslider.showNav(objTL._storyslider._nav.previous, true);
          objTL._storyslider._nav.previous._update({ title: "Previous Set", description: "",date: "" });
        }
      }, 1000);
     }

    gmTimelineJSPR.prototype.BindEvents = function () {

      SiebelAppFacade.gmTimelineJSPR.superclass.BindEvents.apply(this, arguments);

      // on TimeLine Change event
      this.GetObjTimeLine().on("change", function(data) {
        if (this.Config().TLEventOff===true) return !0;

        var objTL         = this.GetObjTimeLine();               
        var lIndex        = objTL._storyslider._findSlideIndex(objTL.current_id); // Get Slide Index
        var lIsLSlide     = lIndex === objTL.config.events.length-1;              // Last  Slide
        var lIsFSlide     = lIndex === 0;                                         // First Slide
        var lOnStart      = Number(this.GetPM().ExecuteMethod("GetWSStartRowNum")) === 1;
        var lOnEnd        = Number(this.GetPM().Get("GetWSEndRowNum")) === Number(this.GetPM().Get("GetNumRows")) && this.GetPM().Get("IsNumRowsKnown");

        // OnRowSelect
        if(data.unique_id.indexOf(";") > 0) {
          this.OnRowSelect(Number(data.unique_id.split(";")[1]));
        }

        // if not last slid then enable button.
        this.Config().TLNavShowNext = lIsLSlide && ((!lOnStart && this.Config().Accending) || (!lOnEnd && !this.Config().Accending));

        // if not first slide then enable button.
        this.Config().TLNavShowPre = lIsFSlide && ((!lOnStart && !this.Config().Accending) || (!lOnEnd && this.Config().Accending));

        this.TLUIUpdate();
      }, this);

      // on TimeLine Navigate Next event
      this.GetObjTimeLine().on("nav_next", function(data) {
        if (this.Config().TLEventOff===true) return !0;

        var objTL         = this.GetObjTimeLine();               
        var lIndex        = objTL._storyslider._findSlideIndex(objTL.current_id); // Get Slide Index
        var lIsLSlide     = lIndex === objTL.config.events.length-1;              // Last  Slide

        // if not last slid then enable button.
        if (lIsLSlide) {
          if (objTL._storyslider._nav.next.data.title === "Next Set") {
            this.Config().LastDirection = "Forward";
            if (this.Config().Accending===true) {
              this.OnPagination("first_pager");
            } else {
              this.OnPagination("last_pager");
            }
          }
        }
      },this);

      // on TimeLine Previous Next event
      this.GetObjTimeLine().on("nav_previous", function(data) {
        if (this.Config().TLEventOff===true) return !0;

        var objTL         = this.GetObjTimeLine();               
        var lIndex        = objTL._storyslider._findSlideIndex(objTL.current_id); // Get Slide Index
        var lIsFSlide     = lIndex === 0;                                         // First Slide

        // if not first slide then enable button.
        if (lIsFSlide) {
          if (objTL._storyslider._nav.previous.data.title === "Previous Set") {
            this.Config().LastDirection = "Back";
            if (this.Config().Accending===true) {
              this.OnPagination("last_pager");
            } else {
              this.OnPagination("first_pager");
            }
          }
        }
      },this);
    }

    gmTimelineJSPR.prototype.OnPagination = function (title) {
        var lPM = this.GetPM();
        var direction   = "";
        switch (title) {
            case "next_pager":  // Next Record
                direction = gConstants.get("PAG_NEXT_RECORD");
            break;
            case "last_pager":  // Next Set of Record
                direction = gConstants.get("PAG_NEXT_SET");
            break;
            case "prev_pager":  // Prev. Record
                direction = gConstants.get("PAG_PREV_RECORD");
            break;
            case "first_pager": // Prev. Set of Record
                direction = gConstants.get("PAG_PREV_SET");
            break;
            case "scroll_up":
                direction = gConstants.get("PAG_SCROLL_UP");
            break;
            case "scroll_down":
                direction = gConstants.get("PAG_SCROLL_DN");
            break;
        }

        if (!lPM.OnControlEvent(gConstants.get("PHYEVENT_VSCROLL_LIST"), direction)) {
            // Error Handling ?
        }
    };

    gmTimelineJSPR.prototype.OnRowSelect = function(aRecSel) {
      var lPM = this.GetPM();
      var lReturn = false;

      if (lPM.Get("IsActive") || lPM.OnControlEvent(gConstants.get("PHYEVENT_APPLET_FOCUS"))) {

        if (Number(aRecSel) === Number(lPM.Get("GetSelection"))) {
            return true
        }
        if (!lPM.OnControlEvent(gConstants.get("PHYEVENT_SELECT_ROW"), aRecSel, false, false )) {
            SiebelApp.S_App.uiStatus.Free();
            return false
        }
        SiebelApp.S_App.uiStatus.Free();
        return true;
      } else {
        return false;
      }
    };

    gmTimelineJSPR.prototype.EndLife = function () {
      this.ClearData();
      this.SetContainer(null);
      this.SetObjTimeLine(null);
      SiebelAppFacade.gmTimelineJSPR.superclass.EndLife.apply(this, arguments);
    }

    return gmTimelineJSPR;
   }()
  );
  return "SiebelAppFacade.gmTimelineJSPR";
 })
};

function vc_tl_iFrameLoad(lObj) {
  $(lObj).height($(this).outerHeight()*2).css("max-height","none");
  $(lObj).parent().css("max-height","none");
  $(lObj).parent().css("height","100%");
}