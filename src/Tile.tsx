import * as React from 'react';


export class Tile extends React.Component<TileProps, {}> {

	public static defaultProps: TileProps = {
		column: 0,
		row: 0,
		z: 0,
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
