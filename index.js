macro _component_part {
	rule { render { $pre:expr (;) ... $body:expr } } => { render: function () { $pre (;) ... return $body; } }
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
		letstx $compName = [makeValue(#{$n}[0].token.value, #{macro_name})];
		letstx $React = [makeIdent("React", #{$macro_name})];
		return #{var $n = $React.createClass({ displayName: $compName, $part (,) ... });}
	}
	case {
		$macro_name $n:ident uses $($mixin:expr) (,) ... { $($part:_component_part) ... }
	} => {
		letstx $compName = [makeValue(#{$n}[0].token.value, #{macro_name})];
		letstx $React = [makeIdent("React", #{$macro_name})];
		return #{var $n = $React.createClass({ displayName: $compName, mixins: [$mixin (,) ...], $part (,) ... });}
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
		letstx $React = [makeIdent("React", #{$macro_name})];
		return #{$React.renderComponent($what, $where)}
	}
}
export mount;
