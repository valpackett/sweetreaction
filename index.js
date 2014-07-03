macro _component_part {
	rule { render { $body:expr } } => { render: function () { return $body; } }
	rule { initialState $body:expr } => { getInitialState: function () { return $body; } }
	rule { statics { $($part:_component_part) ... } } => { statics: { $part (,) ... } }
	rule { $name:ident: $body:expr } => { $name: $body }
	rule { $name:ident = $body:expr } => { $name: $body }
	rule { $name:ident $params $body } => { $name: function $params $body }
}

macro component {
	rule {
		$n:ident { $($part:_component_part) ... }
	} => {
		var $n = React.createClass({ $part (,) ... });
	}
	rule {
		$n:ident uses $($mixin:ident) (,) ... { $($part:_component_part) ... }
	} => {
		var $n = React.createClass({ mixins: [$mixin (,) ...], $part (,) ... });
	}
}
export component;

macro mixin {
	rule {
		$n:ident { $($part:_component_part) ... }
	} => {
		var $n = { $part (,) ... };
	}
}
export mixin;

macro mount {
	rule {
		$what:expr to $where:expr;
	} => {
		React.renderComponent($what, $where);
	}
}
export mount;
