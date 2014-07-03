# sweetreaction

A collection of [Sweet.js] macros for the excellent [React] library.

You can use it together with [jsx-reader] or [react.hiccup] -- or both if you want some chaos :D

[Sweet.js]: http://sweetjs.org
[React]: https://facebook.github.io/react/index.html
[jsx-reader]: https://github.com/jlongster/jsx-reader
[react.hiccup]: https://github.com/lantiga/react.hiccup

## Usage

Something like this:

```shell
$ npm install sweet.js jsx-reader sweetreaction
$ sjs -l jsx-reader -m sweetreaction example.js
```

Basically, the `sweetreaction` npm module has the exported macros, use it with your usual Sweet.js setup.

## Example

```js
mixin SetIntervalMixin {
	componentWillMount() {
		this.intervals = [];
	}
	setInterval() {
		this.intervals.push(setInterval.apply(null, arguments));
	}
	componentWillUnmount() {
		this.intervals.map(clearInterval);
	}
}

component TickTock uses SetIntervalMixin {
	initialState {seconds: 0}
	componentDidMount() {
		this.setInterval(this.tick, 1000); // Call a method on the mixin
	}
	tick() {
		this.setState({seconds: TickTock.increment(this.state.seconds)});
	}
	render {
		<p>
			React has been running for {this.state.seconds} seconds.
		</p>
	}
	statics {
		increment(n) { return n + 1; }
	}
}

mount <TickTock /> to document.getElementById('example');
```

compiles to:

```js
var SetIntervalMixin$733 = {
	componentWillMount: function () {
		this.intervals = [];
	},
	setInterval: function () {
		this.intervals.push(setInterval.apply(null, arguments));
	},
	componentWillUnmount: function () {
		this.intervals.map(clearInterval);
	}
};
var TickTock$735 = React.createClass({
	mixins: [SetIntervalMixin$733],
	getInitialState: function () {
		return { seconds: 0 };
	},
	componentDidMount: function () {
		this.setInterval(this.tick, 1000); // Call a method on the mixin
	},
	tick: function () {
		this.setState({ seconds: TickTock$735.increment(this.state.seconds) });
	},
	render: function () {
		return React.DOM.p(null, 'React has been running for ', this.state.seconds, ' seconds.');
	},
	statics: {
		increment: function (n$737) {
			return n$737 + 1;
		}
	}
});
React.renderComponent(TickTock$735(null), document.getElementById('example'));
```

## License

Copyright © 2014 [myfreeweb](https://github.com/myfreeweb)
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See the COPYING file for more details.
