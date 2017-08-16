# Siebel-TimeLine

Siebel Open-UI implementation of the TimeLineJS3 Control from NUKnightLab.

https://github.com/NUKnightLab/TimelineJS3

# Siebel Vertion

  IP2015
  IP2016

# Implementation

To implement the Physical Renderer the following will need to be done:

* Load the Physical Renderer "gmTimelineJSPR.js" to the "..\PUBLIC\scripts\Siebel\custom" folder.
* Load the Presentation Renderer "gmTimelineJSPM.js" to the "..\PUBLIC\scripts\Siebel\custom" folder.
* Load the Style Sheet "gmTimeLineJS3.css to the "..\PUBLIC\files\custom" folder.
* Load the timelineJS3 folder and files to the "..\PUBLIC\scripts\Siebel\custom" folder.
  * Note: for the latest version of TimeLineJS3 please refer to the NUKnightLab TimelineJS3 Site.
* On your Activity Applet to be enabled ensure the following field are added as Control.
  * Comment
  * Description
  * Duration Minutes
  * Email Sender Address
  * Email Recipient Address
  * Email To Line
  * Email Body
  * Type
  * Owner Full Name (Full Name of the Contact)
  * Planned Completion (Date Time)
  * Planned (Date time)
* Add the following Applet User Properties to the Applet and set the Value to the field name that contains the data
  * TLType
  * TLFieldReference
  * TLFieldStartDT
  * TLFieldEndDT
  * TLFieldDuarionMin
  * TLFieldStatus
  * TLFieldType
  * TLFieldComment
  * TLFieldDescription
  * TLFieldActionOwner
  * TLFieldActionEmailFrom
  * TLFieldActionEmailTo
  * TLFieldActionEmailBody
  * TLFieldActionEmailRecip
* Add the above User Properties to the "ClientPMUserProp" list.
  (ie.) ClientPMUserProp = TLType,TLFieldStartDT,TLFieldEndDT,TLFieldDuarionMin,TLFieldDescription,TLFieldType,TLFieldActionOwner,TLFieldComment,TLFieldActionEmailFrom,TLFieldActionEmailTo,TLFieldActionEmailBody,TLFieldStatus,TLFieldReference,TLFieldActionEmailRecip
* Add the Physical Renderer to the Applet under Manifest Administration.
* Add the Presentation Renderer to the Applet under Manifest Administration.
* Add the Style Sheet to the Application under Manifest Administration.

# Contributions

Contributions are welcome.

![Example](/images/sample.png)