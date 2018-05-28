Object.assign(window, Primrose.Random);

var SCRIPT_UPDATE_TIME = 5,
  GRASS = "../shared_assets/images/grass.png",
  ROCK = "../shared_assets/images/rock.png",
  SAND = "../shared_assets/images/sand.png",
  WATER = "../shared_assets/images/water.png",
  DECK = "../shared_assets/images/deck.png",
  env = new Primrose.BrowserEnvironment({
    skyTexture: "../shared_assets/images/bg2.jpg",
    groundTexture: GRASS,
    font: "../shared_assets/fonts/helvetiker_regular.typeface.json",
    fullScreenButtonContainer: "#fullScreenButtonContainer",
  }),
  subScene = hub(),
  editor = null,

  modA = isMacOS ? "metaKey" : "ctrlKey",
  modB = isMacOS ? "altKey" : "shiftKey",
  cmdA = isMacOS ? "CMD" : "CTRL",
  cmdB = isMacOS ? "OPT" : "SHIFT",
  cmdPre = cmdA + "+" + cmdB,

  scriptUpdateTimeout,
  lastScript = null,
  scriptAnimate = null;

  var canvas = document.getElementById("editz");

///*

//* adding plane
var ark = new THREE.MeshBasicMaterial({overdraw: true, color:
0x99ccff});
LBbox =  new THREE.Mesh (new THREE.BoxGeometry (2,2,0.1), ark );
LBbox.position.set (0,1.5,-3);
env.scene.add (LBbox);

//* adding camera
arkCam = new THREE.OrthographicCamera (-110,110,220,-220, 10, 2000);
arkCam.position.set (0,450,0);
arkCam.up.set (0,0,-1);


env.addEventListener("ready", function () {
  env.scene.add(subScene);

  var editorSize = isMobile ? 512 : 1024,
    fontSize = isMobile ? 10 : 20;

  editor = new Primrose.Controls.TextBox({
      id: "Editor",
      width: editorSize,
      height: editorSize,
      geometry: shell(1.5, 25, 25),
      fontSize: fontSize,
      tokenizer: Primrose.Text.Grammars.JavaScript,
      value: getSourceCode(isInIFrame)
    })
    .addTo(env.scene)
    .at(0, env.options.avatarHeight, -2);


  console.log("INSTRUCTIONS:");
  console.log(" - " + cmdPre + "+E to show/hide editor");
  console.log(" - " + cmdPre + "+X to reload original demo code");
  console.log(" - Z to reset position/sensor");
  console.log();

  Preloader.hide();
});

env.addEventListener("update", function () {
  if (!scriptUpdateTimeout) {
    scriptUpdateTimeout = setTimeout(updateScript, SCRIPT_UPDATE_TIME)
  }

  if (scriptAnimate) {
      window.editor.visible = false;
    // If quality has degraded, it's likely because the user bombed on a script.
    // Let's help them not lose their lunch.
    if (env.quality === Primrose.Constants.Quality.NONE) {
      scriptAnimate = null;
      wipeScene();
    }
    else {
      try{
        scriptAnimate.call(env, env.deltaTime);
      }
      catch(exp){
        scriptAnimate = null;
        console.error(exp);
      }
    }
  }
});

env.addEventListener("keydown", function (evt) {
  var aceeditor = ace.edit("editorzz");
  console.log(aceeditor.getSelectedText(), "lkdjfalk")
  var Changedcode  = aceeditor.getSelectedText();
    window.localStorage.code = Changedcode;

  if (evt[modA] && evt[modB]) {
    if (evt.keyCode === Primrose.Keys.E) {
      editor.visible = !editor.visible;
    }
    else if (evt.keyCode === Primrose.Keys.X) {
      editor.value = getSourceCode(true);
    }
  }

  if (scriptUpdateTimeout) {
    clearTimeout(scriptUpdateTimeout);
    scriptUpdateTimeout = null;
  }
});

window.addEventListener("beforeunload", function (evt) {
  return evt.returnValue = "Are you sure you want to leave?";
}, false);


function wipeScene() {
  for (var i = subScene.children.length - 1; i >= 0; --i) {
    subScene.remove(subScene.children[i]);
  }
}

var first = true;
var changedScript=false;

function updateScript() {
  var newScript = getSourceCode(false);

  //
  // exp;
var aceeditor = ace.edit("editorzz");
console.log(aceeditor.getSelectedText(), "lkdjfalk")
  window.localStorage.code.lastScript;
console.log(aceeditor);
    if (newScript !== lastScript) {
      changedScript=true;
    }

  if (changedScript) {



    env.transition(function() {
      scriptUpdateTimeout = null;
      lastScript = newScript;
      aceeditor.setValue(lastScript);

      // var aceeditor = document.getElementById("editorzz");
      // var codedow = aceeditor.innerText;
      // console.log(code, "CODE BEFORE UPDATE");
      // var text = lastScript;
      //
      // editor.setValue("the new text here");
      //
      //
      //
      // console.log(aceeditor.innerText, "CODE AFTER UPDATE");
      if (newScript.indexOf("function update") >= 0 &&
        newScript.indexOf("return update") < 0) {
        newScript += "\nreturn update;";
      }
      console.log("----- loading new script -----");
      scriptAnimate = null;
      try{
        var scriptUpdate = new Function("scene", newScript);
        wipeScene();
        scriptAnimate = scriptUpdate.call(env, subScene);
        if (scriptAnimate) {
          scriptAnimate(0);
        }
        console.log("----- script loaded -----");
        if (!scriptAnimate) {
          console.log("----- No update script provided -----");
        }
        else if (env.quality === Primrose.Constants.Quality.NONE) {
          env.quality = Primrose.Constants.Quality.MEDIUM;
        }
      }
      catch(exp){
        scriptUpdate = null;
        console.error(exp);
        console.error(newScript);
      }
    }, null, first);
    first = false;
    changedScript=false;
  }
}

function getSourceCode(skipReload) {
  var defaultDemo = testDemo.toString();

  var aceeditor = ace.edit("editorzz");
  console.log(aceeditor.getSelectedText(), "lkdjfalk")
  var newcode  = aceeditor.getValue();


    //src = skipReload && defaultDemo || getSetting("code", defaultDemo);

    src = skipReload && defaultDemo || getSetting("code", newcode);
  // If there was no source code stored in local storage,
  // we use the script from a saved function and assume
  // it has been formatted with 2 spaces per-line.mentme
  if (src === defaultDemo) {
    var lines = src.replace("\r\n", "\n")
      .split("\n");
    lines.pop();
    lines.shift();
    var numSpaces = lines[0].match(/^\s+/)[0].length;
    console.log(numSpaces);
    for (var i = 0; i < lines.length; ++i) {
      lines[i] = lines[i].substring(numSpaces);
    }
    src = lines.join("\n");
  }

  return src.trim();
}
