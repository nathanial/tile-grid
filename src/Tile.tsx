import * as React from 'react';

interface TileProps {
	column: number;
	row: number;
	style?: Object;
}

export class Tile extends React.Component<TileProps, {}> {

	public static defaultProps: TileProps = {
		column: 0,
		row: 0,
		style: {}
	}

	render(){
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}
