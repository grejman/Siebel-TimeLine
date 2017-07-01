# Siebel-TimeLine

Siebel Open-UI implementation of the TimeLineJS3 Control from NUKnightLab.

https://github.com/NUKnightLab/TimelineJS3

# Implementation

* To implement the Physical Renderer the following will need to done.
* Load the Physical Renderer "gmTimeLineJSPM.js" to the "..\PUBLIC\scripts\Siebel\custom" folder.
* Load the Style Sheet "gmTimeLineJS3.css to the "..\PUBLIC\files\custom" folder.
* On your Activity Applet to be enabled ensure the following field are added as Control.
  * Comment - 
  * Description
  * Duration Minutes
  * Email Sender Address
  * Email Recipient Address
  * Email To Line
  * Email Body
  * Type
  * Owner Full Name  (Full Name of the Contact)
  * Planned Completion  (Date Time)
  * Planned  (Date time)

* Add the Physical Renderer to the Applet under Manifest Administration.
* Add the Style Sheet to the Application under Manifest Administration.

# Contributions

Contributions are welcome.

# Example

![Example](/images/sample.png)
