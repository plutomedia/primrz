/*
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
*/

import Surface from "./Surface";
import Cursor from "../Text/Cursor";
import Point from "../Text/Point";
import Size from "../Text/Size";
import Rectangle from "../Text/Rectangle";
import TextEditor from "../Text/CommandPacks/TextEditor";
import DefaultTheme from "../Text/Themes/Default";
import JavaScript from "../Text/Grammars/JavaScript";

import {
  isFirefox,
  isChrome,
  isIE,
  isOpera,
  isSafari,
  isMobile
} from "../../flags";

var SCROLL_SCALE = isFirefox ? 3 : 100,
  COUNTER = 0,
  OFFSET = 0;

export default class TextBox extends Surface {

  constructor(options) {

    if (typeof options === "string") {
      options = {
        value: options
      };
    }

    super(Object.assign({}, {
      id: "Primrose.Controls.TextBox[" + (COUNTER++) + "]"
    }, options));

    this.isTextBox = true;
    ////////////////////////////////////////////////////////////////////////
    // normalize input parameters
    ////////////////////////////////////////////////////////////////////////

    this.useCaching = !isFirefox || !isMobile;

    var makeCursorCommand = function (name) {
      var method = name.toLowerCase();
      this["cursor" + name] = function (lines, cursor) {
        cursor[method](lines);
        this.scrollIntoView(cursor);
      };
    };

    ["Left", "Right",
      "SkipLeft", "SkipRight",
      "Up", "Down",
      "Home", "End",
      "FullHome", "FullEnd"
    ].map(makeCursorCommand.bind(this));

    ////////////////////////////////////////////////////////////////////////
    // initialization
    ///////////////////////////////////////////////////////////////////////
    this.tokens = null;
    this.lines = null;
    this._commandPack = null;
    this._tokenRows = null;
    this._tokenHashes = null;
    this._tabString = null;
    this._currentTouchID = null;
    this._lineCountWidth = null;

    this._lastFont = null;
    this._lastText = null;
    this._lastCharacterWidth = null;
    this._lastCharacterHeight = null;
    this._lastGridBounds = null;
    this._lastPadding = null;
    this._lastFrontCursor = null;
    this._lastBackCursor = null;
    this._lastWidth = -1;
    this._lastHeight = -1;
    this._lastScrollX = -1;
    this._lastScrollY = -1;
    this._lastFocused = false;
    this._lastThemeName = null;
    this._lastPointer = new Point();

    // different browsers have different sets of keycodes for less-frequently
    // used keys like curly brackets.
    this._browser = isChrome ? "CHROMIUM" : (isFirefox ? "FIREFOX" : (isIE ? "IE" : (isOpera ? "OPERA" : (isSafari ? "SAFARI" : "UNKNOWN"))));
    this._pointer = new Point();
    this._history = [];
    this._historyFrame = -1;
    this._topLeftGutter = new Size();
    this._bottomRightGutter = new Size();
    this._dragging = false;
    this._scrolling = false;
    this._wheelScrollSpeed = 4;
    var subBounds = new Rectangle(0, 0, this.bounds.width, this.bounds.height);
    this._fg = new Surface({
      id: this.id + "-fore",
      bounds: subBounds
    });
    this._fgCanvas = this._fg.canvas;
    this._fgfx = this._fg.context;
    this._bg = new Surface({
      id: this.id + "-back",
      bounds: subBounds
    });
    this._bgCanvas = this._bg.canvas;
    this._bgfx = this._bg.context;
    this._trim = new Surface({
      id: this.id + "-trim",
      bounds: subBounds
    });
    this._trimCanvas = this._trim.canvas;
    this._tgfx = this._trim.context;
    this._rowCache = {};
    this._VSCROLL_WIDTH = 2;

    this.tabWidth = this.options.tabWidth;
    this.showLineNumbers = !this.options.hideLineNumbers;
    this.showScrollBars = !this.options.hideScrollBars;
    this.wordWrap = !this.options.disableWordWrap;
    this.readOnly = !!this.options.readOnly;
    this.multiline = !this.options.singleLine;
    this.gridBounds = new Rectangle();
    this.frontCursor = new Cursor();
    this.backCursor = new Cursor();
    this.scroll = new Point();
    this.character = new Size();
    this.theme = this.options.theme;
    this.fontSize = this.options.fontSize;
    this.tokenizer = this.options.tokenizer;
    this.commandPack = this.options.commands || TextEditor;
    this.value = this.options.value;
    this.padding = this.options.padding || 1;

    this.addEventListener("visiblechanged", this.blur.bind(this));
  }

  cursorPageUp(lines, cursor) {
    cursor.incY(-this.gridBounds.height, lines);
    this.scrollIntoView(cursor);
  }

  cursorPageDown(lines, cursor) {
    cursor.incY(this.gridBounds.height, lines);
    this.scrollIntoView(cursor);
  }

  get value() {
    return this._history[this._historyFrame].join("\n");
  }

  set value(txt) {
    txt = txt || "";
    txt = txt.replace(/\r\n/g, "\n");
    if (!this.multiline) {
      txt = txt.replace(/\n/g, "");
    }
    var lines = txt.split("\n");
    this.pushUndo(lines);
    this.render();
    this.emit("change", {
      target: this
    });
  }

  get selectedText() {
    var minCursor = Cursor.min(this.frontCursor, this.backCursor),
      maxCursor = Cursor.max(this.frontCursor, this.backCursor);
    return this.value.substring(minCursor.i, maxCursor.i);
  }

  set selectedText(str) {
    str = str || "";
    str = str.replace(/\r\n/g, "\n");

    if (this.frontCursor.i !== this.backCursor.i || str.length > 0) {
      var minCursor = Cursor.min(this.frontCursor, this.backCursor),
        maxCursor = Cursor.max(this.frontCursor, this.backCursor),
        // TODO: don't recalc the string first.
        text = this.value,
        left = text.substring(0, minCursor.i),
        right = text.substring(maxCursor.i);

      var v = left + str + right;
      this.value = v;
      this.refreshGridBounds();
      this.performLayout();
      minCursor.advanceN(this.lines, Math.max(0, str.length));
      this.scrollIntoView(maxCursor);
      this.clampScroll();
      maxCursor.copy(minCursor);
      this.render();
    }
  }

  get padding() {
    return this._padding;
  }

  set padding(v) {
    this._padding = v;
    this.render();
  }

  get wordWrap() {
    return this._wordWrap;
  }

  set wordWrap(v) {
    this._wordWrap = v || false;
    this.setGutter();
  }

  get showLineNumbers() {
    return this._showLineNumbers;
  }

  set showLineNumbers(v) {
    this._showLineNumbers = v;
    this.setGutter();
  }

  get showScrollBars() {
    return this._showScrollBars;
  }

  set showScrollBars(v) {
    this._showScrollBars = v;
    this.setGutter();
  }

  get theme() {
    return this._theme;
  }

  set theme(t) {
    this._theme = Object.assign({}, DefaultTheme, t);
    this._theme.fontSize = this.fontSize;
    this._rowCache = {};
    this.render();
  }

  get commandPack() {
    return this._commandPack;
  }

  set commandPack(v) {
    this._commandPack = v;
  }

  get selectionStart() {
    return this.frontCursor.i;
  }

  set selectionStart(i) {
    this.frontCursor.setI(i, this.lines);
  }

  get selectionEnd() {
    return this.backCursor.i;
  }

  set selectionEnd(i) {
    this.backCursor.setI(i, this.lines);
  }

  get selectionDirection() {
    return this.frontCursor.i <= this.backCursor.i ? "forward" : "backward";
  }

  get tokenizer() {
    return this._tokenizer;
  }

  set tokenizer(tk) {
    this._tokenizer = tk || JavaScript;
    if (this._history && this._history.length > 0) {
      this.refreshTokens();
      this.render();
    }
  }

  get tabWidth() {
    return this._tabWidth;
  }

  set tabWidth(tw) {
    this._tabWidth = tw || 2;
    this._tabString = "";
    for (var i = 0; i < this._tabWidth; ++i) {
      this._tabString += " ";
    }
  }

  get tabString() {
    return this._tabString;
  }

  get fontSize() {
    return this._fontSize || 16;
  }

  set fontSize(v) {
    v = v || 16;
    this._fontSize = v;
    if (this.theme) {
      this.theme.fontSize = this._fontSize;
      this.resize();
      this.render();
    }
  }

  get lockMovement() {
    return this.focused && !this.readOnly;
  }

  pushUndo(lines) {
    if (this._historyFrame < this._history.length - 1) {
      this._history.splice(this._historyFrame + 1);
    }
    this._history.push(lines);
    this._historyFrame = this._history.length - 1;
    this.refreshTokens();
    this.render();
  }

  redo() {
    if (this._historyFrame < this._history.length - 1) {
      ++this._historyFrame;
    }
    this.refreshTokens();
    this.fixCursor();
    this.render();
  }

  undo() {
    if (this._historyFrame > 0) {
      --this._historyFrame;
    }
    this.refreshTokens();
    this.fixCursor();
    this.render();
  }

  scrollIntoView(currentCursor) {
    this.scroll.y += this.minDelta(currentCursor.y, this.scroll.y, this.scroll.y + this.gridBounds.height);
    if (!this.wordWrap) {
      this.scroll.x += this.minDelta(currentCursor.x, this.scroll.x, this.scroll.x + this.gridBounds.width);
    }
    this.clampScroll();
  }

  readWheel(evt) {
    if (this.focused) {
      if (evt.shiftKey || isChrome) {
        this.fontSize += -evt.deltaX / SCROLL_SCALE;
      }
      if (!evt.shiftKey || isChrome) {
        this.scroll.y += Math.floor(evt.deltaY * this._wheelScrollSpeed / SCROLL_SCALE);
      }
      this.clampScroll();
      this.render();
      evt.preventDefault();
    }
  }

  startPointer(x, y) {
    if (!super.startPointer(x, y)) {
      this._dragging = true;
      this.setCursorXY(this.frontCursor, x, y);
    }
  }

  movePointer(x, y) {
    if (this._dragging) {
      this.setCursorXY(this.backCursor, x, y);
    }
  }

  endPointer() {
    super.endPointer();
    this._dragging = false;
    this._scrolling = false;
  }

  copySelectedText(evt) {
    if (this.focused && this.frontCursor.i !== this.backCursor.i) {
      var clipboard = evt.clipboardData || window.clipboardData;
      clipboard.setData(
        window.clipboardData ? "Text" : "text/plain", this.selectedText);
      evt.returnValue = false;
    }
  }

  cutSelectedText(evt) {
    if (this.focused) {
      this.copySelectedText(evt);
      if (!this.readOnly) {
        this.selectedText = "";
      }
    }
  }

  keyDown(evt){
    if (this.focused && !this.readOnly) {
      var func = this.commandPack[evt.altCmdName] ||
        this.commandPack[evt.cmdName] ||
        evt.altCmdText ||
        evt.cmdText;


      if (func instanceof String || typeof func === "string") {
        console.warn("This shouldn't have happened.");
        func = this.commandPack[func] ||
          this.commandPack[func] ||
          func;
      }

      if (func) {
        this.frontCursor.moved = false;
        this.backCursor.moved = false;
        if (func instanceof Function) {
          func(this, this.lines);
        }
        else if (func instanceof String || typeof func === "string") {
          console.log(func);
          this.selectedText = func;
        }
        evt.resetDeadKeyState();
        evt.preventDefault();

        if (this.frontCursor.moved && !this.backCursor.moved) {
          this.backCursor.copy(this.frontCursor);
        }
        this.clampScroll();
        this.render();
      }
    }
  }

  readClipboard(evt) {
    if (this.focused && !this.readOnly) {
      evt.returnValue = false;
      var clipboard = evt.clipboardData || window.clipboardData,
        str = clipboard.getData(window.clipboardData ? "Text" : "text/plain");
      if (str) {
        this.selectedText = str;
      }
    }
  }

  resize() {
    super.resize();
    this._bg.setSize(this.surfaceWidth, this.surfaceHeight);
    this._fg.setSize(this.surfaceWidth, this.surfaceHeight);
    this._trim.setSize(this.surfaceWidth, this.surfaceHeight);
    if (this.theme) {
      this.character.height = this.fontSize;
      this.context.font = this.character.height + "px " + this.theme.fontFamily;
      // measure 100 letter M's, then divide by 100, to get the width of an M
      // to two decimal places on systems that return integer values from
      // measureText.
      this.character.width = this.context.measureText(
          "MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM")
        .width /
        100;
    }
    this.render();
  }

  pixel2cell(point) {
    const x = point.x * this.imageWidth / this.surfaceWidth,
      y = point.y * this.imageHeight / this.surfaceHeight;
    point.set(
      Math.round(point.x / this.character.width) + this.scroll.x - this.gridBounds.x,
      Math.floor((point.y / this.character.height) - 0.25) + this.scroll.y);
  }

  clampScroll() {
    if (this.scroll.y < 0) {
      this.scroll.y = 0;
    }
    else {
      while (0 < this.scroll.y &&
        this.scroll.y > this.lines.length - this.gridBounds.height) {
        --this.scroll.y;
      }
    }
  }

  refreshTokens() {
    this.tokens = this.tokenizer.tokenize(this.value);
  }

  fixCursor() {
    var moved = this.frontCursor.fixCursor(this.lines) ||
      this.backCursor.fixCursor(this.lines);
    if (moved) {
      this.render();
    }
  }

  setCursorXY(cursor, x, y) {
    x = Math.round(x);
    y = Math.round(y);
    this._pointer.set(x, y);
    this.pixel2cell(this._pointer, this.scroll, this.gridBounds);
    var gx = this._pointer.x - this.scroll.x,
      gy = this._pointer.y - this.scroll.y,
      onBottom = gy >= this.gridBounds.height,
      onLeft = gx < 0,
      onRight = this._pointer.x >= this.gridBounds.width;
    if (!this._scrolling && !onBottom && !onLeft && !onRight) {
      cursor.setXY(this._pointer.x, this._pointer.y, this.lines);
      this.backCursor.copy(cursor);
    }
    else if (this._scrolling || onRight && !onBottom) {
      this._scrolling = true;
      var scrollHeight = this.lines.length - this.gridBounds.height;
      if (gy >= 0 && scrollHeight >= 0) {
        var sy = gy * scrollHeight / this.gridBounds.height;
        this.scroll.y = Math.floor(sy);
      }
    }
    else if (onBottom && !onLeft) {
      var maxWidth = 0;
      for (var dy = 0; dy < this.lines.length; ++dy) {
        maxWidth = Math.max(maxWidth, this.lines[dy].length);
      }
      var scrollWidth = maxWidth - this.gridBounds.width;
      if (gx >= 0 && scrollWidth >= 0) {
        var sx = gx * scrollWidth / this.gridBounds.width;
        this.scroll.x = Math.floor(sx);
      }
    }
    else if (onLeft && !onBottom) {
      // clicked in number-line gutter
    }
    else {
      // clicked in the lower-left corner
    }
    this._lastPointer.copy(this._pointer);
    this.render();
  }

  setGutter() {
    if (this.showLineNumbers) {
      this._topLeftGutter.width = 1;
    }
    else {
      this._topLeftGutter.width = 0;
    }

    if (!this.showScrollBars) {
      this._bottomRightGutter.set(0, 0);
    }
    else if (this.wordWrap) {
      this._bottomRightGutter.set(this._VSCROLL_WIDTH, 0);
    }
    else {
      this._bottomRightGutter.set(this._VSCROLL_WIDTH, 1);
    }
  }

  refreshGridBounds() {
    this._lineCountWidth = 0;
    if (this.showLineNumbers) {
      this._lineCountWidth = Math.max(1, Math.ceil(Math.log(this._history[this._historyFrame].length) / Math.LN10));
    }

    var x = Math.floor(this._topLeftGutter.width + this._lineCountWidth + this.padding / this.character.width),
      y = Math.floor(this.padding / this.character.height),
      w = Math.floor((this.imageWidth - 2 * this.padding) / this.character.width) - x - this._bottomRightGutter.width,
      h = Math.floor((this.imageHeight - 2 * this.padding) / this.character.height) - y - this._bottomRightGutter.height;
    this.gridBounds.set(x, y, w, h);
  }

  performLayout() {

    // group the tokens into rows
    this._tokenRows = [
      []
    ];
    this._tokenHashes = [""];
    this.lines = [""];
    var currentRowWidth = 0;
    var tokenQueue = this.tokens.slice();
    for (var i = 0; i < tokenQueue.length; ++i) {
      var t = tokenQueue[i].clone();
      var widthLeft = this.gridBounds.width - currentRowWidth;
      var wrap = this.wordWrap && t.type !== "newlines" && t.value.length > widthLeft;
      var breakLine = t.type === "newlines" || wrap;
      if (wrap) {
        var split = t.value.length > this.gridBounds.width ? widthLeft : 0;
        tokenQueue.splice(i + 1, 0, t.splitAt(split));
      }

      if (t.value.length > 0) {
        this._tokenRows[this._tokenRows.length - 1].push(t);
        this._tokenHashes[this._tokenHashes.length - 1] += JSON.stringify(t);
        this.lines[this.lines.length - 1] += t.value;
        currentRowWidth += t.value.length;
      }

      if (breakLine) {
        this._tokenRows.push([]);
        this._tokenHashes.push("");
        this.lines.push("");
        currentRowWidth = 0;
      }
    }
  }

  minDelta(v, minV, maxV) {
    var dvMinV = v - minV,
      dvMaxV = v - maxV + 5,
      dv = 0;
    if (dvMinV < 0 || dvMaxV >= 0) {
      // compare the absolute values, so we get the smallest change
      // regardless of direction.
      dv = Math.abs(dvMinV) < Math.abs(dvMaxV) ? dvMinV : dvMaxV;
    }

    return dv;
  }

  fillRect(gfx, fill, x, y, w, h) {
    gfx.fillStyle = fill;
    gfx.fillRect(
      x * this.character.width,
      y * this.character.height,
      w * this.character.width + 1,
      h * this.character.height + 1);
  }

  strokeRect(gfx, stroke, x, y, w, h) {
    gfx.strokeStyle = stroke;
    gfx.strokeRect(
      x * this.character.width,
      y * this.character.height,
      w * this.character.width + 1,
      h * this.character.height + 1);
  }

  renderCanvasBackground() {
    var minCursor = Cursor.min(this.frontCursor, this.backCursor),
      maxCursor = Cursor.max(this.frontCursor, this.backCursor),
      tokenFront = new Cursor(),
      tokenBack = new Cursor(),
      clearFunc = this.theme.regular.backColor ? "fillRect" : "clearRect",
      OFFSETY = OFFSET / this.character.height;

    if (this.theme.regular.backColor) {
      this._bgfx.fillStyle = this.theme.regular.backColor;
    }

    this._bgfx[clearFunc](0, 0, this.imageWidth, this.imageHeight);
    this._bgfx.save();
    this._bgfx.translate(
      (this.gridBounds.x - this.scroll.x) * this.character.width + this.padding, -this.scroll.y * this.character.height + this.padding);


    // draw the current row highlighter
    if (this.focused) {
      this.fillRect(this._bgfx, this.theme.regular.currentRowBackColor ||
        DefaultTheme.regular.currentRowBackColor,
        0, minCursor.y + OFFSETY,
        this.gridBounds.width,
        maxCursor.y - minCursor.y + 1);
    }

    for (var y = 0; y < this._tokenRows.length; ++y) {
      // draw the tokens on this row
      var row = this._tokenRows[y];

      for (var i = 0; i < row.length; ++i) {
        var t = row[i];
        tokenBack.x += t.value.length;
        tokenBack.i += t.value.length;

        // skip drawing tokens that aren't in view
        if (this.scroll.y <= y && y < this.scroll.y + this.gridBounds.height &&
          this.scroll.x <= tokenBack.x && tokenFront.x < this.scroll.x +
          this.gridBounds.width) {
          // draw the selection box
          var inSelection = minCursor.i <= tokenBack.i && tokenFront.i <
            maxCursor.i;
          if (inSelection) {
            var selectionFront = Cursor.max(minCursor,
              tokenFront);
            var selectionBack = Cursor.min(maxCursor, tokenBack);
            var cw = selectionBack.i - selectionFront.i;
            this.fillRect(this._bgfx, this.theme.regular.selectedBackColor ||
              DefaultTheme.regular.selectedBackColor,
              selectionFront.x, selectionFront.y + OFFSETY,
              cw, 1);
          }
        }

        tokenFront.copy(tokenBack);
      }

      tokenFront.x = 0;
      ++tokenFront.y;
      tokenBack.copy(tokenFront);
    }

    // draw the cursor caret
    if (this.focused) {
      var cc = this.theme.cursorColor || "black";
      var w = 1 / this.character.width;
      this.fillRect(this._bgfx, cc, minCursor.x, minCursor.y + OFFSETY, w, 1);
      this.fillRect(this._bgfx, cc, maxCursor.x, maxCursor.y + OFFSETY, w, 1);
    }
    this._bgfx.restore();
  }

  renderCanvasForeground() {
    var tokenFront = new Cursor(),
      tokenBack = new Cursor();

    this._fgfx.clearRect(0, 0, this.imageWidth, this.imageHeight);
    this._fgfx.save();
    this._fgfx.translate((this.gridBounds.x - this.scroll.x) * this.character.width + this.padding, this.padding);
    for (var y = 0; y < this._tokenRows.length; ++y) {
      // draw the tokens on this row
      var line = this.lines[y] + this.padding,
        row = this._tokenRows[y],
        drawn = false,
        textY = (y - this.scroll.y) * this.character.height;

      for (var i = 0; i < row.length; ++i) {
        var t = row[i];
        tokenBack.x += t.value.length;
        tokenBack.i += t.value.length;

        // skip drawing tokens that aren't in view
        if (this.scroll.y <= y && y < this.scroll.y + this.gridBounds.height &&
          this.scroll.x <= tokenBack.x && tokenFront.x < this.scroll.x +
          this.gridBounds.width) {

          // draw the text
          if (this.useCaching && this._rowCache[line] !== undefined) {
            if (i === 0) {
              this._fgfx.putImageData(this._rowCache[line], this.padding, textY + this.padding + OFFSET);
            }
          }
          else {
            var style = this.theme[t.type] || {};
            var font = (style.fontWeight || this.theme.regular.fontWeight || "") +
              " " + (style.fontStyle || this.theme.regular.fontStyle || "") +
              " " + this.character.height + "px " + this.theme.fontFamily;
            this._fgfx.font = font.trim();
            this._fgfx.fillStyle = style.foreColor || this.theme.regular.foreColor;
            this.drawText(this._fgfx, t.value,
              tokenFront.x * this.character.width,
              textY);
            drawn = true;
          }
        }

        tokenFront.copy(tokenBack);
      }

      tokenFront.x = 0;
      ++tokenFront.y;
      tokenBack.copy(tokenFront);
      if (this.useCaching && drawn && this._rowCache[line] === undefined) {
        this._rowCache[line] = this._fgfx.getImageData(
          this.padding,
          textY + this.padding + OFFSET,
          this.imageWidth - 2 * this.padding,
          this.character.height);
      }
    }

    this._fgfx.restore();
  }

  // provides a hook for TextInput to be able to override text drawing and spit out password blanking characters
  drawText(ctx, txt, x, y) {
    ctx.fillText(txt, x, y);
  }


  renderCanvasTrim() {
    var tokenFront = new Cursor(),
      tokenBack = new Cursor(),
      maxLineWidth = 0;

    this._tgfx.clearRect(0, 0, this.imageWidth, this.imageHeight);
    this._tgfx.save();
    this._tgfx.translate(this.padding, this.padding);
    this._tgfx.save();
    this._tgfx.lineWidth = 2;
    this._tgfx.translate(0, -this.scroll.y * this.character.height);
    for (var y = 0, lastLine = -1; y < this._tokenRows.length; ++y) {
      var row = this._tokenRows[y];

      for (var i = 0; i < row.length; ++i) {
        var t = row[i];
        tokenBack.x += t.value.length;
        tokenBack.i += t.value.length;
        tokenFront.copy(tokenBack);
      }

      maxLineWidth = Math.max(maxLineWidth, tokenBack.x);
      tokenFront.x = 0;
      ++tokenFront.y;
      tokenBack.copy(tokenFront);

      if (this.showLineNumbers && this.scroll.y <= y && y < this.scroll.y + this.gridBounds.height) {
        var currentLine = row.length > 0 ? row[0].line : lastLine + 1;
        // draw the left gutter
        var lineNumber = currentLine.toString();
        while (lineNumber.length < this._lineCountWidth) {
          lineNumber = " " + lineNumber;
        }
        this.fillRect(this._tgfx,
          this.theme.regular.selectedBackColor ||
          DefaultTheme.regular.selectedBackColor,
          0, y,
          this.gridBounds.x, 1);
        this._tgfx.font = "bold " + this.character.height + "px " +
          this.theme.fontFamily;

        if (currentLine > lastLine) {
          this._tgfx.fillStyle = this.theme.regular.foreColor;
          this._tgfx.fillText(
            lineNumber,
            0, y * this.character.height);
        }
        lastLine = currentLine;
      }
    }

    this._tgfx.restore();

    if (this.showLineNumbers) {
      this.strokeRect(this._tgfx,
        this.theme.regular.foreColor ||
        DefaultTheme.regular.foreColor,
        0, 0,
        this.gridBounds.x, this.gridBounds.height);
    }

    // draw the scrollbars
    if (this.showScrollBars) {
      var drawWidth = this.gridBounds.width * this.character.width - this.padding,
        drawHeight = this.gridBounds.height * this.character.height,
        scrollX = (this.scroll.x * drawWidth) / maxLineWidth + this.gridBounds.x * this.character.width,
        scrollY = (this.scroll.y * drawHeight) / this._tokenRows.length;

      this._tgfx.fillStyle = this.theme.regular.selectedBackColor ||
        DefaultTheme.regular.selectedBackColor;
      // horizontal
      var bw;
      if (!this.wordWrap && maxLineWidth > this.gridBounds.width) {
        var scrollBarWidth = drawWidth * (this.gridBounds.width / maxLineWidth),
          by = this.gridBounds.height * this.character.height;
        bw = Math.max(this.character.width, scrollBarWidth);
        this._tgfx.fillRect(scrollX, by, bw, this.character.height);
        this._tgfx.strokeRect(scrollX, by, bw, this.character.height);
      }

      //vertical
      if (this._tokenRows.length > this.gridBounds.height) {
        var scrollBarHeight = drawHeight * (this.gridBounds.height / this._tokenRows.length),
          bx = this.image - this._VSCROLL_WIDTH * this.character.width - 2 * this.padding,
          bh = Math.max(this.character.height, scrollBarHeight);
        bw = this._VSCROLL_WIDTH * this.character.width;
        this._tgfx.fillRect(bx, scrollY, bw, bh);
        this._tgfx.strokeRect(bx, scrollY, bw, bh);
      }
    }

    this._tgfx.lineWidth = 2;
    this._tgfx.restore();
    this._tgfx.strokeRect(1, 1, this.imageWidth - 2, this.imageHeight - 2);
    if (!this.focused) {
      this._tgfx.fillStyle = this.theme.regular.unfocused || DefaultTheme.regular.unfocused;
      this._tgfx.fillRect(0, 0, this.imageWidth, this.imageHeight);
    }
  }

  render() {
    if (this.tokens && this.theme) {
      this.refreshGridBounds();
      var boundsChanged = this.gridBounds.toString() !== this._lastGridBounds,
        textChanged = this._lastText !== this.value,
        characterWidthChanged = this.character.width !== this._lastCharacterWidth,
        characterHeightChanged = this.character.height !== this._lastCharacterHeight,
        paddingChanged = this.padding !== this._lastPadding,
        cursorChanged = !this._lastFrontCursor || !this._lastBackCursor || this.frontCursor.i !== this._lastFrontCursor.i || this._lastBackCursor.i !== this.backCursor.i,
        scrollChanged = this.scroll.x !== this._lastScrollX || this.scroll.y !== this._lastScrollY,
        fontChanged = this.context.font !== this._lastFont,
        themeChanged = this.theme.name !== this._lastThemeName,
        focusChanged = this.focused !== this._lastFocused,

        changeBounds = null,

        layoutChanged = this.resized || boundsChanged || textChanged || characterWidthChanged || characterHeightChanged || paddingChanged,
        backgroundChanged = layoutChanged || cursorChanged || scrollChanged || themeChanged,
        foregroundChanged = backgroundChanged || textChanged,
        trimChanged = backgroundChanged || focusChanged,
        imageChanged = foregroundChanged || backgroundChanged || trimChanged;

      if (layoutChanged) {
        this.performLayout(this.gridBounds);
        this._rowCache = {};
      }

      if (imageChanged) {
        if (cursorChanged && !(layoutChanged || scrollChanged || themeChanged || focusChanged)) {
          var top = Math.min(this.frontCursor.y, this._lastFrontCursor.y, this.backCursor.y, this._lastBackCursor.y) - this.scroll.y + this.gridBounds.y,
            bottom = Math.max(this.frontCursor.y, this._lastFrontCursor.y, this.backCursor.y, this._lastBackCursor.y) - this.scroll.y + 1;
          changeBounds = new Rectangle(
            0,
            top * this.character.height,
            this.bounds.width,
            (bottom - top) * this.character.height + 2);
        }

        if (backgroundChanged) {
          this.renderCanvasBackground();
        }
        if (foregroundChanged) {
          this.renderCanvasForeground();
        }
        if (trimChanged) {
          this.renderCanvasTrim();
        }

        this.context.clearRect(0, 0, this.imageWidth, this.imageHeight);
        this.context.drawImage(this._bgCanvas, 0, 0);
        this.context.drawImage(this._fgCanvas, 0, 0);
        this.context.drawImage(this._trimCanvas, 0, 0);
        this.invalidate(changeBounds);
      }

      this._lastGridBounds = this.gridBounds.toString();
      this._lastText = this.value;
      this._lastCharacterWidth = this.character.width;
      this._lastCharacterHeight = this.character.height;
      this._lastWidth = this.imageWidth;
      this._lastHeight = this.imageHeight;
      this._lastPadding = this.padding;
      this._lastFrontCursor = this.frontCursor.clone();
      this._lastBackCursor = this.backCursor.clone();
      this._lastFocused = this.focused;
      this._lastFont = this.context.font;
      this._lastThemeName = this.theme.name;
      this._lastScrollX = this.scroll.x;
      this._lastScrollY = this.scroll.y;
    }
  }
}
