#Flip Flop

Responsive plugin to swap elements order on window resizing

## Usage

Simplest example

```js
var flipFlop = new FlipFlop({
    flip: '.title'
    flop: '.text'
    width: 1100
});
```
Will swap .title and .text in dom when window width <= 1100 and swap back if width > 1100

### Options

* **parent** – selector for parent element, window if omitted
* **flip** — selector for first element
* **flop** — selector for second element
* **width** — width trigger for swap elements
* **height** — height trigger for swap elements
* **cb** — callback function

Callback function has *flipped* argument. It's *true* when elements swapped. 

### Dependencies
* jQuery
