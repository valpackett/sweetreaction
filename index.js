macro _component_part {
	rule { render { $body:expr } } => { render: function () { return $body; } }
	rule { initialState $body:expr } => { getInitialState: function () { return $body; } }
	rule { defaultProps $body:expr } => { getDefaultProps: function () { return $body; } }
	rule { statics { $($part:_component_part) ... } } => { statics: { $part (,) ... } }
	rule { $name:ident: $body:expr } => { $name: $body }
	rule { $name:ident = $body:expr } => { $name: $body }
	rule { $name:ident $params $body } => { $name: function $params $body }
}

macro component {
	case {
		$macro_name $n:ident { $($part:_component_part) ... }
	} => {
		var React = makeIdent("React", #{$macro_name});
		letstx $React = [React];
		return #{var $n = $React.createClass({ $part (,) ... });}
	}
	case {
		$macro_name $n:ident uses $($mixin:ident) (,) ... { $($part:_component_part) ... }
	} => {
		var React = makeIdent("React", #{$macro_name});
		letstx $React = [React];
		return #{var $n = $React.createClass({ mixins: [$mixin (,) ...], $part (,) ... });}
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
	case {
		$macro_name $what:expr to $where:expr
	} => {
		var React = makeIdent("React", #{$macro_name});
		letstx $React = [React];
		return #{$React.renderComponent($what, $where)}
	}
}
export mount;
