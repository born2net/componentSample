DigitalSignage: Sample Component
===

open source digital signage HTML SDK
---

The component enables anyone to develop a custom Digital Signage component that consists of both a SignagePlayer HTML / CSS / Javascript module as well as 
StudioPro properties page HTML / CSS / Javascript module, for the free SignagePlayer from http://digitalsignage.com.

Player component:
----
- runtime Javascript component which resides and plays inside the SignagePlayer and is assigned into a screen division or scene
- the javascript component has full access to all SignagePlayer resources including swf, videos, images, svgs and data
- local caching of data and resources to support offline playback of the component
- choose between embedded HTML wrapper, native browser wrapper or Node Web kit wrapper (node only for Windows OS)
- full support for all Javascript libraries such as require.js, backbone, angular etc
 
Studio component:
----
- runtime Javascript component which resides and loads inside the free StudioPro and can be assigned into a screen division or scene
- the javascript component has full access to all StudioPro resources including swf, videos, images, svgs and data
- create a fully customizable properties page for your player component, powered by HTML / CSS / Javascript
- full support for all Javascript libraries such as require.js, backbone, angular etc

HTML Wrapper
----
Your custom Player component that runs inside the SignagePlayer can execute under 3 different modes, depending on the operating system and your settings.

1. Windows: choose between the SignagePlayer embedded HTML or Node-Web-Kit (node.js + Google Chromium)
2. Android: Use only the native default built in HTML browser on the underline Android device
3. Mac: HTML mode only

<pre>
HTML wrapper comparison
   
   HTML Pros:
      1. built into SignagePlayer, no needed for external executable
      2. support for all screen layering (masks) 
      3. runs on Windows and Mac
   HTML Cons:
      1. does not use the latest HTML5 rendering engine
      2. slower performance 
      3. operates under standard HTML security box
      
   Node web kit Pros:
      1. super fast HTML rendering powered by latest Google Chromium release
      2. full access to the host file system and devices (no security limitations)
      3. most efficient memory management since runs as an external process
      4. fully integrated into the SignagePlayer for windows (nw.exe)
         runs with no toolbar (clean window) 
   HTML Cons:
      1. does not support layering (always on top)
      2. only runs on SignagePlayer for windows
      3. runs as an external application

   Native browser Pros:
      1. runs as fast (or as slow) as the default Android default browser
      2. nothing special to install or configure
   Native browser Cons:
      1. runs as fast (or as slow) as the default Android default browser
      2. does not support layering
      3. operates under standard HTML security box            

</pre>

- Studio component: runtime Javascript module which lives inside the StudioPro as a properties and settings page

Configuration
-----
your_app_name.json includes the configuration used to setup your Studio and Player component.  

```
{
  "name": "your_app_name",
  "version": "1.0.457",
  "url": "http://signage.me/components/your_app_name/your_app_name.zip",
  "property": "page.html",
  "desktopUseNode": false,
  "debug": false
}
```
- name: the name of your HTML / CSS / Javascript component

- version: used to force the SignagePlayer and StudioPro to re-download the latest revision of your developed component.

- url: points to a web url that hosts your zip file. The zip file consists of everything your component needs, 
including Studio and Player components.
 
- property: the name of the file to load in StudioPro to display the properties page for the component

- desktopUseNode: true / false. When set to true, your component will run inside the wrapper of Node Web Kit in Windows. 
if set to false, the component will run in the embedded HTML wrapper in Windows and Mac and use the native browser in Android. 

- debug: when set to desktopUseNode: true, the debug mode allows for remote debugging of the Player component in windows
 using node web kit.

Tutorials
-----
**For a full demonstration on how to build, deploy and use the open source SignagePlayer and StudioPro components be sure to view the following video tutorials:**

- [HTML5 component development Intro](http://www.digitalsignage.com/_html/video_tutorials.html?videoNumber=htmlSdkIntro)
- [HTML5 component development API](http://www.digitalsignage.com/_html/video_tutorials.html?videoNumber=htmlSdkAPI)
- [HTML5 component development Debug/setup](http://www.digitalsignage.com/_html/video_tutorials.html?videoNumber=htmlSdkDebug)








