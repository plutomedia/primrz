pliny.namespace({
  name: "Flags",
  description: `Various flags used for feature detecting and configuring the system.

When including Primrose as a \`script\` tag, the Flags namespace is imported directly onto the window object and is available without qualification.`
});
pliny.value({
  parent: "Flags",
  name: "isCardboard",
  type: "Boolean",
  description: "Flag indicating the current system is a \"mobile\" device, but is not a Samsung Gear VR (or Google Daydream)."
});
pliny.value({
  parent: "Flags",
  name: "isMobile",
  type: "Boolean",
  description: "Flag indicating the current system is a recognized \"mobile\" device, usually possessing a motion sensor."
});
pliny.value({
  parent: "Flags",
  name: "isGearVR",
  type: "Boolean",
  description: "Flag indicating the application is running on the Samsung Gear VR in the Samsung Internet app."
});
pliny.value({
  parent: "Flags",
  name: "isChrome",
  type: "Boolean",
  description: "Flag indicating the browser is currently calling itself Chrome or Chromium."
});
pliny.value({
  parent: "Flags",
  name: "isOpera",
  type: "Boolean",
  description: "Flag indicating the browser is currently calling itself Opera."
});
pliny.value({
  parent: "Flags",
  name: "isFirefox",
  type: "Boolean",
  description: "Flag indicating the browser is currently calling itself Firefox."
});
pliny.value({
  parent: "Flags",
  name: "isIE",
  type: "Boolean",
  description: "Flag indicating the browser is currently calling itself Internet Explorer. Once the bane of every web developer's existence, it has since passed the torch on to Safari in all of its many useless incarnations."
});
pliny.value({
  parent: "Flags",
  name: "isHomeScreen",
  type: "Boolean",
  description: "Flag indicating the script is currently running in an IFRAME or not."
});
pliny.value({
  parent: "Flags",
  name: "isiOS",
  type: "Boolean",
  description: "Flag indicating the current system is a device running the Apple iOS operating system: iPad, iPod Touch, iPhone. Useful for invoking optional code paths necessary to deal with deficiencies in Apple's implementation of web standards."
});
pliny.function({
  parent: "Flags",
  name: "isLandscape",
  returns: "Boolean",
  description: "Indicates whether or not the phone has been flipped to landscape mode."
});
pliny.value({
  parent: "Flags",
  name: "isMacOS",
  type: "Boolean",
  description: "Flag indicating the current system is a computer running the Apple macOS operating system. Useful for changing keyboard shortcuts to support Apple's idiosyncratic, consensus-defying keyboard shortcuts."
});
pliny.value({
  parent: "Flags",
  name: "isSafari",
  type: "Boolean",
  description: "Flag indicating the browser is currently calling itself Safari. Safari is an overly opinionated browser that thinks users should be protected from themselves in such a way as to prevent users from gaining access to the latest in cutting-edge web technologies. Essentially, it was replaced Microsoft Internet Explorer as the Internet Explorer of the web."
});
pliny.value({
  parent: "Flags",
  name: "isWebKit",
  type: "Boolean",
  description: "Flag indicating the browser is one of Chrome, Safari, or Opera. WebKit browsers have certain issues in common that can be treated together, like a common basis for orientation events."
});
pliny.value({
  parent: "Flags",
  name: "isWindows",
  type: "Boolean",
  description: "Flag indicating the current system is a computer running one of the Microsoft Windows operating systems."
});
pliny.namespace({
  name: "Live API",
  description: "The Live API is a set of functions that serve as shorthand for common Three.js objects, with a caching system built in to deduplicate repeated creations of geometries and materials.\n\
\n\
When including Primrose as a `script` tag, the Live API is imported directly onto the window object and is available without qualification."
});
pliny.function({
  parent: "Live API",
  name: "axis",
  description: "Creates a set of reference axes, with X as red, Y as green, and Z as blue.",
  parameters: [{
    name: "length",
    type: "Number",
    description: "The length each axis should be in its own axis."
  }, {
    name: "width",
    type: "Number",
    description: "The size each axis should be in the other axes."
  }],
  returns: "THREE.Object3D",
  examples: [{
    name: "Basic usage",
    description: "To create a fixed point of reference in the scene, use the `axis()` function.:\n\
\n\
    grammar(\"JavaScript\");\n\
    var scene = new THREE.Scene()\n\
    // This set of axis bars will each be 1 meter long and 5cm wide.\n\
    // They'll be centered on each other, so the individual halves\n\
    // of the bars will only extend half a meter.\n\
    scene.add(axis(1, 0.05));\n\
\n\
The result should appear as:\n\
\n\
![screenshot](images/axis.png)"
  }]
});
pliny.function({
  parent: "Live API",
  name: "hub",
  description: "Calling `hub()` is a short-hand for creating a new `THREE.Object3D`. This is useful in live-coding examples to keep code terse and easy to write. It also polyfills in a method for being able to add the object to a `Primrose.BrowserEnvironment` using `appendChild()` and to add other elements to the hub using `appendChild()` such that they may be pickable in the scene.",
  returns: "THREE.Object3D",
  examples: [{
    name: "Basic usage",
    description: `
    grammar("JavaScript");
    //these two lines of code perform the same task.
    var base1 = new THREE.Object3D();
    var base2 = hub();`
  }]
});
pliny.function({
  parent: "Live API",
  name: "brick",
  description: "Creates a textured box. See [`box()`](#LiveAPI_box) and [`textured()`](#LiveAPI_textured) or [`colored()`](#LiveAPI_colored). The texture will be repeated across the box.",
  parameters: [{
    name: "txt",
    type: "Number or Image",
    description: "The texture to apply to the box."
  }, {
    name: "width",
    type: "Number",
    optional: true,
    description: "The size of the box in the X dimension.",
    default: 1
  }, {
    name: "height",
    type: "Number",
    optional: true,
    description: "The size of the box in the Y dimension.",
    default: 1
  }, {
    name: "length",
    type: "Number",
    optional: true,
    description: "The size of the box in the Z dimension.",
    default: 1
  }, {
    name: "options",
    type: "Object",
    optional: true,
    description: "A hashmap specifying other options to pass on to the material creation function. The material creation function is either [`colored()`](#LiveAPI_colored) or [`textured()`](#LiveAPI_textured), depending on the value of the `txt` parameter passed to this function."
  }],
  returns: "THREE.Mesh",
  examples: [{
    name: "Basic usage",
    description: "To create a textured brick with the `brick()` function.:\n\
\n\
    grammar(\"JavaScript\");\n\
    var mesh = brick(DECK, 1, 2, 3)\n\
      .addTo(scene)\n\
      .at(-2, 1, -5);\n\
\n\
The result should appear as:\n\
\n\
![screenshot](images/brick.jpg)"
  }]
});
pliny.function({
  parent: "Live API",
  name: "textured",
  description: "Combines a geometry and a texture description into a mesh. The texture description can be quite complex, as there are a lot of options. The following description makes using this function sound quite complex, but it's actually quite easy to use. It's just complex in its implementation to be able to accommodate ease of use.",
  returns: "THREE.Mesh",
  parameters: [{
    name: "geometry",
    type: "THREE.Geometry or THREE.Mesh",
    description: "The object to which to apply the texture. If the object provided is a THREE.Mesh, this replaces the material currently being used on the Mesh without creating a new Mesh."
  }, {
    name: "txt",
    type: "one of: [String, 6-item Array of String, Primrose.Controls.Surface, HTMLCanvasElement, HTMLVideoElement, HTMLImageElement, THREE.Texture]",
    description: "There are a lot of options for the types of things use can use for this parameter:\n\
\n\
* `String` - A texture will be loaded using the default texture loader with this value as the `src` attribute of the Image that is to be loaded.\n\
* `6-item Array of String` - Each item of the array will be loaded as a texture as in the case of a single String, but the results will be used to create a THREE.CubeTexture, rather than a THREE.Texture, thereby creating a cube-map.\n\
* `Primrose.Controls.Surface` - any subclass of the Surface class, including 2D button controls or text editors.\n\
* `HTMLCanvasElement`, `HTMLVideoElement`, or `HTMLImageElement` - HTML elements that represent image data in some way.\n\
* `THREE.Texture` - for convenience, any previously loaded texture may also be used as the texture parameter."
  }, {
    name: "options",
    type: "Live API.textured.optionsHash",
    optional: true,
    description: "Options to pass to the THREE.Texture constructor, or infrequently-used options to change the behavior of the setup. See [`Live API.textured.optionsHash`](#LiveAPI_textured_optionsHash) and [`Live API.material.optionsHash`](#LiveAPI_material_optionsHash) for more information."
  }],
  examples: [{
    name: "Basic usage",
    description: "You'll typically want to create textures out of images.\n\
\n\
    grammar(\"JavaScript\");\n\
    var moon = textured(circle(1, 45), \"moon.jpg\", {\n\
      unshaded: true,\n\
      useFog: false\n\
    });\n\
    \n\
    env.sky.add(moon); // assuming we have a `Primrose.BrowserEnvironment` named `env`\n\
    moon.latLng(-30, 30, 7);\n\
    moon.lookAt(env.scene.position);\n\
\n\
The result should appear as:\n\
\n\
![screenshot](images/moon.jpg)"
  }]
});
pliny.record({
  parent: "Live API.textured",
  name: "optionsHash",
  type: "Object",
  description: "Optional options to alter how the texture is applied to the geometry. This also includes options that are passed on to the [`material()`](#LiveAPI_material) function.",
  parameters: [{
    name: "progress",
    type: "Function",
    optional: true,
    description: "A callback function to use for tracking progress. The callback function should accept a standard [`ProgressEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent)."
  }, {
    name: "resolve",
    type: "Function",
    optional: true,
    description: "A callback function to use when a texture is successfully created. It's generally best to use this callback to add the mesh to the scene, rather than adding the mesh when `textured()` returns, as textures that need time to load will cause WebGL warnings and slow down the overall experience."
  }, {
    name: "reject",
    type: "Function",
    optional: true,
    description: "An error callback function to use when the texture could not be loaded."
  }, {
    name: "shadow",
    type: "Boolean",
    optional: true,
    description: "If true, this texture will receive shadows from other objects, and the mesh will cast shadows onto other objects."
  }, {
    name: "txtRepeatX",
    type: "Number",
    optional: true,
    default: 1,
    description: "The number of times to repeat the texture across the mesh in the X axis."
  }, {
    name: "txtRepeatY",
    type: "Number",
    optional: true,
    default: 1,
    description: "The number of times to repeat the texture across the mesh in the Y axis."
  }, {
    name: "anisotropy",
    type: "Number",
    optional: true,
    default: 1,
    description: "The degree to which to sharpen textures at large distances and sharp angles."
  }, {
    name: "scaleTexture",
    type: "Number",
    optional: true,
    description: "The degree to which to resize a texture on both the X and Y  axis, if separate `scaleTextureWidth` and `scaleTextureHeight` options are not provided."
  }, {
    name: "scaleTextureWidth",
    type: "Number",
    optional: true,
    description: "The degree to which to resize a texture on the X axis to fit on the model."
  }, {
    name: "scaleTextureHeight",
    type: "Number",
    optional: true,
    description: "The degree to which to resize a texture on the Y axis to fit on the model."
  }]
});
pliny.namespace({
  name: "Util",
  description: "A few different utility functions.\n\
\n\
When including Primrose as a `script` tag, the Util functions are imported directly onto the window object and is available without qualification."
});
pliny.class({
  parent: "Util",
    name: "Angle",
    description: "The Angle class smooths out the jump from 360 to 0 degrees. It\n\
keeps track of the previous state of angle values and keeps the change between\n\
angle values to a maximum magnitude of 180 degrees, plus or minus. This allows for\n\
smoother operation as rotating past 360 degrees will not reset to 0, but continue\n\
to 361 degrees and beyond, while rotating behind 0 degrees will not reset to 360\n\
but continue to -1 and below.\n\
\n\
When instantiating, choose a value that is as close as you can guess will be your\n\
initial sensor readings.\n\
\n\
This is particularly important for the 180 degrees, +- 10 degrees or so. If you\n\
expect values to run back and forth over 180 degrees, then initialAngleInDegrees\n\
should be set to 180. Otherwise, if your initial value is anything slightly larger\n\
than 180, the correction will rotate the angle into negative degrees, e.g.:\n\
* initialAngleInDegrees = 0\n\
* first reading = 185\n\
* updated degrees value = -175\n\
\n\
It also automatically performs degree-to-radian and radian-to-degree conversions.\n\
For more information, see [Radian - Wikipedia, the free encyclopedia](https://en.wikipedia.org/wiki/Radian).\n\
\n\
![Radians](https://upload.wikimedia.org/wikipedia/commons/4/4e/Circle_radians.gif)",
    parameters: [{
      name: "initialAngleInDegrees",
      type: "Number",
      description: "(Required) Specifies the initial context of the angle. Zero is not always the correct value."
    }],
    examples: [{
      name: "Basic usage",
      description: "To use the Angle class, create an instance of it with `new`, and modify the `degrees` property.\n\
\n\
## Code:\n\
\n\
  grammar(\"JavaScript\");\n\
  var a = new Angle(356);\n\
  a.degrees += 5;\n\
  console.log(a.degrees);\n\
\n\
## Results:\n\
> 361"
    }, {
      name: "Convert degrees to radians",
      description: "Create an instance of Angle, modify the `degrees` property, and read the `radians` property.\n\
\n\
## Code:\n\
\n\
  grammar(\"JavaScript\");\n\
  var a = new Angle(10);\n\
  a.degrees += 355;\n\
  console.log(a.radians);\n\
\n\
## Results:\n\
> 0.08726646259971647"
    }, {
      name: "Convert radians to degress",
      description: "Create an instance of Angle, modify the `radians` property, and read the `degrees` property.\n\
\n\
## Code:\n\
\n\
  grammar(\"JavaScript\");\n\
  var a = new Angle(0);\n\
  a.radians += Math.PI / 2;\n\
  console.log(a.degrees);\n\
\n\
## Results:\n\
> 90"
    }]
});
pliny.property({
      parent: "Util.Angle",
      name: "degrees",
      type: "Number",
      description: "Get/set the current value of the angle in degrees."
    });
pliny.property({
      parent: "Util.Angle",
      name: "radians",
      type: "Number",
      description: "Get/set the current value of the angle in radians."
    });
pliny.class({
  parent: "Util",
  name: "AsyncLockRequest",
  description: "Searches a set of properties from a list of potential browser-vendor-prefixed options for a set of related functions that can be used to make certain types of Full Screen and Orientation Locking requests.",
  parameters: [{
    name: "name ",
    type: "String",
    description: "A friendly name to use in error messages emitted by this locking object."
  }, {
    name: "elementOpts",
    type: "Array",
    description: "An array of potential element names to search the document object that indicate to which DOM element the lock has been acquired."
  }, {
    name: "changeEventOpts",
    type: "Array",
    description: "An array of potential event names for the callback when the lock is acquired."
  }, {
    name: "errorEventOpts",
    type: "Array",
    description: "An array of potential event names for the callback when the lock has failed to be acquired."
  }, {
    name: "requestMethodOpts",
    type: "Array",
    description: "An array of potential method names for initiating the lock request."
  }, {
    name: "exitMethodOpts",
    type: "Array",
    description: "An array of potential method names for canceling the lock."
  }]
});
pliny.property({
      parent: "Util.AsyncLockRequest",
      name: "available",
      type: "Boolean",
      description: "Returns true if the system actually supports the requested locking API."
    })
pliny.function({
  parent: "Util",
  name: "findProperty",
  description: "Searches an object for a property that might go by different names in different browsers.",
  parameters: [{
    name: "elem",
    type: "Object",
    description: "The object to search."
  }, {
    name: "arr",
    type: "Array",
    description: "An array of strings that lists the possible values for the property name."
  }],
  returns: "String",
  examples: [{
    name: "Find the right name of the full screen element.",
    description: "    grammar(\"JavaScript\");\n\
    var elementName = findProperty(document, [\"fullscreenElement\", \"mozFullScreenElement\", \"webkitFullscreenElement\", \"msFullscreenElement\"]);\n\
    console.assert(!isFirefox || elementName === \"mozFullScreenElement\");\n\
    console.assert(!isChrome || elementName === \"webkitFullscreenElement\");\n\
    console.assert(!isIE || elementName === \"msFullscreenElement\");"
  }]
});
pliny.function({
  parent: "Util",
  name: "immutable",
  description: "Define an enumerable property that cannot be modified.",
  returns: "Property",
  parameters: [{
    name: "value",
    type: "Object",
    optional: true,
    description: "The initial value for the property."
  }]
});
pliny.function({
  parent: "Util",
  name: "cache",
  description: "Looks for the hashed name of the object in the object cache, and if it exists, returns it. If it doesn't exist, calls the makeObject function, using the return results to set the object in the cache, and returning it. In other words, a simple sort of memoization.",
  parameters: [{
    name: "hash",
    type: "String",
    description: "The hash key for the object to cache or retrieve."
  }, {
    name: "makeObject",
    type: "Function",
    description: "A function that creates the object we want, if it doesn't already exist in the cache."
  }],
  returns: "Object",
  examples: [{
    name: "Basic usage",
    description: "Using the `cache()` function lets you create an object once and retrieve it back again with the same function call.\n\
\n\
    grammar(\"JavaScript\");\n\
    function makeCube(i){\n\
      return cache(\"cubeGeom\" + i, function(){\n\
        return new THREE.BoxGeometry(i, i, i);\n\
      });\n\
    }\n\
    \n\
    var a = makeCube(1),\n\
        b = makeCube(2),\n\
        c = makeCube(1);\n\
    \n\
    console.assert(a !== b);\n\
    console.assert(a === c);"
  }]
});
pliny.function({
  parent: "Util",
  name: "deleteSetting",
  parameters: [{
    name: "settingName",
    type: "string",
    description: "The name of the setting to delete."
  }],
  description: "Removes an object from localStorage",
  examples: [{
    name: "Basic usage",
    description: "\
\n\
    grammar(\"JavaScript\");\n\
    console.assert(getSetting(\"A\", \"default-A\") === \"default-A\");\n\
    setSetting(\"A\", \"modified-A\");\n\
    console.assert(getSetting(\"A\", \"default-A\") === \"modified-A\");\n\
    deleteSetting(\"A\");\n\
    console.assert(getSetting(\"A\", \"default-A\") === \"default-A\");"
  }]
});
pliny.class({
  parent: "Util",
  name: "FullScreenLockRequest",
  baseClass: "Util.AsyncLockRequest",
  description: "A cross browser/polyfill/mock implementation of the Fullscreen API. It includes a liar mode for systems that don't support the Fullscreen API, to make the handling of application logic more streamlined. This class itself is not exported, only a single instance of it."
});
pliny.function({
  parent: "Util",
  name: "getSetting",
  parameters: [{
    name: "settingName",
    type: "string",
    description: "The name of the setting to read."
  }, {
    name: "defValue",
    type: "Object",
    description: "The default value to return, if the setting is not present in `localStorage`."
  }],
  returns: "The Object stored in `localStorage` for the given name, or the default value provided if the setting doesn't exist in `localStorage`.",
  description: "Retrieves named values out of `localStorage`. The values should\n\
be valid for passing to `JSON.parse()`. A default value can be specified in the\n\
function call that should be returned if the value does not exist, or causes an\n\
error in parsing. Typically, you'd call this function at page-load time after having\n\
called the [`setSetting()`](#setSetting) function during a previous page session.",
  examples: [{
    name: "Basic usage",
    description: "Assuming a text input element with the id `text1`, the following\n\
code should persist between reloads whatever the user writes in the text area:\n\
\n\
    grammar(\"JavaScript\");\n\
    var text1 = document.getElementById(\"text1\");\n\
    document.addEventListener(\"unload\", function(){\n\
      setSetting(\"text1-value\", text1.value);\n\
    }, false);\n\
    document.addEventListener(\"load\", function(){\n\
      text1.value = getSetting(\"text1-value\", \"My default value!\");\n\
    }, false);"
  }]
});
pliny.function({
  parent: "Util",
  name: "identity",
  description: "The identity function takes a single parameter and returns out again that parameter.",
  returns: "Any",
  parameters: [{
    name: "obj",
    type: "Any",
    description: "The value to pass through."
  }],
  examples: [{
    name: "Basic usage",
    description: "The `identity()` function is useful in certain functional programming scenarios, such as filtering values of an array for falseyness.\n\
\n\
    grammar(\"JavaScript\");\n\
    var arr = [false, 1, 2, null, undefined, 0, 3, 4, \"Hello, world.\"];\n\
    console.log(arr.filter(identity)); // [1, 2, 3, 4]"
  }]
});
pliny.function({
  parent: "Util",
  name: "isTimestampDeltaValid",
  returns: "Boolean",
  description: "Helper method to validate the time steps of sensor timestamps.",
  parameters: [{
    name: "timestampDeltaS",
    type: "Number",
    description: "The timestamp to check."
  }]
});
pliny.function({
  parent: "Util",
  name: "mutable",
  description: "Define an enumerable property that can be modified, with type optional checking.",
  returns: "Property",
  parameters: [{
    name: "value",
    type: "Object",
    optional: true,
    description: "The initial value for the property."
  }, {
    name: "type",
    type: "string or Function",
    optional: true,

  }]
});
pliny.class({
  parent: "Util",
  name: "PointerLockRequest",
  baseClass: "Util.AsyncLockRequest",
  description: "A cross browser/polyfill/mock implementation of the PointerLock API. It includes a liar mode for systems that don't support the PointerLock API, to make the handling of application logic more streamlined. This class itself is not exported, only a single instance of it."
});
pliny.function({
  parent: "Util",
  name: "setSetting",
  parameters: [{
    name: "settingName",
    type: "string",
    description: "The name of the setting to set."
  }, {
    name: "val",
    type: "Object",
    description: "The value to write. It should be useable as a parameter to `JSON.stringify()`."
  }],
  description: "Writes named values to `localStorage`. The values should be valid\n\
for passing to `JSON.stringify()`. Typically, you'd call this function at page-unload\n\
time, then call the [`getSetting()`](#getSetting) function during a subsequent page load.",
  examples: [{
    name: "Basic usage",
    description: "Assuming a text input element with the id `text1`, the following\n\
code should persist between reloads whatever the user writes in the text area:\n\
\n\
    grammar(\"JavaScript\");\n\
    var text1 = document.getElementById(\"text1\");\n\
    document.addEventListener(\"unload\", function(){\n\
      setSetting(\"text1-value\", text1.value);\n\
    }, false);\n\
    document.addEventListener(\"load\", function(){\n\
      text1.value = getSetting(\"text1-value\", \"My default value!\");\n\
    }, false);"
  }]
});
pliny.class({
  parent: "Util",
  name: "Workerize",
  description: "Builds a WebWorker thread out of a JavaScript class's source code, and attempts to create a message interface that matches the message-passing interface that the class already uses.\n\
\n\
Automatically workerized classes should have methods that take a single array for any parameters and return no values. All return results should come through an Event that the class emits.",
  parameters: [{
    name: "func",
    type: "Function",
    description: "The class function to workerize"
  }],
  examples: [{
    name: "Create a basic workerized class.",
    description: "Classes in JavaScript are created by adding new functions to the `prototype` of another function, then instantiating objects from that class with `new`. When creating such a class for automatic workerization, a few restrictions are required:\n\
* All methods in the class must be on the prototype. Any methods created and assigned in the constructor will not be available to the message passing interface.\n\
* All interaction with objects of the class must be through these publicly accessible methods. This includes initialization.\n\
* All methods should take at most a single argument. If you need multiple arguments, pack them into an array.\n\
* The methods cannot return any values. If a value must be returned to the calling context, it must be done through an event callback.\n\
* The class must assign handlers to events through an addEventListener method that mirrors the standard interface used in DOM. Workerize will not respect the 3rd `bubbles` parameter that is so often omitted when programming against DOM.\n\
\n\
Assuming the following class:\n\
\n\
    grammar(\"JavaScript\");\n\
    function MyClass(){\n\
      this.listeners = {\n\
        complete: []\n\
      };\n\
      this.objects = [];\n\
    }\n\
\n\
    MyClass.prototype.addEventListener = function(evt, handler){\n\
      if(this.listeners[evt]){\n\
        this.listeners[evt].push(handler);\n\
      }\n\
    };\n\
\n\
    MyClass.prototype.addObject = function(obj){\n\
      this.objects.push(obj);\n\
    };\n\
\n\
    MyClass.prototype.update = function(dt){\n\
      // we can make essentially arbitrarily small timeslice updates\n\
      var SLICE = 0.1;\n\
      for(var ddt = 0; ddt < dt; ddt += SLICE){\n\
        for(var i = 0; i < this.objects.length; ++i){\n\
          var o = this.objects[i];\n\
          o.x += o.vx * SLICE;\n\
          o.y += o.vy * SLICE;\n\
          o.z += o.vz * SLICE;\n\
        }\n\
      }\n\
      // prepare our return state for the UI thread.\n\
      var returnValue = [];\n\
      for(var i = 0; i < this.objects.length; ++i){\n\
        returnValue.push([o.x, o.y, o.z]);\n\
      }\n\
      // and emit the event to all of the listeners.\n\
      for(var i = 0; i < this.listeners.complete.length; ++i){\n\
        this.listeners.complete[i](returnValue);\n\
      }\n\
    };\n\
\n\
Then we can create and use an automatically workerized version of it as follows.\n\
\n\
    grammar(\"JavaScript\");\n\
    var phys = new Primrose.Workerize(MyClass);\n\
    // we keep a local copy of the state so we can perform other operations on it.\n\
    var objects = [];\n\
    for(var i = 0; i < 10; ++i){\n\
      var obj = {\n\
        // random values between -1 and 1\n\
        x: 2 * Math.random() - 1,\n\
        y: 2 * Math.random() - 1,\n\
        z: 2 * Math.random() - 1,\n\
        vx: 2 * Math.random() - 1,\n\
        vy: 2 * Math.random() - 1,\n\
        vz: 2 * Math.random() - 1\n\
      };\n\
      objects.push(obj);\n\
      phys.addObject(obj);\n\
    }\n\
    \n\
    // this flag lets us keep track of whether or not we know that the worker is in the middle of an expensive operation.\n\
    phys.ready = true;\n\
    phys.addEventListener(\"complete\", function(newPositions){\n\
      // We update the state in the UI thread with the expensively-computed values.\n\
      for(var i = 0; i < newPositions.length; ++i){\n\
        objects[i].x = newPositions[i][0];\n\
        objects[i].y = newPositions[i][1];\n\
        objects[i].z = newPositions[i][2];\n\
      }\n\
      phys.ready = true;\n\
    });\n\
    \n\
    var lt = null;\n\
    function paint(t){\n\
      requestAnimationFrame(paint);\n\
      if(lt === undefined || lt === null){\n\
        lt = t;\n\
      } else {\n\
        var dt = t - lt;\n\
        if(phys.ready){\n\
          phys.ready = false;\n\
          phys.update(dt);\n\
          lt = t;\n\
        }\n\
        for(var i = 0; i < objects.length; ++i){\n\
          var o = objects[i];\n\
          // We can even perform a much cheaper position update to smooth over the blips in the expensive update on the worker thread.\n\
          drawObjectAt(o.x + o.vx * dt, o.y + o.vy * dt, o.z + o.vz * dt);\n\
        }\n\
      }\n\
    }\n\
    requestAnimationFrame(paint);"
    }]
});
pliny.function({
      parent: "Util.Workerize",
      name: "createWorker",
      description: "A static function that loads Plain Ol' JavaScript Functions into a WebWorker.",
      parameters: [{
        name: "script",
        type: "(String|Function)",
        description: "A String defining a script, or a Function that can be toString()'d to get it's script."
      }, {
        name: "stripFunc",
        type: "Boolean",
        description: "Set to true if you want the function to strip the surround function block scope from the script."
      }],
      returns: "The WebWorker object."
    });
pliny.property({
      parent: "Util.Workerize",
      name: "worker",
      type: "WebWorker",
      description: "The worker thread containing our class."
    });
pliny.property({
      parent: "Util.Workerize",
      name: "args",
      type: "Array",
      description: "Static allocation of an array to save on memory usage when piping commands to a worker."
    });
pliny.property({
      parent: "Util.Workerize",
      name: "&lt;mappings for each method in the original class&gt;",
      type: "Function",
      description: "Each mapped function causes a message to be posted to the worker thread with its arguments packed into an array."
    });
pliny.method({
      parent: "Util.Workerize",
      name: "methodShim",
      description: "Posts messages to the worker thread by packing arguments into an array. The worker will receive the array and interpret the first value as the name of the method to invoke and the second value as another array of parameters.",
      parameters: [{
        name: "methodName",
        type: "String",
        description: "The method inside the worker context that we want to invoke."
      }, {
        name: "args",
        type: "Array",
        description: "The arguments that we want to pass to the method that we are calling in the worker context."
      }]
    });
pliny.function({
  parent: "Live API",
  name: "material",
  description: "A mechanism for creating and caching Three.js Materials so they don't get duplicated, as duplicate materials can severally slow down the system.\n\
\n\
You typically won't use this function on your own. It's usually called by one of the functions [`textured()`](#LiveAPI_textured] or [`colored()`](#LiveAPI_colored) to handle common material handling between the two.",
  returns: "THREE.MeshStandardMaterial or THREE.MeshBasicMaterial",
  parameters: [{
    name: "textureDescription",
    type: "String",
    optional: true,
    default: "none",
    description: "When called from `textured()`, it is the string that uniquely identifies the texture being used as part of the material. When called from `colored()`, it's just an empty string. The `textureDescription` is then used as part of a `materialDescription` that is used to cache the material."
  }, {
    name: "options",
    type: "Live API.material.optionsHash",
    optional: true,
    description: "Options to pass to the THREE.MeshStandardMaterial or THREE.MeshBasicMaterial constructor, or infrequently-used options to change the behavior of the setup. See [`Live API.material.optionsHash`](#LiveAPI_material_optionsHash) for more information."
  }]
});
pliny.record({
  parent: "Live API.material",
  name: "optionsHash",
  type: "Object",
  description: "Optional options to alter how the material is created.",
  parameters: [{
    name: "color",
    type: "Number",
    optional: true,
    default: "0xffffff",
    description: "A hex-value RGB color to apply to the material."
  }, {
    name: "unshaded",
    type: "Boolean",
    optional: true,
    default: false,
    description: "Set to true to use THREE.MeshBasicMaterial instead of THREE.MeshStandardMaterial."
  }, {
    name: "side",
    type: "Number",
    optional: true,
    default: "THREE.FrontSide",
    description: "Used to set the sides of the material that get rendered. Options are:\n\
\n\
* `THREE.FontSide`\n\
* `THREE.BackSide`\n\
* `THREE.DoubleSide`\n\
\n\n"
  }, {
    name: "opacity",
    type: "Number",
    optional: true,
    default: 1,
    description: "Set how opaque the material will be. When this value is set to a value less than 1, the `transparent` option is automatically set as well"
  }, {
    name: "transparent",
    type: "Boolean",
    optional: true,
    description: "Set to true to make the material participate in z-buffered transparency rendering."
  }, {
    name: "useFog",
    type: "Boolean",
    optional: true,
    default: true,
    description: "Set whether or not the material is affected by fog in the scene."
  }, {
    name: "wireframe",
    type: "Boolean",
    optional: true,
    default: true,
    description: "Set whether or not the material is rendered as a wireframe, rather than full polygons."
  }, {
    name: "roughness",
    type: "Number",
    optional: true,
    default: 0.5,
    description: "When `unshaded` is falsey, sets the THREE.MeshStandardMaterial's diffuse scattering parameter."
  }, {
    name: "metalness",
    type: "Number",
    optional: true,
    default: 0,
    description: "When `unshaded` is falsey, sets the THREE.MeshStandardMaterial's specular reflection parameter."
  }, {
    name: "emissive",
    type: "Boolean",
    optional: true,
    default: true,
    description: "When `unshaded` is falsey, sets the light that the THREE.MeshStandardMaterial emits onto the scene."
  } ]
});
pliny.function({
  parent: "Primrose.Graphics",
  name: "loadTexture",
  description: "Loads an image as a texture",
  returns: "THREE.Texture or THREE.CubteTexture",
  parameters: [{
    name: "id",
    type: "String",
    description: "The key to use to cache the texture."
  }, {
    name: "url",
    type: "String or 6-item Array of String",
    description: "The texture path(s) to load."
  }, {
    name: "progress",
    type: "Function",
    optional: true,
    description: "A callback function to use for tracking progress. The callback function should accept a standard [`ProgressEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent)."
  }]
})
pliny.function({
  parent: "Live API",
  name: "colored",
  description: "Apply a color to a geometry, creating the intermediate material as necessary, and returning the resulting mesh",
  returns: "THREE.Mesh",
  parameters: [{
    name: "geometry",
    type: "THREE.Geometry",
    description: "The geometry to which to apply the color."
  }, {
    name: "color",
    type: "Number",
    description: "A hexadecimal color value in RGB format."
  }, {
    name: "options",
    type: "Live API.colored.optionsHash",
    optional: true,
    description: "Options to pass on to [`material()`](#LiveAPI_material), or infrequently-used options to change the behavior of the setup. See [`Live API.colored.optionsHash`](#LiveAPI_colored_optionsHash) and [`Live API.material.optionsHash`](#LiveAPI_material_optionsHash) for more information."
  }],
  examples: [{
    name: "Usage",
    description: `Apply color to a geometry:

    grammar("JavaScript");
    var geom = box(),
      red = colored(geom, 0xff0000),
      green = colored(geom, 0x00ff00),
      blue = colored(geom, 0x0000ff);

    red.position.set(-2, 1, -1);
    green.position.set(0, 1, -1);
    blue.position.set(2, 1, -1);

    env.scene.add(red);
    env.scene.add(green);
    env.scene.add(blue);

The results should look like this:

<img src="images/colored.jpg">`
  }]
});
pliny.record({
  parent: "Live API.colored",
  name: "optionsHash",
  type: "Object",
  description: "Optional options to alter how the texture is applied to the geometry. This also includes options that are passed on to the [`material()`](#LiveAPI_material) function.",
  parameters: [{
    name: "resolve",
    type: "Function",
    optional: true,
    description: "A callback function to use when the material is successfully created, so that `colored()` can be used in place of `textured()`."
  }]
});
pliny.function({
  parent: "Live API",
  name: "box",
  description: "A shortcut function for the THREE.BoxGeometry class. Creates a \"rectilinear prism\", i.e. the general class of rectangular objects that includes cubes.",
  parameters: [{
    name: "width",
    type: "Number",
    description: "The size of the box in the X dimension."
  }, {
    name: "height",
    type: "Number",
    optional: true,
    description: "The size of the box in the Y dimension. If height is not provided, it will be set to the width parameter."
  }, {
    name: "length",
    type: "Number",
    optional: true,
    description: "The size of the box in the Z dimension. If length is not provided, it will be set to the width parameter."
  }, {
    name: "t",
    type: "Number",
    description: "The number of horizontal sections in which to split the box.",
    optional: true,
    default: 1
  }, {
    name: "u",
    type: "Number",
    description: "The number of vertical sections in which to split the box.",
    optional: true,
    default: 1
  }, {
    name: "v",
    type: "Number",
    description: "The number of sections deep in which to split the box.",
    optional: true,
    default: 1
  }],
  returns: "THREE.BoxGeometry",
  examples: [{
    name: "Basic usage",
    description: "Three.js separates geometry from materials, so you can create shared materials and geometry that recombine in different ways. To create a simple box geometry object that you can then add a material to create a mesh:\n\
  \n\
    grammar(\"JavaScript\");\n\
    var geom = box(1, 2, 3),\n\
      mesh = colored(geom, 0xff0000);\n\
    mesh\n\
      .addTo(scene)\n\
      .at(-2, 1, -5);\n\
\n\
It should look something like this:\n\
<img src=\"images/box.jpg\">"
  }]
});
pliny.function({
  parent: "Live API",
  name: "camera",
  returns: "THREE.Texture",
  description: "Creates a texture that reads data from one of the cameras connected to the system.",
  parameters: [{
    name: "index",
    type: "Number",
    optional: true,
    default: 0,
    description: "The index of the object from the results of getUserMedia() to use for the camera."
  },{
    name: "options",
    type: "Live API.camera.optionsHash",
    optional: true,
    description: "Extra parameters for the selected camera, including resolution."
  }]
});
pliny.record({
  parent: "Live API.camera",
  name: "optionsHash",
  description: "Extra parameters for the selected camera, including resolution.",
  parameters: [{
    name: "width",
    type: "Number",
    description: "The width of the camera image to request. Note that if the camera does not support the resolution mode you are specifying, the request may not succeed, or may not give you the results you expect."
  }]
});
pliny.class({
  parent: "Primrose.Controls",
  name: "Videa",
  baseClass: "Primrose.Controls.BaseTextured",
  description: "A simple 2D video to put on a Surface.",
  parameters: [{
    name: "options",
    type: "Object",
    description: "Named parameters for creating the Video."
  }]
});
pliny.class({
  parent: "Primrose.Controls",
  name: "BaseTextured",
  baseClass: "Primrose.Controls.Surface",
  description: "A simple 2D texture that has to be loaded from a file.",
  parameters: [{
    name: "options",
    type: "Object",
    description: "Named parameters for creating the textured object."
  }]
});
pliny.function({
  parent: "Primrose.Controls.Entity",
  name: "updateAll",
  description: "Trigger the eyeBlank event for all registered entities.",
  parameters: [{
    name: "eye",
    type: "Number",
    description: "The eye to switch to: -1 for left, +1 for right."
  }]
});
pliny.class({
  parent: "Primrose.Controls",
  name: "Entity",
  baseClass: "THREE.Object3D",
  description: "The Entity class is the parent class for all 3D controls. It manages a unique ID for every new control, the focus state of the control, and performs basic conversions from DOM elements to the internal Control format."
});
pliny.function({
  parent: "Live API",
  name: "circle",
  description: "A shortcut function for the THREE.CircleBufferGeometry class. Creates a flat circle, oriented in the XZ plane. `Circle` is a bit of a misnomer. It's actually an N-sided polygon, with the implication being that N must be large to convincingly approximate a true circle.",
  parameters: [{
    name: "r",
    type: "Number",
    description: "The radius of the circle.",
    optional: true,
    default: 1
  }, {
    name: "sections",
    type: "Number",
    description: "The number of sides for the polygon approximating a circle.",
    optional: true,
    default: 18
  }, {
    name: "start",
    type: "Number",
    description: "The angle in radians at which to start drawing the circle polygon.",
    optional: true,
    default: 0
  }, {
    name: "end",
    type: "Number",
    description: "The angle in radians at which to stop drawing the circle polygon.",
    optional: true,
    default: 2 * Math.PI
  }],
  returns: "THREE.CircleBufferGeometry",
  examples: [{
    name: "Basic usage",
    description: "Three.js separates geometry from materials, so you can create shared materials and geometry that recombine in different ways. To create a simple circle geometry object that you can then add a material to create a mesh:\n\
  \n\
    grammar(\"JavaScript\");\n\
    var geom = circle(1, 18, 0, 2 * Math.PI)\n\
      .colored(0xff0000)\n\
      .addTo(scene)\n\
      .at(-2, 1, -5);\n\
\n\
It should look something like this:\n\
<img src=\"images/circle.jpg\">"
  }]
});
pliny.function({
  parent: "Live API",
  name: "cloud",
  description: "Creates a point cloud with points of a fixed color and size out of an array of vertices.",
  parameters: [{
    name: "verts",
    type: "Array",
    description: "An array of `THREE.Vector3`s to turn into a `THREE.Points` object."
  }, {
    name: "c",
    type: "Number",
    description: "A hexadecimal color value to use when creating the `THREE.PointsMaterial` to go with the point cloud."
  }, {
    name: "s",
    type: "Number",
    description: "A numeric size value to use when creating the `THREE.PointsMaterial` to go with the point cloud."
  }],
  returns: "THREE.Points",
  examples: [{
    name: "Create randomized \"dust\".",
    description: "Creating a cloud is pretty simple.\n\
\n\
    grammar(\"JavaScript\");\n\
    var verts = [],\n\
        R = Primrose.Random.number,\n\
        WIDTH = 10,\n\
        HEIGHT = 10,\n\
        DEPTH = 10;\n\
    \n\
    for (var i = 0; i< 5000; ++i) {\n\
      verts.push(v3(R(-0.5 * WIDTH, 0.5 * WIDTH),\n\
                    R(-0.5 * HEIGHT, 0.5 * HEIGHT),\n\
                    R(-0.5 * DEPTH, 0.5 * DEPTH)));\n\
    }\n\
    cloud(verts, 0x7f7f7f 0.05)\n\
      .addTo(scene)\n\
      .at(WIDTH / 2 , HEIGHT / 2, DEPTH / 2);\n\
\n\
The results should look like this:\n\
\n\
<img src=\"images/cloud.jpg\">"
  }]
});
pliny.function({
  parent: "Live API",
  name: "cylinder",
  description: "Shorthand function for creating a new THREE.CylinderGeometry object.",
  parameters: [{
    name: "rT",
    type: "Number",
    optional: true,
    description: "The radius at the top of the cylinder.",
    default: 0.5
  }, {
    name: "rB",
    type: "Number",
    optional: true,
    description: "The radius at the bottom of the cylinder.",
    default: 0.5
  }, {
    name: "height",
    type: "Number",
    optional: true,
    description: "The height of the cylinder.",
    default: 1
  }, {
    name: "rS",
    type: "Number",
    optional: true,
    description: "The number of sides on the cylinder.",
    default: 8
  }, {
    name: "hS",
    type: "Number",
    optional: true,
    description: "The number of slices along the height of the cylinder.",
    default: 1
  }, {
    name: "openEnded",
    type: "Boolean",
    optional: true,
    description: "Whether or not to leave the end of the cylinder open, thereby making a pipe.",
    default: false
  }, {
    name: "thetaStart",
    type: "Number",
    optional: true,
    description: "The angle at which to start sweeping the cylinder.",
    default: 0
  }, {
    name: "thetaEnd",
    type: "Number",
    optional: true,
    description: "The angle at which to end sweeping the cylinder.",
    default: 2 * Math.PI
  }],
  returns: "THREE.CylinderBufferGeometry",
  examples: [{
    name: "Basic usage",
    description: "Three.js separates geometry from materials, so you can create shared materials and geometry that recombine in different ways. To create a simple cylinder geometry object that you can then add a material to create a mesh: \n\
  \n\
    grammar(\"JavaScript\");\n\
    var mesh = cylinder()\n\
      .colored(0xff0000)\n\
      .addTo(scene)\n\
      .at(-2, 1, -5);\n\
\n\
It should look something like this:\n\
<img src=\"images/cylinder.jpg\">"
  }]
});
pliny.function({
  parent: "Live API",
  name: "light",
  description: "Shortcut function for creating a new THREE.PointLight object.",
  parameters: [{
    name: "color",
    type: "Number",
    optional: true,
    description: "The RGB color value for the light.",
    default: "0xffffff"
  }, {
    name: "intensity",
    type: "Number",
    optional: true,
    description: "The strength of the light.",
    default: 1
  }, {
    name: "distance",
    type: "Number",
    optional: true,
    description: "The distance the light will shine.",
    default: 0
  }, {
    name: "decay",
    type: "Number",
    optional: true,
    description: "How much the light dims over distance.",
    default: 1
  }],
  returns: "THREE.PointLight",
  examples: [{
    name: "Basic usage",
    description: "    grammar(\"JavaScript\");\n\
    light(0xffff00)\n\
      .addTo(scene)\n\
      .at(0, 100, 0);"
  }]
});
pliny.function({
  parent: "Live API",
  name: "phys",
  description: "Make a 3D object react to physics updates."
});
pliny.function({
  parent: "Live API",
  name: "quad",
  description: "A shortcut function for the THREE.PlaneBufferGeometry class. Creates a flat rectangle, oriented in the XY plane.",
  parameters: [{
    name: "width",
    type: "Number",
    description: "The width of the rectangle."
  }, {
    name: "height",
    type: "Number",
    description: "The height of the rectangle.",
    optional: true,
    default: "The value of the `width` parameter."
  }, {
    name: "options",
    type: "Live API.quad.optionsHash",
    optional: true,
    description: "Optional settings for creating the quad geometry. See [`Live API.quad.optionsHash`](#LiveAPI_quad_optionsHash) for more information."
  }],
  returns: "THREE.PlaneBufferGeometry",
  examples: [{
    name: "Basic usage",
    description: "Three.js separates geometry from materials, so you can create shared materials and geometry that recombine in different ways. To create a simple circle geometry object that you can then add a material to create a mesh:\n\
  \n\
    grammar(\"JavaScript\");\n\
    var mesh = quad(1, 2)\n\
      .colored(0xff0000)\n\
      .addTo(scene)\n\
      .at(-2, 1, -5);\n\
\n\
It should look something like this:\n\
<img src=\"images/quad.jpg\">"
  }]
});
pliny.record({
  parent: "Live API.quad",
  name: "optionsHash",
  description: "Optional options to alter how the quad is built.",
  parameters: [{
    name: "s",
    type: "Number",
    description: "The number of sub-quads in which to divide the quad horizontally.",
    optional: true,
    default: 1
  }, {
    name: "t",
    type: "Number",
    description: "The number of sub-quads in which to divide the quad vertically.",
    optional: true,
    default: 1
  }, {
    name: "maxU",
    type: "Number",
    description: "A scalar value for the texture coordinate U component.",
    optional: true,
    default: 1
  }, {
    name: "maxV",
    type: "Number",
    description: "A scalar value for the texture coordinate V component.",
    optional: true,
    default: 1
  }]
});
pliny.function({
  parent: "Primrose.Graphics",
  name: "fixGeometry",
  description: "Performs some changes to the geometry's UV coordinates to make them work better.",
  returns: "THREE.Geometry",
  parameters: [{
    name: "geometry",
    type: "THREE.Geometry",
    description: "The geometry to fix."
  }, {
    name: "options",
    type: "Primrose.Graphics.fixGeometry.optionsHash",
    optional: true,
    description: "Options for changing the UV coordinates. See [`Primrose.Graphics.fixGeometry.optionsHash`](#Primrose_Graphics_fixGeometry_optionsHash) for more information."
  }]
});
pliny.record({
  parent: "Primrose.Graphics.fixGeometry",
  name: "optionsHash",
  description: "Options for changing the UV coordinates.",
  parameters: [{
    name: "maxU",
    type: "Number",
    optional: true,
    default: 1,
    description: "The value by which to scale the U component of the texture coordinate."
  }, {
    name: "maxV",
    type: "Number",
    optional: true,
    default: 1,
    description: "The value by which to scale the V component of the texture coordinate."
  }]
});
pliny.function({
  parent: "Live API",
  name: "quat",
  description: "A shorthand for THREE.Quaternion.",
  returns: "THREE.Quaternion",
  parameters: [{
    name: "x",
    type: "Number",
    description: "The `x` component of the Quaternion."
  }, {
    name: "y",
    type: "Number",
    description: "The `y` component of the Quaternion."
  }, {
    name: "z",
    type: "Number",
    description: "The `z` component of the Quaternion."
  }, {
    name: "w",
    type: "Number",
    description: "The `w` component of the Quaternion."
  }]
});
pliny.function({
  parent: "Live API",
  name: "range",
  description: "Executes a function a set number of times, to shorten up common programming patterns a little. If the provided function returns value, they will be collected into an array that is returned at the end of the loop. This function has a weird cascading syntax that does not work like normal functions with default values for positional parameters.",
  parameters: [{
    name: "n",
    type: "Number",
    description: "The starting value for the loop counter.",
    optional: true,
    default: 0
  }, {
    name: "m",
    type: "Number",
    description: "The ending value for the loop counter."
  }, {
    name: "s",
    type: "Number",
    description: "The value by which to increment the loop counter.",
    optional: true,
    default: 1
  }, {
    name: "t",
    type: "Function",
    description: "A function that receives the current loop counter value, does work, and optionally returns a result.",
    optional: true,
    default: "the identity function"
  }],
  returns: "Array",
  examples: [{
    name: "Generate an array of ten numbers, from 0 to 9.",
    description: "The most basic usage is with one parameter.\n\
\n\
    grammar(\"JavaScript\");\n\
    var arr = range(10);\n\
    console.log(arr); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];\n\
"
  }, {
    name: "Generate an array of five objects.",
    description: "The last parameter position is always a function.\n\
\n\
    grammar(\"JavaScript\");\n\
    var arr = range(5, hub);\n\
    console.log(arr); // [[Object], [Object], [Object], [Object], [Object]];\n\
"
  }, {
    name: "Generate a subsection of an array of numbers.",
    description: "If you provide two number parameters, the first is treated as the starting value and the second is the end.\n\
\n\
    grammar(\"JavaScript\");\n\
    var arr = range(3, 5);\n\
    console.log(arr); // [3, 4];\n\
"
  }, {
    name: "Generate a series of strings.",
    description: "If you provide two number parameters, the first is treated as the starting value and the second is the end.\n\
\n\
    grammar(\"JavaScript\");\n\
    var arr = range(3, 5, (i) => \"num\" + i);\n\
    console.log(arr); // [\"num3\", \"num4\"];\n\
"
  }, {
    name: "Specify a step value.",
    description: "If you provide three number parameters, the first is treated as the starting value, the second is the end, and the third is the step value.\n\
\n\
    grammar(\"JavaScript\");\n\
    var arr = range(3, 15, 3);\n\
    console.log(arr); // [3, 6, 9, 12];\n\
"
  }, {
    name: "Generate objects using a step value.",
    description: "If you provide three number parameters, the first is treated as the starting value, the second is the end, and the third is the step value.\n\
\n\
    grammar(\"JavaScript\");\n\
    var arr = range(3, 15, 3, (x) => {\n\
      var obj = hub();\n\
      obj.position.x = x;\n\
      return obj;\n\
    });\n\
"
  }]
});
pliny.function({
  parent: "Live API",
  name: "raycaster",
  description: "Creates a THREE.Raycaster. This is useful so you don't have to try to figure out how to import any parts of Three.js separately from Primrose. It also makes it possible to use in functional settings."
});
pliny.function({
  parent: "Live API",
  name: "ring",
  description: "A shortcut function for the THREE.RingBufferGeometry class. Creates a flat ring, which is a larger circle with a smaller circle cut out of its center, oriented in the XZ plane. `Circle` is a bit of a misnomer. It's actually an N-sided polygon, with the implication being that N must be large to convincingly approximate a true circle.",
  parameters: [{
    name: "rInner",
    type: "Number",
    description: "The radius of the inner circle of the ring.",
    optional: true,
    default: 0.5
  }, {
    name: "rOuter",
    type: "Number",
    description: "The radius of the outer circle of the ring.",
    optional: true,
    default: 1
  }, {
    name: "sectors",
    type: "Number",
    description: "The number of radial sides for the polygon approximating a ring.",
    optional: true,
    default: 18
  }, {
    name: "rings",
    type: "Number",
    description: "The number of concentric rings in which to split the ring.",
    optional: true,
    default: 1
  }, {
    name: "start",
    type: "Number",
    description: "The angle in radians at which to start drawing the ring polygon.",
    optional: true,
    default: 0
  }, {
    name: "end",
    type: "Number",
    description: "The angle in radians at which to stop drawing the ring polygon.",
    optional: true,
    default: 2 * Math.PI
  }],
  returns: "THREE.CircleBufferGeometry",
  examples: [{
    name: "Basic usage",
    description: "Three.js separates geometry from materials, so you can create shared materials and geometry that recombine in different ways. To create a simple circle geometry object that you can then add a material to create a mesh:\n\
  \n\
    grammar(\"JavaScript\");\n\
    var mesh = ring(0.5, 1, 18, 1, 0, 2 * Math.PI)\n\
      .colored(0xff0000)\n\
      .addTo(scene)\n\
      .at(-2, 1, -5);\n\
\n\
It should look something like this:\n\
<img src=\"images/ring.jpg\">"
  }]
});
pliny.function({
  parent: "Live API",
  name: "shell",
  parameters: [{
    name: "radius",
    type: "Number",
    description: "How far the sphere should extend away from a center point."
  }, {
    name: "widthSegments",
    type: "Number",
    description: "The number of faces wide in which to slice the geometry."
  }, {
    name: "heightSegments",
    type: "Number",
    description: "The number of faces tall in which to slice the geometry."
  }, {
    name: "phi",
    type: "Number",
    optional: true,
    description: "The angle in radians around the Y-axis of the sphere.",
    default: "80 degrees."
  }, {
    name: "theta",
    type: "Number",
    optional: true,
    description: "The angle in radians around the Z-axis of the sphere.",
    default: "48 degrees."
  }],
  description: "The shell is basically an inside-out sphere. Say you want a to model\n\
the sky as a sphere, or the inside of a helmet. You don't care anything about the\n\
outside of this sphere, only the inside. You would use InsideSphereGeometry in this\n\
case. It is mostly an alias for [`InsideSphereGeometry`](#LiveAPI_InsideSphereGeometry).",
  examples: [{
    name: "Create a sky sphere",
    description: "To create a sphere that hovers around the user at a\n\
far distance, showing a sky of some kind, you can use the `shell()` function in\n\
combination with the [`textured()`](#LiveAPI_textured) function. Assuming you have an image\n\
file to use as the texture, execute code as such:\n\
\n\
    grammar(\"JavaScript\");\n\
    var sky = textured(\n\
      shell(\n\
          // The radius value should be less than your draw distance.\n\
          1000,\n\
          // The number of slices defines how smooth the sphere will be in the\n\
          // horizontal direction. Think of it like lines of longitude.\n\
          18,\n\
          // The number of rings defines how smooth the sphere will be in the\n\
          // vertical direction. Think of it like lines of latitude.\n\
          9,\n\
          // The phi angle is the number or radians around the 'belt' of the sphere\n\
          // to sweep out the geometry. To make a full circle, you'll need 2 * PI\n\
          // radians.\n\
          Math.PI * 2,\n\
          // The theta angle is the number of radians above and below the 'belt'\n\
          // of the sphere to sweep out the geometry. Since the belt sweeps a full\n\
          // 360 degrees, theta only needs to sweep a half circle, or PI radians.\n\
          Math.PI ),\n\
      // Specify the texture image next.\n\
      \"skyTexture.jpg\",\n\
      // Specify that the material should be shadeless, i.e. no shadows. This\n\
      // works best for skymaps.\n\
      {unshaded: true} );"
  }]
});
pliny.class({
  parent: "Primrose.Graphics",
  name: "InsideSphereGeometry",
  parameters: [{
    name: "radius",
    type: "Number",
    description: "How far the sphere should extend away from a center point."
  }, {
    name: "widthSegments",
    type: "Number",
    description: "The number of faces wide in which to slice the geometry."
  }, {
    name: "heightSegments",
    type: "Number",
    description: "The number of faces tall in which to slice the geometry."
  }, {
    name: "phiStart",
    type: "Number",
    description: "The angle in radians around the Y-axis at which the sphere starts."
  }, {
    name: "phiLength",
    type: "Number",
    description: "The change of angle in radians around the Y-axis to which the sphere ends."
  }, {
    name: "thetaStart",
    type: "Number",
    description: "The angle in radians around the Z-axis at which the sphere starts."
  }, {
    name: "thetaLength",
    type: "Number",
    description: "The change of angle in radians around the Z-axis to which the sphere ends."
  }],
  description: "The InsideSphereGeometry is basically an inside-out Sphere. Or\n\
more accurately, it's a Sphere where the face winding order is reversed, so that\n\
textures appear on the inside of the sphere, rather than the outside. I know, that's\n\
not exactly helpful.\n\
\n\
Say you want a to model the sky as a sphere, or the inside of a helmet. You don't\n\
care anything about the outside of this sphere, only the inside. You would use\n\
InsideSphereGeometry in this case. Or its alias, [`shell()`](#LiveAPI_shell)."
});
pliny.function({
  parent: "Live API",
  name: "sphere",
  parameters: [{
    name: "radius",
    type: "Number",
    description: "How far the sphere should extend away from a center point."
  }, {
    name: "widthSegments",
    type: "Number",
    description: "The number of faces wide in which to slice the geometry."
  }, {
    name: "heightSegments",
    type: "Number",
    description: "The number of faces tall in which to slice the geometry."
  }, {
    name: "phi",
    type: "Number",
    optional: true,
    description: "The angle in radians around the Y-axis of the sphere.",
    default: "80 degrees."
  }, {
    name: "theta",
    type: "Number",
    optional: true,
    description: "The angle in radians around the Z-axis of the sphere.",
    default: "48 degrees."
  }],
  description: "Creates a THREE.SphereBuffereGeometry.",
  examples: [{
    name: "Create a pointer.",
    description: "Small spheres are useful for indicating things:\n\
\n\
    grammar(\"JavaScript\");\n\
    var ball = colored(\n\
      sphere(0.1),\n\
      0xffff00,\n\
      {unshaded: true} );"
  }]
});
pliny.function({
  parent: "Live API",
  name: "spring",
  parameters: [{
    name: "a",
    type: "Primrose.Controls.Entity",
    description: "One half of the spring."
  }, {
    name: "b",
    type: "Primrose.Controls.Entity",
    description: "The other half of the spring."
  }, {
    name: "options",
    type: "Object",
    optional: true,
    description: "Options to pass to the `CANNON.Spring` constructor."
  }],
  description: "Creates a spring physics constraint between two objects."
});
pliny.function({
  parent: "Live API",
  name: "v2",
  description: "A shortcut function for creating a new THREE.Vector3 object.",
  parameters: [{
    name: "x",
    type: "Number",
    description: "The X component of the vector"
  }, {
    name: "y",
    type: "Number",
    description: "The Y component of the vector"
  }],
  returns: "THREE.Vector2",
  examples: [{
    name: "Create a vector",
    description: "    grammar(\"JavaScript\");\n\
    var a = v2(1, 2);\n\
    console.assert(a.x === 1);\n\
    console.assert(a.y === 2);\n\
    console.assert(a.toArray().join(\", \") === \"1, 2\");"
  }]
});
pliny.function({
  parent: "Live API",
  name: "v3",
  description: "A shortcut function for creating a new THREE.Vector3 object.",
  parameters: [{
    name: "x",
    type: "Number",
    description: "The X component of the vector"
  }, {
    name: "y",
    type: "Number",
    description: "The Y component of the vector"
  }, {
    name: "z",
    type: "Number",
    description: "The Z component of the vector"
  }],
  returns: "THREE.Vector3",
  examples: [{
    name: "Create a vector",
    description: "    grammar(\"JavaScript\");\n\
    var a = v3(1, 2, 3);\n\
    console.assert(a.x === 1);\n\
    console.assert(a.y === 2);\n\
    console.assert(a.z === 3);\n\
    console.assert(a.toArray().join(\", \") === \"1, 2, 3\");"
  }]
});
pliny.function({
  parent: "Live API",
  name: "v4",
  description: "A shortcut function for creating a new THREE.Vector4 object.",
  parameters: [{
    name: "x",
    type: "Number",
    description: "The X component of the vector"
  }, {
    name: "y",
    type: "Number",
    description: "The Y component of the vector"
  }, {
    name: "z",
    type: "Number",
    description: "The Z component of the vector"
  }, {
    name: "w",
    type: "Number",
    description: "The W component of the vector"
  }],
  returns: "THREE.Vector4",
  examples: [{
    name: "Create a vector",
    description: "    grammar(\"JavaScript\");\n\
    var a = v4(1, 2, 3);\n\
    console.assert(a.x === 1);\n\
    console.assert(a.y === 2);\n\
    console.assert(a.z === 3);\n\
    console.assert(a.w === 4);\n\
    console.assert(a.toArray().join(\", \") === \"1, 2, 3, 4\");"
  }]
});
pliny.method({
  parent: "THREE.Object3D",
  name: "appendChild",
  description: "An alias for `Object3D::add`, to mirror DOM.",
  parameters: [ {
    name: "child",
    type: "THREE.Object3D",
    description: "The object to add."
  }]
});
pliny.namespace({
  name: "Primrose",
  description: "Primrose helps you make VR applications for web browsers as easy as making other types of interactive web pages.\n\
\n\
This top-level namespace contains classes for manipulating and viewing 3D environments."
});
pliny.namespace({
  parent: "Primrose",
  name: "Audio",
  description: "The audio namespace contains classes that handle output to devices other than the screen (e.g. Audio, Music, etc.)."
});
pliny.class({
  parent: "Primrose.Output",
    name: "Audio3D",
    description: "| [under construction]"
});
pliny.method({
      parent: "Primrose.Output.Audio3D",
      name: "loadSound",
      returns: "Promise<MediaElementAudioSourceNode>",
      parameters: [{
        name: "sources",
        type: "String|Array<String>",
        description: "A string URI to an audio source, or an array of string URIs to audio sources. Will be used as a collection of HTML5 &lt;source> tags as children of an HTML5 &lt;audio> tag."
      }, {
        name: "loop",
        type: "Boolean",
        optional: true,
        description: "indicate that the sound should be played on loop."
      }],
      description: "Loads the first element of the `sources` array for which the browser supports the file format as an HTML5 &lt;audio> tag to use as an `AudioSourceNode` attached to the current `AudioContext`. This does not load all of the audio files. It only loads the first one of a list of options that could work, because all browsers do not support the same audio formats.",
      examples: [{
        name: "Load a single audio file.",
        description: "There is no one, good, compressed audio format supported in all browsers, but they do all support uncompressed WAV. You shouldn't use this on the Internet, but it might be okay for a local solution.\n\
\n\
  grammar(\"JavaScript\");\n\
  var audio = new Primrose.Output.Audio3D();\n\
  audio.loadSource(\"mySong.wav\").then(function(node){\n\
    node.connect(audio.context.destination);\n\
  });"
      }, {
        name: "Load a single audio file from a list of options.",
        description: "There is no one, good, compressed audio format supported in all browsers. As a hack around the problem, HTML5 media tags may include one or more &lt;source> tags as children to specify a cascading list of media sources. The browser will select the first one that it can successfully decode.\n\
\n\
  grammar(\"JavaScript\");\n\
  var audio = new Primrose.Output.Audio3D();\n\
  audio.loadSource([\n\
    \"mySong.mp3\",\n\
    \"mySong.aac\",\n\
    \"mySong.ogg\"\n\
  ]).then(function(node){\n\
    node.connect(audio.context.destination);\n\
  });"
      }, {
        name: "Load an ambient audio file that should be looped.",
        description: "The only audio option that is available is whether or not the audio file should be looped. You specify this with the second parameter to the `loadSource()` method, a `Boolean` value to indicate that looping is desired.\n\
\n\
  grammar(\"JavaScript\");\n\
  var audio = new Primrose.Output.Audio3D();\n\
  audio.loadSource([\n\
    \"mySong.mp3\",\n\
    \"mySong.aac\",\n\
    \"mySong.ogg\"\n\
  ], true).then(function(node){\n\
    node.connect(audio.context.destination);\n\
  });"
      }]
    });
pliny.function({
  parent: "Primrose.HTTP",
  name: "getBuffer",
  description: "Get an ArrayBuffer from a server.",
  returns: "Promise",
  parameters: [{
    name: "url",
    type: "String",
    description: "The resource to which the request is being sent."
  }, {
    name: "options",
    type: "Primrose.HTTP.XHR.optionsHash",
    optional: true,
    description: "Options for passing data or tracking progress. See [`Primrose.HTTP.XHR.optionsHash`](#Primrose_HTTP_XHR_optionsHash) for more information."
  }],
  examples: [{
    name: "Make a GET request for an ArrayBuffer.",
    description: `Use this to load audio files and do whatever you want with them.

## Code:

  grammar("JavaScript");
  var context = new AudioContext();
  Primrose.HTTP.getBuffer("audio.mp3",
    console.log.bind(console, "progress"));,
    function(buffer){
      context.decodeAudioData(
        buffer,
        console.log.bind(console, "success"),
        console.error.bind(console, "error decoding"));
    },
    console.error.bind(console, "error loading")\n`
  }]
});
pliny.function({
  parent: "Primrose.HTTP",
  name: "get",
  description: "Process an HTTP GET request.",
  returns: "Promise",
  parameters: [{
    name: "type",
    type: "String",
    description: `How the response should be interpreted. One of ["text", "json", "arraybuffer"]. See the [MDN - XMLHttpRequest - responseType](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#xmlhttprequest-responsetype).`,
    default: `"text"`
  }, {
    name: "url",
    type: "String",
    description: "The resource to which the request is being sent."
  }, {
    name: "options",
    type: "Primrose.HTTP.XHR.optionsHash",
    optional: true,
    description: "Options for passing data or tracking progress. See [`Primrose.HTTP.XHR.optionsHash`](#Primrose_HTTP_XHR_optionsHash) for more information."
  }],
  examples: [{
    name: "Make a GET request.",
    description: `Typically, you would use one of the other functions in the Primrose.HTTP namespace, but the XHR function is provided as a fallback in case those others do not meet your needs.

## Code:

    grammar("JavaScript");
    Primrose.HTTP.get("json", "localFile.json",
      console.log.bind(console, "progress"),
      console.log.bind(console, "done"),
      console.error.bind(console));

## Results:
> Object {field1: 1, field2: "Field2"}`
  }]
});
pliny.function({
  parent: "Primrose.HTTP",
  name: "XHR",
  description: "Wraps up the XMLHttpRequest object into a workflow that is easier for me to handle: a single function call. Can handle both GETs and POSTs, with or  without a payload.",
  returns: "Promise",
  parameters: [{
    name: "method",
    type: "String",
    description: "The HTTP Verb being used for the request."
  }, {
    name: "type",
    type: "String",
    description: `How the response should be interpreted. One of ["text", "json", "arraybuffer"]. See the [MDN - XMLHttpRequest - responseType](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#xmlhttprequest-responsetype).`,
    default: `"text"`
  }, {
    name: "url",
    type: "String",
    description: "The resource to which the request is being sent."
  }, {
    name: "options",
    type: "Primrose.HTTP.XHR.optionsHash",
    optional: true,
    description: "Options for passing data or tracking progress. See [`Primrose.HTTP.XHR.optionsHash`](#Primrose_HTTP_XHR_optionsHash) for more information."
  }],
  examples: [{
    name: "Make a GET request.",
    description: `Typically, you would use one of the other functions in the Primrose.HTTP namespace, but the XHR function is provided as a fallback in case those others do not meet your needs.

## Code:

    grammar("JavaScript");
    Primrose.HTTP.XHR("GET", "json", "localFile.json", {
      progress: console.log.bind(console, "progress"))
      .then(console.log.bind(console, "done")))
      .catch(console.error.bind(console));

## Results:
> Object {field1: 1, field2: "Field2"}`
  }]
});
pliny.record({
  parent: "Primrose.HTTP.XHR",
  name: "optionsHash",
  description: "Options for passing data or tracking progress.",
  parameters: [{
    name: "data",
    type: "Object",
    optional: true,
    description: "The data object to use as the request body payload, if this is a POST request."
  }, {
    name: "progress",
    type: "Function",
    optional: true,
    description: "A callback function to use for tracking progress. The callback function should accept a standard [`ProgressEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent)."
  }]
});
pliny.function({
  parent: "Primrose.DOM",
  name: "cascadeElement",
  returns: "Element",
  parameters: [{
    name: "id",
    type: "(String|Element)",
    description: "A vague reference to the element. Either a String id where the element can be had, a String id to give a newly created element if it does not exist, or an Element to manipulate and validate"
  }, {
    name: "tag",
    type: "String",
    description: "The HTML tag name of the element we are finding/creating/validating."
  }, {
    name: "DOMClass",
    type: "Class",
    description: "The class Function that is the type of element that we are frobnicating."
  }],
  description: "* If `id` is a string, tries to find the DOM element that has said ID\n\
  * If it exists, and it matches the expected tag type, returns the element, or throws an error if validation fails.\n\
  * If it doesn't exist, creates it and sets its ID to the provided id, then returns the new DOM element, not yet placed in the document anywhere.\n\
* If `id` is a DOM element, validates that it is of the expected type,\n\
  * returning the DOM element back if it's good,\n\
  * or throwing an error if it is not\n\
* If `id` is null, creates the DOM element to match the expected type.",
  examples: [{
    name: "Get an element by ID that already exists.",
    description: "Assuming the following HTML snippet:\n\
\n\
    grammar(\"HTML\");\n\
    <div>\n\
      <div id=\"First\">first element</div>\n\
      <section id=\"second-elem\">\n\
        Second element\n\
        <img id=\"img1\" src=\"img.png\">\n\
      </section>\n\
    </div>\n\
\n\
## Code:\n\
\n\
    grammar(\"JavaScript\");\n\
    var elem = Primrose.DOM.cascadeElement(\"second-elem\", \"section\", HTMLElement);\n\
    console.assert(elem.textContent === \"Second element\");"
  }, {
    name: "Validate the tag type.",
    description: "Assuming the following HTML snippet:\n\
\n\
    grammar(\"HTML\");\n\
    <div>\n\
      <div id=\"First\">first element</div>\n\
      <section id=\"second-elem\">\n\
        Second element\n\
        <img id=\"img1\" src=\"img.png\">\n\
      </section>\n\
    </div>\n\
\n\
## Code:\n\
\n\
    grammar(\"JavaScript\");\n\
    //The following line of code should cause a runtime error.\n\
    Primrose.DOM.cascadeElement(\"img1\", \"section\", HTMLElement);"
  }, {
    name: "Create an element.",
    description: "Assuming the following HTML snippet:\n\
\n\
    grammar(\"HTML\");\n\
    <div>\n\
      <div id=\"First\">first element</div>\n\
      <section id=\"second-elem\">\n\
        Second element\n\
        <img id=\"img1\" src=\"img.png\">\n\
      </section>\n\
    </div>\n\
\n\
## Code:\n\
\n\
    grammar(\"JavaScript\");\n\
    var elem = Primrose.DOM.cascadeElement(\"img2\", \"img\", HTMLImageElement);\n\
    console.assert(elem.id === \"img2\");\n\
    console.assert(elem.parentElement === null);\n\
    document.body.appendChild(elem);\n\
    console.assert(elem.parentElement === document.body);"
  }]
});
pliny.error({
      parent: "Primrose.DOM.cascadeElement",
      name: "Invalid element",
      type: "Error",
      description: "If the element could not be found, could not be created, or one of the appropriate ID was found but did not match the expected type, an error is thrown to halt operation."
    });
pliny.class({
  parent: "Primrose.Output",
    name: "Music",
    description: "| [under construction]"
});
pliny.class({
  parent: "Primrose.Output",
    name: "Note",
    description: "| [under construction]"
});
pliny.class({
  parent: "Primrose.Output",
    name: "PositionalSound",
    description: "| [under construction]"
});
pliny.class({
  parent: "Primrose.Output",
    name: "Sound",
    description: "| [under construction]"
});
pliny.class({
  parent: "Primrose.Output",
    name: "Speech",
    description: "| [under construction]"
});
pliny.class({
  parent: "Primrose",
  name: "BrowserEnvironment",
  description: "Make a Virtual Reality app in your web browser!\n\
\n\
The `BrowserEnvironment` class provides a plethora of options for setting up new scenes and customizing the VR experience to your system. It is the starting point for all of your projects. It is named `BrowserEnvironment` as one day their may be an `AltspaceVREnvironment` or a `HiFidelityEnvironment`.",
  parameters: [{
    name: "options",
    type: "Primrose.BrowserEnvironment.optionsHash",
    description: "Settings to change how the environment looks and behaves. See [`Primrose.BrowserEnvironment.optionsHash`](#Primrose_BrowserEnvironment_optionsHash) for more information."
  }]
});
pliny.record({
  parent: "Primrose.BrowserEnvironment",
  name: "optionsHash",
  description: "Settings to change how the environment looks and behaves.",
  parameters: [{
    name: "antialias",
    type: "Boolean",
    optional: true,
    default: true,
    description: "Enable or disable anti-aliasing"
  }, {
    name: "quality",
    type: "Primrose.Constants.Quality",
    optional: true,
    default: "Primrose.Constants.Quality.MAXIMUM",
    description: "The quality level at which to start rendering."
  }, {
    name: "fullScreenButtonContainer",
    type: "String",
    optional: true,
    description: "A DOM query selector that, if provided, will have buttons added to it for each of the fullscreen modes."
  }, {
    name: "useGaze",
    type: "Boolean",
    optional: true,
    description: "Whether or not to used timed ring cursors."
  }, {
    name: "useFog",
    type: "Boolean",
    optional: true,
    description: "Whether or not to use fog in the scene to limit view distance."
  }, {
    name: "avatarHeight",
    type: "Number",
    optional: true,
    default: 1.65,
    description: "The default height of the user's avatar, if the VR system doesn't provide a height."
  }, {
    name: "walkSpeed",
    type: "Number",
    optional: true,
    default: 2,
    description: "The number of meters per second at which the user runs."
  }, {
    name: "disableKeyboard",
    type: "Boolean",
    optional: true,
    description: "Set to true to disable keyboard-based input."
  }, {
    name: "enableShadows",
    type: "Boolean",
    optional: true,
    description: "Set to true to enable the use of shadows on objects in the scene."
  }, {
    name: "shadowMapSize",
    type: "Number",
    optional: true,
    default: 1024,
    description: "The size to use for the width and height of the shadow map that will be generated."
  }, {
    name: "shadowRadius",
    type: "Number",
    optional: true,
    default: 1,
    description: "The number of pixels of blurring to perform at the edge of the shadows."
  }, {
    name: "progress",
    type: "Function",
    optional: true,
    description: "Callback function for recording model download progress."
  }, {
    name: "gravity",
    type: "Number",
    optional: true,
    default: 9.8,
    description: "The acceleration applied to falling objects."
  }, {
    name: "gazeLength",
    type: "Number",
    optional: true,
    default: 1.5,
    description: "The amount of time in seconds to require gazes on objects before triggering the gaze event."
  }, {
    name: "disableMirroring",
    type: "Boolean",
    optional: true,
    description: "By default, what we see in the VR view will get mirrored to a regular view on the primary screen. Set to true to improve performance."
  }, {
    name: "disableMotion",
    type: "Boolean",
    optional: true,
    description: "By default, mobile devices have a motion sensor that can be used to update the view. Set to true to disable motion tracking."
  }, {
    name: "disableDefaultLighting",
    type: "Boolean",
    optional: true,
    description: "By default, a single light is added to the scene,"
  }, {
    name: "backgroundColor",
    type: "Number",
    optional: true,
    default: 0xafbfff,
    description: "The color that WebGL clears the background with before drawing."
  }, {
    name: "skyTexture",
    type: "String or Array of String",
    optional: true,
    description: "The texture(s) to use for the sky."
  }, {
    name: "groundTexture",
    type: "String",
    optional: true,
    description: "The texture to use for the ground."
  }, {
    name: "groundModel",
    type: "String",
    optional: true,
    description: "A model file to use for the ground."
  }, {
    name: "nearPlane",
    type: "Number",
    optional: true,
    default: 0.01,
    description: "The near plane of the camera."
  }, {
    name: "drawDistance",
    type: "Number",
    optional: true,
    default: 100,
    description: "The distance from the near plane to the far plane of the camera."
  }, {
    name: "defaultFOV",
    type: "Number",
    optional: true,
    default: 75,
    description: "The field of view to use in non-VR settings."
  }, {
    name: "ambientSound",
    type: "String",
    optional: true,
    description: "The sound to play on loop in the background."
  }, {
    name: "canvasElement",
    type: "HTMLCanvasElement",
    optional: true,
    default: "frontBuffer",
    description: "HTML5 canvas element to which to render, if one had already been created."
  }, {
    name: "renderer",
    type: "THREE.WebGLRenderer",
    optional: true,
    description: "Three.js renderer, if one had already been created."
  }, {
    name: "context",
    type: "WebGLRenderingContext",
    optional: true,
    description: "A WebGL context to use, if one had already been created."
  }, {
    name: "scene",
    type: "THREE.Scene",
    optional: true,
    description: "Three.js scene, if one had already been created."
  }, {

    name: "nonstandardNeckLength",
    type: "Number",
    optional: true,
    description: "When creating a neck model, this is how high the neck runs. This is an experimental feature for setting the height of a user's \"neck\" on orientation-only systems (such as Google Cardboard and Samsung Gear VR) to create a more realistic feel."
  }, {
    name: "nonstandardNeckDepth",
    type: "Number",
    optional: true,
    description: "When creating a neck model, this is the distance from the center meridian of the neck to the eyes."
  }, {
    name: "showHeadPointer",
    type: "Boolean",
    optional: true,
    default: true,
    description: "Whether or not to show a pointer tracking the gaze direction."
  }, {
    name: "nonstandardIPD",
    type: "Number",
    optional: true,
    description: "When creating a neck model, this is the how far apart to set the eyes. I highly suggest you don't go down the road that requires setting this. I will not help you understand what it does, because I would rather you just not use it."
  }]
});
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "options",
      type: "Object",
      description: "A manager for messages sent across the network."
    });
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "network",
      type: "Primrose.Network.Manager",
      description: "A manager for messages sent across the network."
    });
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "audioQueue",
      type: "Array",
      description: "Remote user Audio elements that joined as peers before the `BrowserEnvironment` could finish loading all of the assets."
    });
pliny.method({
      parent: "Primrose.BrowserEnvironment",
      name: "zero",
      description: "Zero and reset sensor data."
    });
pliny.event({
            parent: "Primrose.BrowserEnvironment",
            name: "update",
            description: "Fires after every animation update."
          });
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "turns",
      type: "Util.Angle",
      description: "A slewing angle that loosely follows the user around."
    });
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "factories",
      type: "Object",
      description: "A database of object factories, generally used to create 3D models."
    });
pliny.property({
          parent: "Primrose.BrowserEnvironment",
          name: "buttonFactory",
          type: "Primrose.Controls.ButtonFactory",
          description: "A factory for creating the geometry for individual 3D buttons whenever they are needed."
        })
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "speech",
      type: "Primrose.Audio.Speech",
      description: "A text-2-speech system."
    });
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "audio",
      type: "Primrose.Audio.Audio3D",
      description: "An audio graph that keeps track of 3D information."
    });
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "music",
      type: "Primrose.Audio.Music",
      description: "A primitive sort of synthesizer for making simple music."
    });
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "currentControl",
      type: "Primrose.Control.Entity",
      description: "The currently selected control, by a user-click or some other function."
    });
pliny.method({
      parent: "Primrose.BrowserEnvironment",
      name: "fadeOut",
      returns: "Promise",
      description: "Causes the fully rendered view fade out to the color provided `options.backgroundColor`"
    });
pliny.method({
      parent: "Primrose.BrowserEnvironment",
      name: "fadeIn",
      returns: "Promise",
      description: "Causes the faded out cube to disappear."
    });
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "teleportAvailable",
      type: "Boolean",
      description: "Returns true when the system is not currently fading out or in.`"
    });
pliny.method({
      parent: "Primrose.BrowserEnvironment",
      name: "transition",
      returns: "Promise",
      description: "Perform an action in between a fade-out and a fade-in. Useful for hiding actions that might cause the view update to freeze, so the user doesn't get sick.",
      parameters: [{
        name: "thunk",
        type: "Function",
        description: "A callback function, to be executed between the fade-out and fade-in effects."
      }]
    });
pliny.method({
      parent: "Primrose.BrowserEnvironment",
      name: "teleport",
      returns: "Promise",
      description: "Move the user to a position, using the fade-out/fade-in transition effect.",
      parameters: [{
        name: "pos",
        type: "THREE.Vector3",
        description: "The point at which to move the user."
      }, {
        name: "immediate",
        type: "Boolean",
        optional: true,
        default: false,
        description: "If true, skips the transition effect."
      }]
    });
pliny.method({
      parent: "Primrose.BrowserEnvironment",
      name: "consumeEvent",
      description: "Handles pointer interactions and differentiates between teleportation and selecting controls on the screen.",
      parameters: [{
        name: "evt",
        type: "Event",
        description: "A pointer click event that triggered."
      }]
    });
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "physics",
      type: "CANNON.World",
      description: "The physics subsystem."
    });
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "scene",
      type: "THREE.Scene",
      description: "The 3D scene that gets displayed to the user."
    });
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "camera",
      type: "THREE.PerspectiveCamera",
      description: "The camera used to render the view."
    });
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "sky",
      type: "THREE.Object3D",
      description: "If a `skyTexture` option is provided, it will be a texture cube or photosphere. If no `skyTexture` option is provided, there will only be a THREE.Object3D, to create an anchor point on which implementing scripts can add objects that follow the user's position."
    });
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "ground",
      type: "THREE.Object3D",
      description: "If a `groundTexture` option is provided, it will be a flat plane extending to infinity. As the user moves, the ground will shift under them by whole texture repeats, making the ground look infinite."
    });
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "ui",
      type: "THREE.Object3D",
      description: "An anchor point on which objects can be added that follows the user around in both position and orientation. The orientation lags following the user, so if the UI is ever in the way, the user can turn slightly and it won't follow them."
    });
pliny.method({
      parent: "Primrose.BrowserEnvironment",
      name: "goFullScreen",
      returns: "Promise",
      description: "Enter full-screen mode on one of the available displays. NOTE: due to a defect in iOS, this feature is not available on iPhones or iPads."
    });
pliny.method({
      parent: "Primrose.BrowserEnvironment",
      name: "start",
      returns: "Promise",
      description: "Restart animation after it has been stopped."
    });
pliny.method({
      parent: "Primrose.BrowserEnvironment",
      name: "stop",
      description: "Pause animation.",
      parameters: [ {
        name: "evt",
        type: "Event",
        optional: true,
        default: null,
        description: "The event that triggered this function."
      }, {
        name: "restartAllowed",
        type: "Boolean",
        optional: true,
        default: false,
        description: "Whether or not calling `start()` again is allowed, or if this is a permanent stop."
      } ]
    });
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "renderer",
      type: "THREE.WebGLRenderer",
      description: "The Three.js renderer being used to draw the scene."
    });
pliny.event({
        parent: "Primrose.BrowserEnvironment",
        name: "select",
        description: "Fired when an object has been selected, either by a physical cursor or a gaze-based cursor. You will typically want to use this instead of pointerend or gazecomplete."
      });
pliny.event({
        parent: "Primrose.BrowserEnvironment",
        name: "pointerstart",
        description: "Fired when mouse, gamepad, or touch-based pointers have their trigger buttons depressed."
      });
pliny.event({
        parent: "Primrose.BrowserEnvironment",
        name: "pointerend",
        description: "Fired when mouse, gamepad, or touch-based pointers have their trigger buttons released."
      });
pliny.event({
        parent: "Primrose.BrowserEnvironment",
        name: "pointermove",
        description: "Fired when mouse, gamepad, or touch-based pointers are moved away from where they were last frame."
      });
pliny.event({
        parent: "Primrose.BrowserEnvironment",
        name: "gazestart",
        description: "Fired when a gaze-based cursor starts spinning on a selectable object."
      });
pliny.event({
        parent: "Primrose.BrowserEnvironment",
        name: "gazemove",
        description: "Fired when a gaze-based cursor moves across an object that it is attempting to select."
      });
pliny.event({
        parent: "Primrose.BrowserEnvironment",
        name: "gazecomplete",
        description: "Fired when a gaze-based cursor finishes spinning on a selectable object."
      });
pliny.event({
        parent: "Primrose.BrowserEnvironment",
        name: "gazecancel",
        description: "Fired when a gaze-based cursor is moved off of the object it is attempting to select before it can finish spinning."
      });
pliny.event({
        parent: "Primrose.BrowserEnvironment",
        name: "exit",
        description: "Fired when a pointer leaves an object."
      });
pliny.event({
        parent: "Primrose.BrowserEnvironment",
        name: "enter",
        description: "Fired when a pointer hovers over an object."
      });
pliny.event({
          parent: "Primrose.BrowserEnvironment",
          name: "ready",
          description: "Fires after the initial assets have been downloaded and the scene initialized, just before animation starts."
        });
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "quality",
      type: "Primrose.Constants.Quality",
      description: "The current render quality."
    });
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "lockMovement",
      type: "Boolean",
      description: "True if the user is focused on a text box control. If the user is focused on a text box control, keyboard commands should not move their position."
    });
pliny.method({
      parent: "Primrose.BrowserEnvironment",
      name: "connect",
      description: "Connect to a server at a WebSocket using a specific userName. NOTE: this does not handle authentication or authorization. You must handle those tasks yourself. This only binds an authenticated WebSocket connection to the framework so the framework may use it to transmit user state.",
      parameters: [{
        name: "socket",
        type: "WebSocket",
        description: "The socket connecting us to the server."
      }, {
        name: "userName",
        type: "String",
        description: "The name of the user being connected."
      }]
    });
pliny.method({
      parent: "Primrose.BrowserEnvironment",
      name: "disconnect",
      description: "Disconnect from the server."
    });
pliny.property({
      parent: "Primrose.BrowserEnvironment",
      name: "displays",
      type: "Array of BaseVRDisplay",
      description: "The VRDisplays available on the system."
    });
pliny.method({
      parent: "Primrose.BrowserEnvironment",
      name: "setAudioFromUser",
      description: "When using a 3D-party voice chat provider, this method associates the `HTMLVideoElement` or `HTMLAudioElement` created by the chat provider with the remote user, so that their audio may be spatialized with their position.",
      parameters: [{
        name: "userName",
        type: "String",
        description: "The name of the user to which to add the audio."
      }, {
        name: "audioElement",
        type: "HTMLAudioElement or HTMLVideoElement",
        description: "The DOM element that represents the user's audio."
      }]
    });
pliny.method({
      parent: "Primrose.BrowserEnvironment",
      name: "insertFullScreenButtons",
      description: "Add the default UI for managing full screen state.",
      returns: "Array of `HTMLButtonElement`s",
      parameters: [{
        name: "containerSpec",
        type: "String",
        description: "A query selector for the DOM element to which to add the buttons."
      }]
    });
pliny.class({
  parent: "Primrose",
  name: "Pointer",
  description: "An object that points into the scene somewhere, casting a ray at objects for picking operations.",
  parameters: [{
    name: "pointerName",
    type: "String",
    description: "A friendly name for this pointer object, to make debugging easier."
  }, {
    name: "color",
    type: "Number",
    description: "The color to use to render the teleport pad and 3D pointer cursor."
  }, {
    name: "highlight",
    type: "Number",
    description: "The color to use to highlight the teleport pad and 3D pointer cursor when it's pointing at a real thing."
  }, {
    name: "devices",
    type: "Array",
    description: "An Array of `Primrose.InputProcessor` objects that define the orientation for this pointer."
  }, {
    name: "triggerDevices",
    type: "Array",
    description: "An Array of `Primrose.InputProcessor` objects that define the button trigger for this pointer.",
    optional: true,
    default: null
    }]
});
pliny.enumeration({
  parent: "Primrose",
  name: "Keys",
  description: "Keycode values for system keys that are the same across all international standards"
});
pliny.class({
  parent: "Primrose.Controls",
  name: "Button2D",
  baseClass: "Primrose.Controls.Label",
  description: "A simple button to put on a Surface.",
  parameters: [{
    name: "idOrCanvasOrContext",
    type: "String or HTMLCanvasElement or CanvasRenderingContext2D",
    description: "Either an ID of an element that exists, an element, or the ID to set on an element that is to be created."
  }, {
    name: "options",
    type: "Object",
    description: "Named parameters for creating the Button."
  }]
});
pliny.class({
  parent: "Primrose.Controls",
  name: "Label",
  description: "A simple label of text to put on a Surface.",
  baseClass: "Primrose.Controls.Surface",
  parameters: [{
    name: "idOrCanvasOrContext",
    type: "String or HTMLCanvasElement or CanvasRenderingContext2D",
    description: "Either an ID of an element that exists, an element, or the ID to set on an element that is to be created."
  }, {
    name: "options",
    type: "Object",
    description: "Named parameters for creating the Button."
  }]
});
pliny.class({
  parent: "Primrose.Controls",
  name: "Surface",
  baseClass: "Primrose.Controls.BaseTextured",
  description: "Cascades through a number of options to eventually return a CanvasRenderingContext2D object on which one will perform drawing operations.",
  parameters: [{
    name: "options",
    type: "Primrose.Controls.Surface.optionsHash",
    optional: true,
    description: "Optional settings for creating the surface, including ID and Bounds. See [`Primrose.Controls.Surface.optionsHash`](#Primrose_Controls_Surface_optionsHash) for more information."
  }]
});
pliny.record({
  parent: "Primrose.Controls.Surface",
  name: "optionsHash",
  parameters: [{
    name: "id",
    type: "String or HTMLCanvasElement or CanvasRenderingContext2D",
    description: "Either an ID of an element that exists, an element, or the ID to set on an element that is to be created."
  }, {
    name: "bounds",
    type: "Primrose.Text.Rectangle",
    description: "The size and location of the surface to create."
  }]
});
pliny.event({ parent: "Primrose.Controls.Surface", name: "focus", description: "If the element is focusable, occurs when the user clicks on an element for the first time, or when a program calls the `focus()` method." });
pliny.event({ parent: "Primrose.Controls.Surface", name: "blur", description: "If the element is focused (which implies it is also focusable), occurs when the user clicks off of an element, or when a program calls the `blur()` method." });
pliny.event({ parent: "Primrose.Controls.Surface", name: "click", description: "Occurs whenever the user clicks on an element." });
pliny.event({ parent: "Primrose.Controls.Surface", name: "keydown", description: "Occurs when the user pushes a key down while focused on the element." });
pliny.event({ parent: "Primrose.Controls.Surface", name: "keyup", description: "Occurs when the user releases a key while focused on the element." });
pliny.event({ parent: "Primrose.Controls.Surface", name: "paste", description: "Occurs when the user activates the clipboard's `paste` command while focused on the element." });
pliny.event({ parent: "Primrose.Controls.Surface", name: "cut", description: "Occurs when the user activates the clipboard's `cut` command while focused on the element." });
pliny.event({ parent: "Primrose.Controls.Surface", name: "copy", description: "Occurs when the user activates the clipboard's `copy` command while focused on the element." });
pliny.event({ parent: "Primrose.Controls.Surface", name: "wheel", description: "Occurs when the user scrolls the mouse wheel while focused on the element." });
pliny.error({
        parent: "Primrose.Controls.Surface",
        name: "Invalid element",
        type: "Error",
        description: "If the element could not be found, could not be created, or one of the appropriate ID was found but did not match the expected type, an error is thrown to halt operation."
      });
pliny.property({
      parent: "Primrose.Controls.Surface",
      name: "focused",
      type: "Boolean",
      description: "A flag indicating if the element, or a child element within it, has received focus from the user."
    });
pliny.property({
      parent: "Primrose.Controls.Surface",
      name: "focusable",
      type: "Boolean",
      description: "A flag indicating if the element, or any child elements within it, is capable of receiving focus."
    });
pliny.method({
      parent: "Primrose.Controls.Surface",
      name: "startUV",
      parameters: [{
        name: "evt",
        type: "Event",
        description: "The pointer event to read"
      }],
      description: "Hooks up to the window's `mouseDown` and `touchStart` events, with coordinates translated to tangent-space UV coordinates, and propagates it to any of its focused subSurfaces."
    });
pliny.method({
      parent: "Primrose.Controls.Surface",
      name: "moveUV",
      parameters: [{
        name: "evt",
        type: "Event",
        description: "The pointer event to read"
      }],
      description: "Hooks up to the window's `mouseMove` and `touchMove` events, with coordinates translated to tangent-space UV coordinates, and propagates it to any of its focused subSurfaces."
    });
pliny.method({
      parent: "Primrose.Controls.Surface",
      name: "endPointer",
      description: "Hooks up to the window's `mouseUp` and `toucheEnd` events and propagates it to any of its focused subSurfaces."
    });
pliny.method({
      parent: "Primrose.Controls.Surface",
      name: "focus",
      description: "If the control is focusable, sets the focus property of the control, does not change the focus property of any other control.",
      examples: [{
        name: "Focus on one control, blur all the rest",
        description: "When we have a list of controls and we are trying to track focus between them all, we must coordinate calls between `focus()` and `blur()`.\n\
\n\
  grammar(\"JavaScript\");\n\
  var ctrls = [\n\
  new Primrose.Controls.TextBox(),\n\
  new Primrose.Controls.TextBox(),\n\
  new Primrose.Controls.Button()\n\
  ];\n\
  \n\
  function focusOn(id){\n\
    for(var i = 0; i < ctrls.length; ++i){\n\
      var c = ctrls[i];\n\
      if(c.controlID === id){\n\
        c.focus();\n\
      }\n\
      else{\n\
        c.blur();\n\
      }\n\
    }\n\
  }"
      }]
    });
pliny.method({
      parent: "Primrose.Controls.Surface",
      name: "blur",
      description: "If the element is focused, unsets the focus property of the control and all child controls. Does not change the focus property of any parent or sibling controls.",
      examples: [{
        name: "Focus on one control, blur all the rest",
        description: "When we have a list of controls and we are trying to track focus between them all, we must coordinate calls between `focus()` and `blur()`.\n\
\n\
  grammar(\"JavaScript\");\n\
  var ctrls = [\n\
  new Primrose.Controls.TextBox(),\n\
  new Primrose.Controls.TextBox(),\n\
  new Primrose.Controls.Button()\n\
  ];\n\
  \n\
  function focusOn(id){\n\
    for(var i = 0; i < ctrls.length; ++i){\n\
      var c = ctrls[i];\n\
      if(c.controlID === id){\n\
        c.focus();\n\
      }\n\
      else{\n\
        c.blur();\n\
      }\n\
    }\n\
  }"
      }]
    });
pliny.property({
      parent: "Primrose.Controls.Surface",
      name: "theme",
      type: "Primrose.Text.Themes.*",
      description: "Get or set the theme used for rendering text on any controls in the control tree."
    });
pliny.property({
      parent: "Primrose.Controls.Surface",
      name: "lockMovement",
      type: "Boolean",
      description: "Recursively searches the deepest leaf-node of the control graph for a control that has its `lockMovement` property set to `true`, indicating that key events should not be used to navigate the user, because they are being interpreted as typing commands."
    });
pliny.property({
      parent: "Primrose.Controls.Surface",
      name: "focusedElement",
      type: "Primrose.Controls.Surface",
      description: "Searches the deepest leaf-node of the control graph for a control that has its `focused` property set to `true`."
    });
pliny.method({
      parent: "Primrose.Controls.Surface",
      name: "keyDown",
      parameters: [{
        name: "evt",
        type: "Event",
        description: "The key event to read"
      }],
      description: "Hooks up to the window's `keyDown` event and propagates it to any of its focused subSurfaces."
    });
pliny.method({
      parent: "Primrose.Controls.Surface",
      name: "keyUp",
      parameters: [{
        name: "evt",
        type: "Event",
        description: "The key event to read"
      }],
      description: "Hooks up to the window's `keyUp` event and propagates it to any of its focused subSurfaces."
    });
pliny.method({
      parent: "Primrose.Controls.Surface",
      name: "readClipboard",
      parameters: [{
        name: "evt",
        type: "Event",
        description: "The clipboard event to read"
      }],
      description: "Hooks up to the clipboard's `paste` event and propagates it to any of its focused subSurfaces."
    });
pliny.method({
      parent: "Primrose.Controls.Surface",
      name: "copySelectedText",
      parameters: [{
        name: "evt",
        type: "Event",
        description: "The clipboard event to read"
      }],
      description: "Hooks up to the clipboard's `copy` event and propagates it to any of its focused subSurfaces."
    });
pliny.method({
      parent: "Primrose.Controls.Surface",
      name: "cutSelectedText",
      parameters: [{
        name: "evt",
        type: "Event",
        description: "The clipboard event to read"
      }],
      description: "Hooks up to the clipboard's `cut` event and propagates it to any of its focused subSurfaces."
    });
pliny.method({
      parent: "Primrose.Controls.Surface",
      name: "readWheel",
      parameters: [{
        name: "evt",
        type: "Event",
        description: "The wheel event to read"
      }],
      description: "Hooks up to the window's `wheel` event and propagates it to any of its focused subSurfaces."
    });
pliny.class({
  parent: "Primrose.Text",
    name: "Rectangle",
    description: "| [under construction]"
});
pliny.class({
  parent: "Primrose.Text",
    name: "Point",
    description: "| [under construction]"
});
pliny.class({
  parent: "Primrose.Text",
    name: "Size",
    description: "| [under construction]"
});
pliny.record({
  parent: "Primrose.Text.Themes",
  name: "Default",
  description: "A light background with dark foreground text."
});
pliny.class({
  parent: "Primrose.Controls",
  name: "Button3D",
  baseClass: "Primrose.Controls.Entity",
  parameters: [{
    name: "model",
    type: "THREE.Object3D",
    description: "A 3D model to use as the graphics for this button."
  }, {
    name: "buttonName",
    type: "String",
    description: "A name for the button, to make it distinct from other buttons."
  }, {
    name: "options",
    type: "Object",
    description: "A hash of options:\n\t\t\tmaxThrow - The limit for how far the button can be depressed.\n\t\t\tminDeflection - The minimum distance the button must be depressed before it is activated.\n\t\t\tcolorPressed - The color to change the button cap to when the button is activated.\n\t\t\tcolorUnpressed - The color to change the button cap to when the button is deactivated.\n\t\t\ttoggle - True if deactivating the button should require a second click. False if the button should deactivate when it is released."
  }],
  description: "A 3D button control, with a separate cap from a stand that it sits on. You click and depress the cap on top of the stand to actuate."
});
pliny.event({
      parent: "Primrose.Controls.Button3D",
      name: "click",
      description: "Occurs when the button is activated."
    });
pliny.event({
      parent: "Primrose.Controls.Button3D",
      name: "release",
      description: "Occurs when the button is deactivated."
    });
pliny.property({
      parent: "Primrose.Controls.Button3D",
      name: "base",
      type: "THREE.Object3D",
      description: "The stand the button cap sits on."
    });
pliny.property({
      parent: "Primrose.Controls.Button3D",
      name: "base",
      type: "THREE.Object3D",
      description: "The moveable part of the button, that triggers the click event."
    });
pliny.property({
      parent: "Primrose.Controls.Button3D",
      name: "color",
      type: "Number",
      description: "The current color of the button cap."
    });
pliny.property({
      parent: "Primrose.Controls.Button3D",
      name: " name",
      type: "String",
      description: "A name for the button, to tell it from others when debugging."
    });
pliny.property({
      parent: "Primrose.Controls.Button3D",
      name: "element",
      type: "Element",
      optional: true,
      description: "If this 3D button was created from a copy of an HTMLButtonElement, this is that element."
    });
pliny.method({
      parent: "Primrose.Controls.Button3D",
      name: "startUV",
      description: "Handle a mouse-down event on a textured object.",
      parameters: [{
        name: "point",
        type: "Primrose.Text.Point",
        description: "The UV coordinate of the texture that was clicked."
      }]
    });
pliny.method({
      parent: "Primrose.Controls.Button3D",
      name: "endPointer",
      description: "Handle a mouse-up event on a textured object.",
      parameters: [{
        name: "evt",
        type: "Event",
        description: "Not actually used."
      }]
    });
pliny.method({
      parent: "Primrose.Controls.Button3D",
      name: "consumeEvent",
      description: "Route events.",
      parameters: [{
        name: "evt",
        type: "Event",
        description: "The event to route."
      }]
    });
pliny.record({
  parent: "Primrose.Controls.Button3D",
  name: "DEFAULTS",
  description: "Default option values that override undefined options passed to the Button3D class."
});
pliny.value({
  parent: "Primrose.Controls.Button3D.DEFAULTS",
  name: "maxThrow",
  type: "Number",
  description: "The limit for how far the button can be depressed."
});
pliny.value({
  parent: "Primrose.Controls.Button3D.DEFAULTS",
  name: "minDeflection",
  type: "Number",
  description: "The minimum distance the button must be depressed before it is activated."
});
pliny.value({
  parent: "Primrose.Controls.Button3D.DEFAULTS",
  name: "colorUnpressed",
  type: "Number",
  description: "The color to change the button cap to when the button is deactivated."
});
pliny.value({
  parent: "Primrose.Controls.Button3D.DEFAULTS",
  name: "colorPressed",
  type: "Number",
  description: "The color to change the button cap to when the button is activated."
});
pliny.value({
  parent: "Primrose.Controls.Button3D.DEFAULTS",
  name: "toggle",
  type: "Boolean",
  description: "True if deactivating the button should require a second click. False if the button should deactivate when it is released."
});
pliny.class({
  parent: "Primrose.Controls",
  name: "ButtonFactory",
  description: "Loads a model file and holds the data, creating clones of the data whenever a new button is desired.",
  parameters: [{
    name: "template",
    type: "THREE.Object3D",
    description: "A THREE.Object3D that specifies a 3D model for a button, to be used as a template."
  }, {
    name: "options",
    type: "Object",
    description: "The options to apply to all buttons that get created by the factory."
  }, {
    name: "complete",
    type: "Function",
    description: "A callback function to indicate when the loading process has completed, if `templateFile` was a String path."
  }]
});
pliny.property({
      parent: "Primrose.Controls.Button3D",
      name: "options",
      type: "Object",
      description: "The options that the user provided, so that we might change them after the factory has been created, if we so choose."
    });
pliny.property({
      parent: "Primrose.Controls.Button3D",
      name: "template",
      type: "THREE.Object3D",
      description: "The 3D model for the button, that will be cloned every time a new button is created."
    });
pliny.method({
      parent: "Primrose.ButtonFactory",
      name: "create",
      description: "Clones all of the geometry, materials, etc. in a 3D model to create a new copy of it. This really should be done with instanced objects, but I just don't have the time to deal with it right now.",
      parameters: [{
        name: "toggle",
        type: "Boolean",
        description: "True if the new button should be a toggle button (requiring additional clicks to deactivate) or a regular button (deactivating when the button is released, aka \"momentary\"."
      }],
      return: "The cloned button that which we so desired."
    });
pliny.class({
  parent: "Primrose.Controls",
  name: "Image",
  baseClass: "Primrose.Controls.BaseTextured",
  description: "A simple 2D image to put on a Surface.",
  parameters: [{
    name: "options",
    type: "Object",
    description: "Named parameters for creating the Image."
  }]
});
pliny.class({
  parent: "Primrose",
    name: "ModelFactory",
    description: "Creates an interface for cloning 3D models loaded from files, to instance those objects.\n\
\n\
> NOTE: You don't instantiate this class directly. Call `ModelFactory.loadModel`.",
    parameters: [{
      name: "template",
      type: "THREE.Object3D",
      description: "The 3D model to make clonable."
    }],
    examples: [{
      name: "Load a basic model.",
      description: "When Blender exports the Three.js JSON format, models are treated as full scenes, essentially making them scene-graph sub-trees. Instantiating a Primrose.Controls.ModelFactory object referencing one of these model files creates a factory for that model that we can use to generate an arbitrary number of copies of the model in our greater scene.\n\
\n\
## Code:\n\
\n\
  grammar(\"JavaScript\");\n\
  // Create the scene where objects will go\n\
  var scene = new THREE.Scene(),\n\
   \n\
  // Load up the file, optionally \"check it out\"\n\
    modelFactory = new Primrose.loadModel(\"path/to/model.json\", console.log.bind(console, \"Progress:\"))\n\
    .then(function(model){\n\
      model.template.traverse(function(child){\n\
        // Do whatever you want to the individual child objects of the scene.\n\
      });\n\
   \n\
    // Add copies of the model to the scene every time the user hits the ENTER key.\n\
    window.addEventListener(\"keyup\", function(evt){\n\
      // If the template object exists, then the model loaded successfully.\n\
      if(evt.keyCode === 10){\n\
        scene.add(model.clone());\n\
      }\n\
    });\n\
  })\n\
  .catch(console.error.bind(console));"
    }]
});
pliny.function({
      parent: "Primrose.Controls.ModelFactory",
      name: "loadObject",
      description: "Asynchronously loads a JSON, OBJ, or MTL file as a Three.js object. It processes the scene for attributes, creates new properties on the scene to give us\n\
    faster access to some of the elements within it. It uses callbacks to tell you when loading progresses. It uses a Promise to tell you when it's complete, or when an error occurred.\n\
    Useful for one-time use models.",
      returns: "Promise",
      parameters: [{
        name: "src",
        type: "String",
        description: "The file from which to load."
      }, {
        name: "type",
        type: "String",
        optional: true,
        description: "The type of the file--JSON, FBX, OJB, or STL--if it can't be determined from the file extension."
      }, {
        name: "progress",
        type: "Function",
        optional: true,
        description: "A callback function to use for tracking progress. The callback function should accept a standard [`ProgressEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent)."
      }],
      examples: [{
        name: "Load a basic model.",
        description: "When Blender exports the Three.js JSON format, models are treated as full scenes, essentially making them scene-graph sub-trees. Instantiating a Primrose.Controls.ModelFactory object referencing one of these model files creates a factory for that model that we can use to generate an arbitrary number of copies of the model in our greater scene.\n\
    \n\
    ## Code:\n\
    \n\
      grammar(\"JavaScript\");\n\
      // Create the scene where objects will go\n\
      var renderer = new THREE.WebGLRenderer(),\n\
          currentScene = new THREE.Scene(),\n\
          camera = new THREE.PerspectiveCamera();\n\
       \n\
      // Load up the file\n\
      Primrose.Controls.ModelFactory.loadObject(\n\
        \"path/to/model.json\",\n\
        null,\n\
        console.log.bind(console, \"Progress:\"))\n\
        .then(scene.add.bind(scene))\n\
        .catch(console.error.bind(console));\n\
       \n\
      function paint(t){\n\
        requestAnimationFrame(paint);\n\
        renderer.render(scene, camera);\n\
      }\n\
       \n\
      requestAnimationFrame(paint);"
      }]
    });
pliny.function({
      parent: "Primrose.Controls.ModelFactory",
      name: "loadObjects",
      description: "Asynchronously loads an array of JSON, OBJ, or MTL file as a Three.js object. It processes the objects for attributes, creating new properties on each object to give us\n\
    faster access to some of the elements within it. It uses callbacks to tell you when loading progresses. It uses a Promise to tell you when it's complete, or when an error occurred.\n\
    Useful for static models.\n\
    \n\
    See [`Primrose.Controls.ModelFactory.loadObject()`](#Primrose_Controls_ModelFactory_loadObject) for more details on how individual models are loaded.",
      returns: "Promise",
      parameters: [{
        name: "arr",
        type: "Array",
        description: "The files from which to load."
      }, {
        name: "type",
        type: "String",
        optional: true,
        description: "The type of the file--JSON, FBX, OJB, or STL--if it can't be determined from the file extension."
      }, {
        name: "progress",
        type: "Function",
        optional: true,
        description: "A callback function to use for tracking progress. The callback function should accept a standard [`ProgressEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent)."
      }],
      examples: [{
        name: "Load some models.",
        description: "When Blender exports models, they are frequently treated as full scenes, essentially making them scene-graph sub-trees.\n\
    We can load a bunch of models in one go using the following code.\n\
    \n\
    ## Code:\n\
    \n\
      grammar(\"JavaScript\");\n\
      // Create the scene where objects will go\n\
      var renderer = new THREE.WebGLRenderer(),\n\
          currentScene = new THREE.Scene(),\n\
          camera = new THREE.PerspectiveCamera(),\n\
          allModels = null;\n\
       \n\
      // Load up the file\n\
      Primrose.Controls.ModelFactory.loadObjects(\n\
        [\"path/to/model1.json\",\n\
          \"path/to/model2.obj\",\n\
          \"path/to/model3.obj\",\n\
          \"path/to/model4.fbx\"],\n\
        console.log.bind(console, \"Progress:\"))\n\
        .then(function(models){\n\
          allModels = models;\n\
          models.forEach(function(model){\n\
            scene.add(model);\n\
          });\n\
        })\n\
        .catch(console.error.bind(console));\n\
       \n\
      function paint(t){\n\
        requestAnimationFrame(paint);\n\
        \n\
        if(allModels){\n\
          // do whatever updating you want on the models\n\
        }\n\
        \n\
        renderer.render(scene, camera);\n\
      }\n\
      \n\
      requestAnimationFrame(paint);"
      }]
    });
pliny.property({
      parent: "Primrose.Graphics.ModelFactory",
      name: "template",
      type: "THREE.Object3D",
      description: "When a model is loaded, stores a reference to the model so it can be cloned in the future."
    });
pliny.method({
      parent: "Primrose.Controls.ModelFactory",
      name: "clone",
      description: "Creates a copy of the stored template model.",
      returns: "A THREE.Object3D that is a copy of the stored template.",
      examples: [{
        name: "Load a basic model.",
        description: "When Blender exports the Three.js JSON format, models are treated as full scenes, essentially making them scene-graph sub-trees. Instantiating a Primrose.Controls.ModelFactory object referencing one of these model files creates a factory for that model that we can use to generate an arbitrary number of copies of the model in our greater scene.\n\
    \n\
    ## Code:\n\
    \n\
      grammar(\"JavaScript\");\n\
      // Create the scene where objects will go\n\
      var scene = new THREE.Scene(),\n\
      \n\
      // Load up the file, optionally \"check it out\"\n\
        modelFactory = new Primrose.Controls.ModelFactory(\"path/to/model.json\", function(model){\n\
          model.traverse(function(child){\n\
            // Do whatever you want to the individual child objects of the scene.\n\
          });\n\
      }, console.error.bind(console), console.log.bind(console, \"Progress:\"));\n\
      \n\
      // Add copies of the model to the scene every time the user hits the ENTER key.\n\
      window.addEventListener(\"keyup\", function(evt){\n\
        // If the template object exists, then the model loaded successfully.\n\
        if(modelFactory.template && evt.keyCode === 10){\n\
          scene.add(modelFactory.clone());\n\
        }\n\
      });"
      }]
    });
pliny.property({
        parent: "Primrose.Controls.Sky",
        name: "ambient",
        type: "THREE.AmbientLight",
        description: "If the `disableDefaultLighting` option is not present, the ambient light provides a fill light so that dark shadows do not completely obscure object details."
      });
pliny.property({
        parent: "Primrose.Controls.Sky",
        name: "sun",
        type: "THREE.PointLight",
        description: "If the `disableDefaultLighting` option is not present, the sun light provides a key light so that objects have shading and relief."
      });
pliny.class({
  parent: "Primrose.Controls",
    name: "TextBox",
    description: "Syntax highlighting textbox control.",
    baseClass: "Primrose.Controls.Surface",
    parameters: [{
      name: "idOrCanvasOrContext",
      type: "String or HTMLCanvasElement or CanvasRenderingContext2D",
      description: "Either an ID of an element that exists, an element, or the ID to set on an element that is to be created."
    }, {
      name: "options",
      type: "Object",
      description: "Named parameters for creating the TextBox."
    }]
});
pliny.class({
  parent: "Primrose.Text",
    name: "Cursor",
    description: "| [under construction]"
});
pliny.record({
  parent: "Primrose.Text.CommandPacks",
  name: "TextEditor",
  description: "A set of commands for a multi-line text editing, extending single-line text editing."
});
pliny.record({
  parent: "Primrose.Text.CommandPacks",
  name: "BasicTextInput",
  baseClass: "Primrose.Text.CommandPacks.CommandPack",
  description: "A set of commands for editing a single line of text in a text editor. This is the same set of commands for both single-line text elements and multi-line text elements."
});
pliny.class({
  parent: "Primrose.Text",
    name: "CommandPack",
    description: "A CommandPack is a collection of key sequences and text editor commands. It provides a means of using a single text rendering control to create a variety of text-controls that utilize the text space differently.",
    parameters: [{
      name: "commandPackName",
      type: "String",
      description: "A friendly name for the command pack."
    }, {
      name: "commands",
      type: "Object",
      description: "An object literal of key-value pairs describing the commands.\n\
\n\
* The object key elements are strings describing the key sequence that activates the command.\n\
* The value elements are the action that occurs when the command is activated."
    }]
});
pliny.value({
  parent: "Primrose.Text.Grammars",
  name: "JavaScript",
  description: "A grammar for the JavaScript programming language."
});
pliny.class({
  parent: "Primrose.Text",
    name: "Grammar",
    parameters: [{
      name: "grammarName",
      type: "String",
      description: "A user-friendly name for the grammar, to be able to include it in an options listing."
    }, {
      name: "rules",
      type: "Array",
      description: "A collection of rules to apply to tokenize text. The rules should be an array of two-element arrays. The first element should be a token name (see [`Primrose.Text.Rule`](#Primrose_Text_Rule) for a list of valid token names), followed by a regular expression that selects the token out of the source code."
    }],
    description: "A Grammar is a collection of rules for processing text into tokens. Tokens are special characters that tell us about the structure of the text, things like keywords, curly braces, numbers, etc. After the text is tokenized, the tokens get a rough processing pass that groups them into larger elements that can be rendered in color on the screen.\n\
\n\
As tokens are discovered, they are removed from the text being processed, so order is important. Grammar rules are applied in the order they are specified, and more than one rule can produce the same token type.\n\
\n\
See [`Primrose.Text.Rule`](#Primrose_Text_Rule) for a list of valid token names.",
    examples: [{
      name: "A plain-text \"grammar\".",
      description: "Plain text does not actually have a grammar that needs to be processed. However, to get the text to work with the rendering system, a basic grammar is necessary to be able to break the text up into lines and prepare it for rendering.\n\
\n\
## Code:\n\
\n\
  grammar(\"JavaScript\");\n\
  var plainTextGrammar = new Primrose.Text.Grammar(\n\
    // The name is for displaying in options views.\n\
    \"Plain-text\", [\n\
    // Text needs at least the newlines token, or else every line will attempt to render as a single line and the line count won't work.\n\
    [\"newlines\", /(?:\\r\\n|\\r|\\n)/] \n\
  ] );"
    }, {
      name: "A grammar for BASIC",
      description: "The BASIC programming language is now defunct, but a grammar for it to display in Primrose is quite easy to build.\n\
\n\
## Code:\n\
\n\
  grammar(\"JavaScript\");\n\
  var basicGrammar = new Primrose.Text.Grammar( \"BASIC\",\n\
    // Grammar rules are applied in the order they are specified.\n\
    [\n\
      // Text needs at least the newlines token, or else every line will attempt to render as a single line and the line count won't work.\n\
      [ \"newlines\", /(?:\\r\\n|\\r|\\n)/ ],\n\
      // BASIC programs used to require the programmer type in her own line numbers. The start at the beginning of the line.\n\
      [ \"lineNumbers\", /^\\d+\\s+/ ],\n\
      // Comments were lines that started with the keyword \"REM\" (for REMARK) and ran to the end of the line. They did not have to be numbered, because they were not executable and were stripped out by the interpreter.\n\
      [ \"startLineComments\", /^REM\\s/ ],\n\
      // Both double-quoted and single-quoted strings were not always supported, but in this case, I'm just demonstrating how it would be done for both.\n\
      [ \"strings\", /\"(?:\\\\\"|[^\"])*\"/ ],\n\
      [ \"strings\", /'(?:\\\\'|[^'])*'/ ],\n\
      // Numbers are an optional dash, followed by a optional digits, followed by optional period, followed by 1 or more required digits. This allows us to match both integers and decimal numbers, both positive and negative, with or without leading zeroes for decimal numbers between (-1, 1).\n\
      [ \"numbers\", /-?(?:(?:\\b\\d*)?\\.)?\\b\\d+\\b/ ],\n\
      // Keywords are really just a list of different words we want to match, surrounded by the \"word boundary\" selector \"\\b\".\n\
      [ \"keywords\",\n\
        /\\b(?:RESTORE|REPEAT|RETURN|LOAD|LABEL|DATA|READ|THEN|ELSE|FOR|DIM|LET|IF|TO|STEP|NEXT|WHILE|WEND|UNTIL|GOTO|GOSUB|ON|TAB|AT|END|STOP|PRINT|INPUT|RND|INT|CLS|CLK|LEN)\\b/\n\
      ],\n\
      // Sometimes things we want to treat as keywords have different meanings in different locations. We can specify rules for tokens more than once.\n\
      [ \"keywords\", /^DEF FN/ ],\n\
      // These are all treated as mathematical operations.\n\
      [ \"operators\",\n\
        /(?:\\+|;|,|-|\\*\\*|\\*|\\/|>=|<=|=|<>|<|>|OR|AND|NOT|MOD|\\(|\\)|\\[|\\])/\n\
      ],\n\
      // Once everything else has been matched, the left over blocks of words are treated as variable and function names.\n\
      [ \"identifiers\", /\\w+\\$?/ ]\n\
    ] );"
    }]
});
pliny.property({
      parent: "Primrose.Text.Grammar",
      name: " name",
      type: "String",
      description: "A user-friendly name for the grammar, to be able to include it in an options listing."
    });
pliny.property({
      parent: "Primrose.Text.Grammar",
      name: "grammar",
      type: "Array",
      description: "A collection of rules to apply to tokenize text. The rules should be an array of two-element arrays. The first element should be a token name (see [`Primrose.Text.Rule`](#Primrose_Text_Rule) for a list of valid token names), followed by a regular expression that selects the token out of the source code."
    });
pliny.method({
      parent: "Primrose.Text.Grammar",
      name: "tokenize",
      parameters: [{
        name: "text",
        type: "String",
        description: "The text to tokenize."
      }],
      returns: "An array of tokens, ammounting to drawing instructions to the renderer. However, they still need to be layed out to fit the bounds of the text area.",
      description: "Breaks plain text up into a list of tokens that can later be rendered with color.",
      examples: [{
        name: 'Tokenize some JavaScript',
        description: 'Primrose comes with a grammar for JavaScript built in.\n\
  \n\
  ## Code:\n\
  \n\
    grammar(\"JavaScript\");\n\
    var tokens = new Primrose.Text.Grammars.JavaScript\n\
      .tokenize("var x = 3;\\n\\\n\
    var y = 2;\\n\\\n\
    console.log(x + y);");\n\
    console.log(JSON.stringify(tokens));\n\
  \n\
  ## Result:\n\
  \n\
    grammar(\"JavaScript\");\n\
    [ \n\
      { "value": "var", "type": "keywords", "index": 0, "line": 0 },\n\
      { "value": " x = ", "type": "regular", "index": 3, "line": 0 },\n\
      { "value": "3", "type": "numbers", "index": 8, "line": 0 },\n\
      { "value": ";", "type": "regular", "index": 9, "line": 0 },\n\
      { "value": "\\n", "type": "newlines", "index": 10, "line": 0 },\n\
      { "value": " y = ", "type": "regular", "index": 11, "line": 1 },\n\
      { "value": "2", "type": "numbers", "index": 16, "line": 1 },\n\
      { "value": ";", "type": "regular", "index": 17, "line": 1 },\n\
      { "value": "\\n", "type": "newlines", "index": 18, "line": 1 },\n\
      { "value": "console", "type": "members", "index": 19, "line": 2 },\n\
      { "value": ".", "type": "regular", "index": 26, "line": 2 },\n\
      { "value": "log", "type": "functions", "index": 27, "line": 2 },\n\
      { "value": "(x + y);", "type": "regular", "index": 30, "line": 2 }\n\
    ]'
      }]
    });
pliny.class({
  parent: "Primrose.Text",
    name: "Rule",
    description: "| [under construction]"
});
pliny.class({
  parent: "Primrose.Text",
    name: "Token",
    description: "| [under construction]"
});
pliny.function({
  parent: "Primrose.Displays",
  name: "defaultPose",
  description: "Creates a new copy of the default, base state."
});
pliny.class({
  parent: "Primrose.Displays",
  name: "BaseVRDisplay",
  description: "The base class from which all *VRDisplay types inherit, providing additional functionality over the WebVR API standard VRDisplay."
});
pliny.method({
      parent: "Primrose.Displays.BaseVRDisplay",
      name: "startAnimation",
      description: "Starts and maintains an animation loop.",
      parameters: [{
        name: "callback",
        type: "Function",
        description: "The code to execute during the animation update."
      }]
    });
pliny.method({
      parent: "Primrose.Displays.BaseVRDisplay",
      name: "stopAnimation",
      description: "Stop any animation loop that is currently running."
    });
pliny.function({
  parent: "Primrose.Displays",
  name: "calculateElementSize",
  description: "Figure out the size the canvas needs to be for rendering."
})
pliny.class({
  parent: "Primrose.Displays",
  name: "PolyfilledVRFrameData",
  description: "A polyfill for the WebVR standard PolyfilledVRFrameData object."
});
pliny.property({
      parent: "Primrose.Displays.PolyfilledVRFrameData",
      name: "leftProjectionMatrix",
      type: "Float32Array",
      description: "The projection matrix for the left eye."
    });
pliny.property({
      parent: "Primrose.Displays.PolyfilledVRFrameData",
      name: "leftViewMatrix",
      type: "Float32Array",
      description: "The projection matrix for the right eye."
    });
pliny.property({
      parent: "Primrose.Displays.PolyfilledVRFrameData",
      name: "rightProjectionMatrix",
      type: "Float32Array",
      description: "The view matrix for the left eye."
    });
pliny.property({
      parent: "Primrose.Displays.PolyfilledVRFrameData",
      name: "rightViewMatrix",
      type: "Float32Array",
      description: "The view matrix for the right eye."
    });
pliny.property({
      parent: "Primrose.Displays.PolyfilledVRFrameData",
      name: "pose",
      type: "VRPose",
      description: "VRPose data, instead of using the legacy VRDisplay.prototype.getPose."
    });
pliny.function({
  parent: "Primrose.DOM",
  name: "makeHidingContainer",
  description: "Takes an element and shoves it into a containing element that\n\
is 0x0 pixels in size, with the overflow hidden. Sometimes, we need an element\n\
like a TextArea in the DOM to be able to receive key events, but we don't want the\n\
user to see it, so the makeHidingContainer function makes it easy to make it disappear.",
  parameters: [{
    name: "id",
    type: "(String|Element)",
    description: "A vague reference to\n\
the element. Either a String id where the element can be had, a String id to give\n\
a newly created element if it does not exist, or an Element to manipulate and validate."
  }, {
    name: "obj",
    type: "Element",
    description: "The child element to stow in the hiding container."
  }],
  returns: "The hiding container element, not yet inserted into the DOM."
});
pliny.class({
  parent: "Primrose.Input",
    name: "Keyboard",
    baseClass: "Primrose.Input.InputProcessor",
    description: "| [under construction]",
    parameters: [{
      name: "",
      type: "",
      description: ""
    }, {
      name: "",
      type: "",
      description: ""
    }, {
      name: "",
      type: "",
      description: ""
    }, {
      name: "",
      type: "",
      description: ""
    }]
});
pliny.class({
  parent: "Primrose.Input",
    name: "InputProcessor",
    description: "| [under construction]"
});
pliny.value({
  parent: "Primrose.Text.OperatingSystems",
  name: "Windows",
  description: "Keyboard shortcuts for the Windows operating system."
});
pliny.class({
  parent: "Primrose.Text",
    name: "OperatingSystem",
    description: "A description of how a specific operating system handles keyboard shortcuts.",
    parameters: [{
      name: "osName",
      type: "String",
      description: "A friendly name for the operating system."
    }, {
      name: "pre1",
      type: "String",
      description: "Standard keyboard modifier."
    }, {
      name: "pre2",
      type: "String",
      description: "Key modifier for moving the cursor by whole words."
    }, {
      name: "redo",
      type: "String",
      description: "Key sequence to redo changes in text that were undone."
    }, {
      name: "pre3",
      type: "String",
      description: "Key modifier for home and end."
    }, {
      name: "home",
      type: "String",
      description: "Key sequence to send cursor to the beginning of the current line."
    }, {
      name: "end",
      type: "String",
      description: "Key sequence to send cursor to the end of the current line."
    }, {
      name: "pre5",
      type: "String",
      description: "Modifiers for the fullHome and fullEnd commands."
    }]
});
pliny.value({
  parent: "Primrose.Text.OperatingSystems",
  name: "macOS",
  description: "Keyboard shortcuts for Apple macOS nee OSX."
});
pliny.namespace({
  parent: "Primrose.Text",
  name: "CodePages",
  description: "The CodePages namespace contains international keyboard parameters."
});
pliny.class({
  parent: "Primrose.Text",
  name: "CodePage",
  description: "A code page is a description of how a certain cultural locale's keyboard works. Keys send \"key codes\" to the operating system, and the operating system then translates this into \"virtual key codes\" (as the keyboard's own code system is arbitrary and proprietary). The operating system's virtual key codes attempt to express the intended meaning of the user's key striking activity.\n\
\n\
As we work in the browser and not at the operating system level, we do not receive these virtual key codes. The browser does yet another translation into \"key events\" that are nominally standardized. Unfortunately, the standard is incomplete with regards to the full breadth of cultural locales in the world, and the current state of browser support for the standard is subopitmal. So we have to reinterpret what the browser tells us to get a better idea of what the user actually meant. And that reinterpretation is this CodePage class.",
  parameters: [{
    name: "codePageName",
    type: "String",
    description: "A readable name for the CodePage, to be used in options UIs.",
  }, {
    name: "lang",
    type: "String",
    description: "The IETF standard language tag describing the locale for which this CodePage was created. See: https://en.wikipedia.org/wiki/IETF_language_tag."
  }, {
    name: "options",
    type: "Object",
    description: "The CodePage description, an object literal expressing how different key events with different modifier keys result into different character codes or dead key state transitions. See: https://en.wikipedia.org/wiki/Dead_key."
  }]
});
pliny.record({
  parent: "Primrose.Text.CodePages",
  name: "DE_QWERTZ",
  description: "CodePage for `Deutsch: QWERTZ` locale."
});
pliny.record({
  parent: "Primrose.Text.CodePages",
  name: "EN_UKX",
  description: "CodePage for the `English: UK Extended` locale."
});
pliny.record({
  parent: "Primrose.Text.CodePages",
  name: "EN_US",
  description: "CodePage for the `English: USA` locale."
});
pliny.record({
  parent: "Primrose.Text.CodePages",
  name: "FR_AZERTY",
  description: "CodePage for the `Français: AZERTY` locale."
});
pliny.class({
  parent: "Primrose.Input",
  name: "Mouse",
  baseClass: "Primrose.Input.InputProcessor",
  description: "| [under construction]"
});
pliny.class({
  parent: "Primrose.Input",
  name: "Gamepad",
  baseClass: "Primrose.Input.PoseInputProcessor",
  description: "| [under construction]"
});
pliny.enumeration({
  parent: "Primrose.Input.Gamepad",
  name: "XBOX_360_BUTTONS",
  description: "Labeled names for each of the different control features of the Xbox 360 controller."
});
pliny.enumeration({
  parent: "Primrose.Input.Gamepad",
  name: "XBOX_ONE_BUTTONS",
  description: "Labeled names for each of the different control features of the Xbox 360 controller."
});
pliny.enumeration({
  parent: "Primrose.Input.Gamepad",
  name: "VIVE_BUTTONS",
  description: "Labeled names for each of the different control buttons of the HTC Vive Motion Controllers."
});
pliny.class({
  parent: "Primrose.Input",
  name: "PoseInputProcessor",
  baseClass: "Primrose.Input.InputProcessor",
  description: "| [under construction]"
});
pliny.class({
  parent: "Primrose.Input",
  name: "GamepadManager",
  baseClass: "THREE.EventDispatcher",
  description: "| [under construction]"
});
pliny.class({
  parent: "Primrose.Input",
  name: "Touch",
  baseClass: "Primrose.Input.InputProcessor",
  description: "| [under construction]"
});
pliny.class({
  parent: "Primrose.Input",
  name: "Speech",
  baseClass: "Primrose.Input.InputProcessor",
  description: "Connects to a the webkitSpeechRecognition API and manages callbacks based on keyword sets related to the callbacks. Note that the webkitSpeechRecognition API requires a network connection, as the processing is done on an external server.",
  parameters: [{
    name: "commands",
    type: "Array",
    description: "The `commands` parameter specifies a collection of keywords tied to callbacks that will be called when one of the keywords are heard. Each callback can be associated with multiple keywords, to be able to increase the accuracy of matches by combining words and phrases that sound similar.\n\
\n\
Each command entry is a simple object following the pattern:\n\
\n\
    {\n\
      \"keywords\": [\"phrase no. 1\", \"phrase no. 2\", ...],\n\
      \"command\": <callbackFunction>\n\
    }\n\
\n\
The `keywords` property is an array of strings for which SpeechInput will listen. If any of the words or phrases in the array matches matches the heard command, the associated callbackFunction will be executed.\n\
\n\
The `command` property is the callback function that will be executed. It takes no parameters."
    }]
});
pliny.class({
  parent: "Primrose.Input",
  name: "VR",
  baseClass: "Primrose.Input.PoseInputProcessor",
  description: "An input manager for gamepad devices.",
  parameters: [{
    name: "avatarHeight",
    type: "Number",
    description: "The default height to use for the user, if the HMD doesn't provide a stage transform."
  }]
});
pliny.class({
  parent: "Primrose.Displays.SensorFusion",
  name: "FusionPoseSensor",
  description: "The pose sensor, implemented using DeviceMotion APIs.",
  parameters: [{
    name: "options",
    type: "Primrose.Displays.FusionPoseSensor.optionsHash",
    optional: true,
    description: "Options for configuring the pose sensor."
  }]
});
pliny.record({
  parent: "Primrose.Displays.FusionPoseSensor",
  name: "optionsHash",
  description: "Options for configuring the pose sensor.",
  parameters: [{
    name: "K_FILTER",
    type: "Number",
    optional: true,
    default: 0.98,
    description: "Complementary filter coefficient. 0 for accelerometer, 1 for gyro."
  }, {
    name: "PREDICTION_TIME_S",
    type: "Number",
    optional: true,
    default: 0.040,
    description: "How far into the future to predict during fast motion (in seconds)."
  }]
});
pliny.class({
  parent: "Primrose.Displays.SensorFusion",
  name: "ComplementaryFilter",
  description: "An implementation of a simple complementary filter, which fuses gyroscope and accelerometer data from the 'devicemotion' event. Accelerometer data is very noisy, but stable over the long term. Gyroscope data is smooth, but tends to drift over the long term. This fusion is relatively simple: 1.) Get orientation estimates from accelerometer by applying a low-pass filter on that data, 2.) Get orientation estimates from gyroscope by integrating over time, 3.) Combine the two estimates, weighing (1) in the long term, but (2) for the short term.",
  parameters: [{
    name: "kFilter",
    type: "Number",
    description: "Complementary filter coefficient. 0 for accelerometer, 1 for gyro."
  }]
});
pliny.class({
  parent: "Primrose.Displays.SensorFusion",
  name: "SensorSample",
  description: "A combination of a sensor reading and a timestamp.",
  parameters: [{
    name: "sample",
    type: "Object",
    description: "The sensor reading we want to record. Can be any value, really, as it's just read back out again, correlated with a timestamp."
  },{
    name: "timestampS",
    type: "Number",
    description: "The time at which the sensor sample was recorded. It's important that all timestamps between values that are meant to be compared together be recorded from the source, as there are multiple sources of \"time\" in the browser, with subtly different meanings, precisions, and starting points."
  }]
});
pliny.method({
      parent: "Primrose.Displays.SensorFusion.SensorSample",
      name: "set",
      description: "Mutably set the current state of the object.",
      parameters: [{
        name: "sample",
        type: "Object",
        description: "The sensor reading we want to record. Can be any value, really, as it's just read back out again, correlated with a timestamp."
      },{
        name: "timestampS",
        type: "Number",
        description: "The time at which the sensor sample was recorded. It's important that all timestamps between values that are meant to be compared together be recorded from the source, as there are multiple sources of \"time\" in the browser, with subtly different meanings, precisions, and starting points."
      }]
    });
pliny.method({
      parent: "Primrose.Displays.SensorFusion.SensorSample",
      name: "copy",
      description: "Mutably copy the current state of the object from another `SensorSample` object.",
      parameters: [{
        name: "sensorSample",
        type: "Primrose.Displays.SensorFusion.SensorSample",
        description: "The object to copy."
      }]
    });
pliny.class({
  parent: "Primrose.Displays.SensorFusion",
  name: "PosePredictor",
  description: "Given an orientation and the gyroscope data, predicts the future orientation of the head. This makes rendering appear faster. Also see: http://msl.cs.uiuc.edu/~lavalle/papers/LavYerKatAnt14.pdf",
  parameters: [{
    name: "predictionTimeS",
    type: "Number",
    description: "time from head movement to the appearance of the corresponding image."
  }]
});
pliny.class({
  parent: "Primrose.Replay",
  name: "Player",
  description: "| [under construction]"
});
pliny.class({
  parent: "Primrose.Replay",
  name: "Automator",
  description: "| [under construction]"
});
pliny.class({
  parent: "Primrose.Replay",
  name: "Frame",
  description: "| [under construction]"
});
pliny.class({
  parent: "Primrose.Replay",
  name: "Record",
  description: "| [under construction]"
});
pliny.class({
  parent: "Primrose.Replay",
  name: "Obj",
  description: "| [under construction]"
});
pliny.namespace({
  parent: "Primrose",
  name: "HTTP",
  description: "A collection of basic XMLHttpRequest wrappers."
});
pliny.function({
  parent: "Primrose.HTTP",
  name: "del",
  description: "Process an HTTP DELETE request.",
  returns: "Promise",
  parameters: [{
    name: "type",
    type: "String",
    description: `How the response should be interpreted. One of ["text", "json", "arraybuffer"]. See the [MDN - XMLHttpRequest - responseType](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#xmlhttprequest-responsetype).`,
    default: `"text"`
  }, {
    name: "url",
    type: "String",
    description: "The resource to which the request is being sent."
  }, {
    name: "options",
    type: "Primrose.HTTP.XHR.optionsHash",
    optional: true,
    description: "Options for passing data or tracking progress. See [`Primrose.HTTP.XHR.optionsHash`](#Primrose_HTTP_XHR_optionsHash) for more information."
  }]
});
pliny.function({
  parent: "Primrose.HTTP",
  name: "delObject",
  description: "Delete something on the server, and receive JSON in response.",
  returns: "Promise",
  parameters: [{
    name: "url",
    type: "String",
    description: "The resource to which the request is being sent."
  }, {
    name: "options",
    type: "Primrose.HTTP.XHR.optionsHash",
    optional: true,
    description: "Options for passing data or tracking progress. See [`Primrose.HTTP.XHR.optionsHash`](#Primrose_HTTP_XHR_optionsHash) for more information."
  }]
});
pliny.function({
  parent: "Primrose.HTTP",
  name: "getObject",
  description: "Get a JSON object from a server.",
  returns: "Promise",
  parameters: [{
    name: "url",
    type: "String",
    description: "The resource to which the request is being sent."
  }, {
    name: "options",
    type: "Primrose.HTTP.XHR.optionsHash",
    optional: true,
    description: "Options for passing data or tracking progress. See [`Primrose.HTTP.XHR.optionsHash`](#Primrose_HTTP_XHR_optionsHash) for more information."
  }],
  examples: [{
    name: "Make a GET request for a JSON object.",
    description: `Typically, you would use one of the other functions in the Primrose.HTTP namespace, but the XHR function is provided as a fallback in case those others do not meet your needs.

## Code:

    grammar("JavaScript");
    Primrose.HTTP.getObject("localFile.json", {
        progress: console.log.bind(console, "progress")
      })
      .then(console.log.bind(console, "done"))
      .catch(console.error.bind(console)));

## Results:
> Object {field1: 1, field2: "Field2"}`
  }]
});
pliny.function({
  parent: "Primrose.HTTP",
  name: "getText",
  description: "Get plain text from a server. Returns a promise that will be resolve with the text retrieved from the server.",
  returns: "Promise",
  parameters: [{
    name: "url",
    type: "String",
    description: "The resource to which the request is being sent."
  }, {
    name: "options",
    type: "Primrose.HTTP.XHR.optionsHash",
    optional: true,
    description: "Options for passing data or tracking progress. See [`Primrose.HTTP.XHR.optionsHash`](#Primrose_HTTP_XHR_optionsHash) for more information."
  }],
  examples: [{
    name: "Make a GET request for plain text.",
    description: `Use this to load arbitrary files and do whatever you want with them.

## Code:

    grammar("JavaScript");
    Primrose.HTTP.getText("localFile.json",
      console.log.bind(console, "progress"),
      console.log.bind(console, "done"),
      console.error.bind(console));

## Results:
> "Object {field1: 1, field2: \\"Field2\\"}"`
  }]
});
pliny.function({
  parent: "Primrose.HTTP",
  name: "post",
  description: "Process an HTTP POST request.",
  returns: "Promise",
  parameters: [{
    name: "type",
    type: "String",
    description: `How the response should be interpreted. One of ["text", "json", "arraybuffer"]. See the [MDN - XMLHttpRequest - responseType](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#xmlhttprequest-responsetype).`,
    default: `"text"`
  }, {
    name: "url",
    type: "String",
    description: "The resource to which the request is being sent."
  }, {
    name: "options",
    type: "Primrose.HTTP.XHR.optionsHash",
    optional: true,
    description: "Options for passing data or tracking progress. See [`Primrose.HTTP.XHR.optionsHash`](#Primrose_HTTP_XHR_optionsHash) for more information. The `data` field is not optional."
  }]
});
pliny.function({
  parent: "Primrose.HTTP",
  name: "postObject",
  description: "Send a JSON object to a server.",
  returns: "Promise",
  parameters: [{
    name: "url",
    type: "String",
    description: "The resource to which the request is being sent."
  }, {
    name: "options",
    type: "Primrose.HTTP.XHR.optionsHash",
    optional: true,
    description: "Options for passing data or tracking progress. See [`Primrose.HTTP.XHR.optionsHash`](#Primrose_HTTP_XHR_optionsHash) for more information. The `data` field is not optional."
  }]
});
pliny.class({
  parent: "Primrose.Network",
  name: "Manager",
  baseClass: "THREE.EventDispatcher",
  parameters: [{
    name: "localUser",
    type: "Primrose.Input.FPSInput",
    description: "The object that represents the player's location in the scene."
  }, {
    name: "audio",
    type: "Primrose.Output.Audio3D",
    description: "The audio manager being used in the current Environment."
  }, {
    name: "factories",
    type: "Primrose.Controls.ModelFactory",
    description: "Model factory for creating avatars for new remote users."
  }]
});
pliny.class({
  parent: "Primrose.Network",
  name: "RemoteUser",
  baseClass: "THREE.EventDispatcher",
  description: "A networked user.",
  parameters: [{
    name: "userName",
    type: "String",
    description: "The name of the user."
  }, {
    name: "modelFactory",
    type: "Primrose.Controls.ModelFactory",
    description: "The factory for creating avatars for the user."
  }, {
    name: "nameMaterial",
    type: "Number",
    description: "The color to use with `colored()` to set as the material for the NAME object that will float above the user's avatar."
  }, {
    name: "requestICEPath",
    type: "string",
    description: "A request path at which to retrieve the extra ICE servers to use with the connection."
  }, {
    name: "microphone",
    type: "Promise",
    description: "A promise that resolves with an audio stream that can be sent to the remote user, representing the local user's voice chat."
  }, {
    name: "localUserName",
    type: "String",
    description: "The name of the user initiating the peer connection."
  }]
});
pliny.method({
      parent: "Pliny.RemoteUser",
      name: "unpeer",
      description: "Cleans up after a user has left the room, removing the audio channels that were created for the user."
    });
pliny.method({
      parent: "Pliny.RemoteUser",
      name: "update",
      description: "Moves the avatar by its velocity for a set amount of time. Updates the audio panner information.",
      parameters: [{
        name: "dt",
        type: "Number",
        description: "The amount of time since the last update to the user."
      }]
    });
pliny.property({
      parent: "Pliny.RemoteUser",
      name: "state",
      description: "After receiving a network update, sets the current state of the remote user so that, by the time the next network update comes around, the user will be where it is predicted to be.",
      parameters: [{
        name: "v",
        type: "Array",
        description: "The raw state array from the network (includes the un-read first username field)."
      }]
    });
pliny.function({
  parent: "Primrose.Random",
  name: "color",
  description: "Returns a random hex RGB number to be used as a color.",
  returns: "Number",
  examples: [{
    name: "Generate a random color.",
    description: "To generate colors at random, call the `Primrose.Random.color()` function:\n\
\n\
## Code:\n\
\n\
  grammar(\"JavaScript\");\n\
  for(var i = 0; i < 10; ++i){\n\
    console.log(Primrose.Random.color().toString(16));\n\
  }\n\
\n\
## Result (note that this is just one possible outcome):\n\
> 351233\n\
> 3e8e9\n\
> 8a85a6\n\
> 5fad58\n\
> 17fe2b\n\
> d4b42b\n\
> e986bf\n\
> 38541a\n\
> 5a19db\n\
> 5f5c50"
  }]
});
pliny.function({
  parent: "Primrose.Random",
  name: "int",
  description: "Returns a random integer number on a given range [min, max), i.e. min is inclusive, max is exclusive. Includes a means to skew the results in one direction or another. The number is as good as your JavaScript engine supports with Math.random(), which is not good enough for crypto, but is certainly good enough for games.",
  parameters: [{
    name: "min",
    type: "Number",
    description: "The included minimum side of the range of numbers."
  }, {
    name: "max",
    type: "Number",
    description: "The excluded maximum side of the range of numbers."
  }, {
    name: "power",
    type: "Number",
    optional: true,
    description: "The power to which to raise the random number before scaling and translating into the desired range. Values greater than 1 skew output values to the minimum of the range. Values less than 1 skew output values to the maximum of the range.",
    default: 1
  }],
  returns: "Number",
  examples: [{
    name: "Generate a random integer numbers on the range [-10, 10).",
    description: "To generate a random integer on a closed range, call the `Primrose.Random.integer` function as shown:\n\
\n\
## Code:\n\
\n\
  grammar(\"JavaScript\");\n\
  for(var i = 0; i < 10; ++i){\n\
    console.log(Primrose.Random.int(-10, 10));\n\
  }\n\
\n\
## Result (note that this is just one possible outcome):\n\
> -3  \n\
> 1  \n\
> -2  \n\
> 8  \n\
> 7  \n\
> 4  \n\
> 5  \n\
> -9  \n\
> 4  \n\
> 0"
  }, {
    name: "Generate skewed random integer numbers on the range [-100, 100).",
    description: "To generate a random integer skewed to one end of the range on a closed range, call the `Primrose.Random.integer` function with the `power` parameter as shown:\n\
\n\
## Code:\n\
\n\
  grammar(\"JavaScript\");\n\
  for(var i = 0; i < 10; ++i){\n\
    console.log(Primrose.Random.int(-100, 100, 5));\n\
  }\n\
\n\
## Result (note that this is just one possible outcome):\n\
> -100  \n\
> -100  \n\
> -78  \n\
> -81  \n\
> -99  \n\
> 18  \n\
> -100  \n\
> -100  \n\
> -100  \n\
> 52"
  }]
});
pliny.function({
  parent: "Primrose.Random",
  name: "number",
  description: "Returns a random floating-point number on a given range [min, max), i.e. min is inclusive, max is exclusive. As random as your JavaScript engine supports with Math.random(), which is not good enough for crypto, but is certainly good enough for games.",
  parameters: [{
    name: "min",
    type: "Number",
    description: "The included minimum side of the range of numbers."
  }, {
    name: "max",
    type: "Number",
    description: "The excluded maximum side of the range of numbers."
  }, {
    name: "power",
    type: "Number",
    optional: true,
    description: "The power to which to raise the random number before scaling and translating into the desired range. Values greater than 1 skew output values to the minimum of the range. Values less than 1 skew output values to the maximum of the range.",
    default: 1
  }],
  returns: "Number",
  examples: [{
    name: "Generate a random number on the range [-1, 1).",
    description: "To generate a random number on a closed range, call the `Primrose.Random.number` function as shown:\n\
\n\
## Code:\n\
\n\
  grammar(\"JavaScript\");\n\
  for(var i = 0; i < 10; ++i){\n\
    console.log(Primrose.Random.number(-1, 1));\n\
  }\n\
\n\
## Result (note that this is just one possible outcome):\n\
> -0.4869012129493058  \n\
> 0.5300767715089023  \n\
> 0.11962601682171226  \n\
> -0.22012147679924965  \n\
> 0.48508461797609925  \n\
> -0.8488651723600924  \n\
> 0.15711558377370238  \n\
> -0.3644236018881202  \n\
> 0.4486056035384536  \n\
> -0.9659552359953523"
  }]
});
pliny.value({
  parent: "Primrose.Text.Grammars",
  name: "PlainText",
  description: "A grammar that makes displaying plain text work with the text editor designed for syntax highlighting."
});
pliny.namespace({
  parent: "Primrose",
  name: "Constants",
  description: "Useful values that are used frequently."
});
pliny.value({
  parent: "Primrose.Constants",
  name: "G",
  type: "Number",
  description: "The Gravitational Constant."
});
pliny.value({
  parent: "Primrose.Constants",
  name: "PIXEL_SCALES",
  description: "Scaling factors for changing the resolution of the display when the render quality level changes."
});
pliny.value({
  parent: "Primrose.Constants",
  name: "SKINS",
  type: "Array of Number",
  description: "A selection of color values that closely match skin colors of people."
});
pliny.value({
  parent: "Primrose.Constants",
  name: "SYS_FONTS",
  type: "String",
  description: "A selection of fonts that will match whatever the user's operating system normally uses."
});
pliny.enumeration({
  parent: "Primrose.Constants",
  name: "Quality",
  description: "Graphics quality settings."
});
pliny.value({
  parent: "Primrose.Constants",
  name: "NAMES",
  type: "Array of String",
  description: "Just a list of nice names."
});
pliny.namespace({
  parent: "Primrose",
  name: "Controls",
  description: "Various 3D control objects."
});
pliny.class({
  parent: "Primrose.Controls",
  name: "Model",
  baseClass: "Primrose.Controls.Entity",
  description: "An object loaded from a model file."
});
pliny.class({
  parent: "Primrose.Controls",
  name: "PlainText",
  description: "A texture that uses Canvas2D calls to draw simple, monochrome text to a polygon.",
  parameters: [{
    name: "text",
    type: "String",
    description: "The initial text to render on the PlainText control."
  }, {
    name: "size",
    type: "Number",
    description: "The font size at which to render the text."
  }, {
    name: "fgcolor",
    type: "String",
    description: "A Canvas2D fillStyle description to use for drawing the text."
  }, {
    name: "bgcolor",
    type: "String",
    description: "A Canvas2D fillStyle description to use for drawing the background behind the text."
  }, {
    name: "x",
    type: "Number",
    description: "The X component of the position at which to set the PlainText control's polygon mesh."
  }, {
    name: "y",
    type: "Number",
    description: "The Y component of the position at which to set the PlainText control's polygon mesh."
  }, {
    name: "z",
    type: "Number",
    description: "The Z component of the position at which to set the PlainText control's polygon mesh."
  }, {
    name: "hAlign",
    type: "String",
    description: "The horizontal alignment of the text, \"left\", \"center\", or \"right\".",
    optional: true,
    default: "center"
  }]
});
pliny.class({
  parent: "Primrose.Controls",
  name: "Progress",
  description: "| [under construction]"
});
pliny.class({
  parent: "Primrose.Controls",
    name: "TextInput",
    description: "plain text input box.",
    baseClass: "Primrose.Controls.TextBox",
    parameters: [{
      name: "idOrCanvasOrContext",
      type: "String or HTMLCanvasElement or CanvasRenderingContext2D",
      description: "Either an ID of an element that exists, an element, or the ID to set on an element that is to be created."
    }, {
      name: "options",
      type: "Object",
      description: "Named parameters for creating the TextInput."
    }]
});
pliny.record({
  parent: "Primrose.Text.CommandPacks",
  name: "TextInput",
  description: "A concrete instantiation of the single-line text editor commands provided by BasicTextInput."
});
pliny.namespace({
  parent: "Primrose",
  name: "Displays",
  description: "All the ways in which displays can be managed."
});
pliny.namespace({
  parent: "Primrose",
  name: "DOM",
  description: "A few functions for manipulating DOM."
});
pliny.function({
  parent: "Primrose.DOM",
  name: "findEverything",
  description: "Searches an element for all sub elements that have a named ID,\n\
using that ID as the name of a field in a hashmap to store a reference to the element.\n\
Basically, a quick way to get at all the named elements in a page. Returns an object full\n\
of element references, with fields named by the ID of the elements that were found.\n\
\n\
> NOTE: You may name your IDs pretty much anything you want, but for ease of use,\n\
> you should name them in a camalCase fashion. See [CamelCase - Wikipedia, the free encyclopedia](https://en.wikipedia.org/wiki/CamelCase).",
  parameters: [{
    name: "elem",
    type: "Element",
    optional: true,
    description: "the root element from which to search.",
    default: "`document`."
  }, {
    name: "obj",
    type: "Object",
    optional: true,
    description: "the object in which to store the element references. If no object is provided, one will be created."
  }],
  returns: "Object",
  examples: [{
    name: "Get all child elements.",
    description: "Assuming the following HTML snippet:\n\
\n\
  grammar(\"HTML\");\n\
  <div>\n\
    <div id=\"First\">first element</div>\n\
    <section id=\"second-elem\">\n\
      Second element\n\
      <img id=\"img1\" src=\"img.png\">\n\
    </section>\n\
  </div>\n\
\n\
## Code:\n\
\n\
  grammar(\"JavaScript\");\n\
  var elems = Primrose.DOM.findEverything();\n\
  console.log(elems.First.innerHTML);\n\
  console.log(elems[\"second-elem\"].textContent);\n\
  console.log(elems.img1.src);\n\
\n\
## Results:\n\
> first element  \n\
> Second element  \n\
> img.png"
  }]
});
pliny.namespace({
  parent: "Primrose",
  name: "Graphics",
  description: "The Graphics namespace contains classes and functions that with 3D geometry."
});
pliny.namespace({
  parent: "Primrose",
  name: "Input",
  description: "The Input namespace contains classes that handle user input, for use in navigating the 3D environment."
});
pliny.class({
  parent: "Primrose.Input",
  name: "Location",
  baseClass: "Primrose.Input.InputProcessor",
  description: "| [under construction]"
});
pliny.namespace({
  parent: "Primrose",
  name: "Network",
  description: "The Network namespace contains classes for communicating events between entities in a graph relationship across different types of communication boundaries: in-thread, cross-thread, cross-WAN, and cross-LAN."
});
pliny.class({
  parent: "Primrose.Network",
    name: "AudioChannel",
    baseClass: "Primrose.WebRTCSocket",
    description: "Manages the negotiation between peer users to set up bidirectional audio between the two.",
    parameters: [{
      name: "requestICEPath",
      type: "string",
      description: "A request path at which to retrieve the extra ICE servers to use with the connection."
    }, {
      name: "fromUserName",
      type: "String",
      description: "The name of the local user, from which the peering is being initiated."
    }, {
      name: "toUserName",
      type: "String",
      description: "The name of the remote user, to which the peering is being requested."
    }, {
      name: "outAudio",
      type: "Promise",
      description: "An audio stream from the local user to send to the remote user."
    }]
});
pliny.class({
  parent: "Primrose",
  name: "WebRTCSocket",
  baseClass: "THREE.EventDispatcher",
  description: "Manages the negotiation between peer users to set up bidirectional audio between the two.",
  parameters: [{
    name: "requestICEPath",
    type: "string",
    description: "A request path at which to retrieve the extra ICE servers to use with the connection."
  }, {
    name: "fromUserName",
    type: "String",
    description: "The name of the local user, from which the peering is being initiated."
  }, {
    name: "fromUserIndex",
    type: "Number",
    description: "For users with multiple devices logged in at one time, this is the index of the device that is performing the peering operation."
  }, {
    name: "toUserName",
    type: "String",
    description: "The name of the remote user, to which the peering is being requested."
  }, {
    name: "toUserIndex",
    type: "Number",
    description: "For users with multiple devices logged in at one time, this is the index of the device that is receiving the peering operation."
  }]
});
pliny.class({
  parent: "Primrose.Network",
    name: "DataChannel",
    baseClass: "Primrose.WebRTCSocket",
    description: "Manages the negotiation between peer users to set up bidirectional audio between the two.",
    parameters: [{
      name: "requestICEPath",
      type: "string",
      description: "A request path at which to retrieve the extra ICE servers to use with the connection."
    }, {
      name: "fromUserName",
      type: "String",
      description: "The name of the local user, from which the peering is being initiated."
    }, {
      name: "fromUserIndex",
      type: "Number",
      description: "For users with multiple devices logged in at one time, this is the index of the device that is performing the peering operation."
    }, {
      name: "toUserName",
      type: "String",
      description: "The name of the remote user, to which the peering is being requested."
    }, {
      name: "toUserIndex",
      type: "Number",
      description: "For users with multiple devices logged in at one time, this is the index of the device that is receiving the peering operation."
    }]
});
pliny.property({
      parent: "Primrose.Network.DataChannel",
      name: "dataChannel",
      type: "RTCDataChannel",
      description: "A bidirectional data channel from the remote user to the local user."
    });
pliny.namespace({
  parent: "Primrose",
  name: "Physics",
  description: "A collection of components to use with the Cannon.js physics system."
});
pliny.class({
  parent: "Primrose.Physics",
  name: "DirectedForceField",
  description: "A component that causes two objects (the object to which the DirectedForceField is added as a component and one other object) to repel or attract each other with a set force.",
  parameters: [{
    name: "bodyStart",
    type: "THREE.Object3D",
    description: "An entity that has a rigid body component that we can manipulate for the physics system."
  }, {
    name: "bodyEnd",
    type: "THREE.Object3D",
    description: "An entity that has a rigid body component that we can manipulate for the physics system."
  }, {
    name: "options",
    type: "Object",
    optional: true,
    description: "Optional configuration values. See following parameters:"
  }, {
    name: "options.force",
    type: "Number",
    optional: true,
    default: 1,
    description: "The force to attract the two objects together. Use negative values to repel objects. If `gravitational` is true, the force will be a value for the gravitational constant G in the two-body gravity equation. The real value of G is available as `Primrose.Constants.G."
  }, {
    name: "options.gravitational",
    type: "Boolean",
    optional: true,
    default: false,
    description: "Indicate whether or not to treat the force as gravity, i.e. taking mass into consideration. If `gravitational` is true, the force will be a value for the gravitational constant G in the two-body gravity equation. The real value of G is available as `Primrose.Constants.G."
  }, {
    name: "options.falloff",
    type: "Boolean",
    optional: true,
    default: true,
    description: "Indicate whether or not to use a distance-squared fall-off for the force. If `gravitational` is specified, the fall-off is always distance-squared, regardless of setting this value."
  }]
});
pliny.property({
      parent: "Primrose.Physics.DirectedForceField",
      name: "force",
      type: "Number",
      description: "The force to attract the two objects together. Use negative values to repel objects. If `gravitational` is true, the force will be a value for the gravitational constant G in the two-body gravity equation. The real value of G is available as `Primrose.Constants.G."
    });
pliny.property({
      parent: "Primrose.Physics.DirectedForceField",
      name: "gravitational",
      type: "Boolean",
      description: "Indicate whether or not to treat the force as gravity, i.e. taking mass into consideration. If `gravitational` is true, the force will be a value for the gravitational constant G in the two-body gravity equation. The real value of G is available as `Primrose.Constants.G."
    });
pliny.property({
      parent: "Primrose.Physics.DirectedForceField",
      name: "falloff",
      type: "Boolean",
      description: "Indicate whether or not to use a distance-squared fall-off for the force. If `gravitational` is specified, the fall-off is always distance-squared, regardless of setting this value."
    });
pliny.namespace({
  parent: "Primrose",
  name: "Random",
  description: "Functions for handling random numbers of different criteria, or selecting random elements of arrays."
});
pliny.function({
  parent: "Primrose.Random",
  name: "flipCoin",
  description: "Returns a true or false. Supports bum coins.",
  returns: "Boolean",
  parameters: [{
    name: "p",
    type: "Number",
    optional: true,
    default: 0.5,
    description: "Set the probability of seeing a true value."
  }],
  examples: [{
    name: "Play heads-or-tails.",
    description: "To generate a sequence of truth values, call the `Primrose.Random.flipCoin()` function:\n\
\n\
## Code:\n\
\n\
  grammar(\"JavaScript\");\n\
  for(var i = 0; i < 10; ++i){\n\
    console.log(Primrose.Random.flipCoin() ? \"heads\" : \"tails\");\n\
  }\n\
\n\
## Result (note that this is just one possible outcome):\n\
> heads\n\
> heads\n\
> tails\n\
> heads\n\
> tails\n\
> tails\n\
> tails\n\
> heads\n\
> heads\n\
> tails"
  }]
});
pliny.function({
  parent: "Primrose.Random",
  name: "ID",
  description: "Returns a randomized string to be used as a general purpose identifier. Collisions are possible, but should be rare.",
  returns: "String",
  examples: [{
    name: "Generate 10 random identifiers.",
    description: "To generate a randomized identifier, call the `Primrose.Random.ID()` function as shown:\n\
\n\
## Code:\n\
\n\
  grammar(\"JavaScript\");\n\
  for(var i = 0; i < 10; ++i){\n\
    console.log(Primrose.Random.ID());\n\
  }\n\
\n\
## Result (note that this is just one possible outcome):\n\
> 25xzdqnhg1ma2qsb3k1n61or\n\
> 1hyajmimpyjb4chvge5ng66r\n\
> cq3dy9qnkwhneza3vr3haor\n\
> g3l5k2kfwmxjrxjwg0uj714i\n\
> 7qsta7cutxke8t88pahy3nmi\n\
> h75g0nj0d4gh7zsyowxko6r\n\
> 7pbej49fhhd5icimp3krzfr\n\
> 3vnlovkkvyvmetsjcyirizfr\n\
> icrehedvz97dpgkusfumzpvi\n\
> 9p06sytn6dfearuibsnn4s4i"
  }]
});
pliny.function({
  parent: "Primrose.Random",
  name: "item",
  description: "Returns a random element from an array.",
  parameters: [{
    name: "arr",
    type: "Array",
    description: "The array form which to pick items."
  }],
  returns: "Any",
  examples: [{
    name: "Select a random element from an array.",
    description: "To pick an item from an array at random, call the `Primrose.Random.item` function with the `power` parameter as shown:\n\
\n\
## Code:\n\
\n\
  grammar(\"JavaScript\");\n\
  var numbers = [\n\
    \"one\",\n\
    \"two\",\n\
    \"three\",\n\
    \"four\",\n\
    \"five\"\n\
  ];\n\
  for(var i = 0; i < 10; ++i){\n\
    console.log(Primrose.Random.item(numbers));\n\
  }\n\
\n\
## Result (note that this is just one possible outcome):\n\
> three  \n\
> four  \n\
> four  \n\
> two  \n\
> three  \n\
> two  \n\
> five  \n\
> four  \n\
> three  \n\
> two"
  }]
});
pliny.function({
  parent: "Primrose.Random",
  name: "steps",
  description: "Returns a random integer number on a given range [min, max), i.e. min is inclusive, max is exclusive, sticking to a number of steps in between. Useful for randomly generating music note values on pentatonic scales. As random as your JavaScript engine supports with Math.random(), which is not good enough for crypto, but is certainly good enough for games.",
  parameters: [{
    name: "min",
    type: "Number",
    description: "The included minimum side of the range of numbers."
  }, {
    name: "max",
    type: "Number",
    description: "The excluded maximum side of the range of numbers."
  }, {
    name: "steps",
    type: "Number",
    description: "The number of steps between individual integers, e.g. if min is even and step is even, then no odd numbers will be generated."
  }],
  returns: "Number",
  examples: [{
    name: "Generate random, even numbers.",
    description: "To generate numbers on a closed range with a constant step size between them, call the `Primrose.Random.step` function as shown:\n\
\n\
## Code:\n\
\n\
  grammar(\"JavaScript\");\n\
  for(var i = 0; i < 10; ++i){\n\
    console.log(Primrose.Random.steps(0, 100, 2));\n\
  }\n\
\n\
## Result (note that this is just one possible outcome):\n\
> 86  \n\
> 32  \n\
> 86  \n\
> 56  \n\
> 4  \n\
> 96  \n\
> 68  \n\
> 92  \n\
> 4  \n\
> 36"
  }]
});
pliny.function({
  parent: "Primrose.Random",
  name: "vector",
  description: "Returns a random THREE.Vector3 of floating-point numbers on a given range [min, max), i.e. min is inclusive, max is exclusive. As random as your JavaScript engine supports with Math.random(), which is not good enough for crypto, but is certainly good enough for games.",
  parameters: [{
    name: "min",
    type: "Number",
    description: "The included minimum side of the range of numbers."
  }, {
    name: "max",
    type: "Number",
    description: "The excluded maximum side of the range of numbers."
  }],
  returns: "THREE.Vector3",
  examples: [{
    name: "Generate a random vector on the range [-1, 1).",
    description: "To generate a random vector on a closed range, call the `Primrose.Random.vector` function as shown:\n\
\n\
## Code:\n\
\n\
  grammar(\"JavaScript\");\n\
  for(var i = 0; i < 10; ++i){\n\
    console.log(Primrose.Random.vector(-1, 1).toString(\"test\", 3));\n\
  }\n\
\n\
## Result (note that this is just one possible outcome):\n\
> <-0.486, 0.530, 0.119>\n\
> <-0.220, 0.485, -0.848>\n\
> <0.157, -0.364, 0.448>"
  }]
});
pliny.namespace({
  parent: "Primrose",
  name: "Replay",
  description: "Record and playback data."
});
pliny.class({
  parent: "Primrose.Replay",
  name: "Recorder",
  description: "| [under construction]"
});
pliny.class({
  parent: "Primrose.Replay",
  name: "Watcher",
  description: "| [under construction]"
});
pliny.namespace({
  parent: "Primrose",
  name: "Text",
  description: "The Text namespace contains classes everything regarding the Primrose source code editor."
});
pliny.namespace({
  parent: "Primrose.Text",
  name: "CommandPacks",
  description: "The CommandPacks namespace contains sets of keyboard shortcuts for different types of text-oriented controls."
});
pliny.namespace({
  parent: "Primrose.Text",
  name: "Grammars",
  description: "The Grammars namespace contains grammar parsers for different types of programming languages, to enable syntax highlighting."
});
pliny.value({
  parent: "Primrose.Text.Grammars",
  name: "Basic",
  description: "A grammar and an interpreter for a BASIC-like language."
});
pliny.value({
  parent: "Primrose.Text.Grammars",
  name: "HTML",
  description: "A grammar for HyperText Markup Language."
});
pliny.value({
  parent: "Primrose.Text.Grammars",
  name: "TestResults",
  description: "A grammar for displaying the results of Unit Tests."
});
pliny.namespace({
  parent: "Primrose.Text",
  name: "OperatingSystems",
  description: "The OperatingSystems namespace contains sets of keyboard shortcuts for different operating systems."
});
pliny.value({
  parent: "Primrose.Text.OperatingSystems",
  name: "Linux",
  description: "Keyboard shortcuts for the Linux operating system (actually just a reference to the Windows shortcuts)."
});
pliny.class({
  parent: "Primrose.Text",
    name: "Terminal",
    description: "| [under construction]"
});
pliny.namespace({
  parent: "Primrose.Text",
  name: "Themes",
  description: "The Themes namespace contains color themes for text-oriented controls, for use when coupled with a parsing grammar."
});
pliny.record({
  parent: "Primrose.Text.Themes",
  name: "Dark",
  description: "A dark background with a light foreground for text."
});
pliny.namespace({
  parent: "Primrose",
  name: "Tools",
  description: "A collection of tools to be able to manipulate objects."
});
