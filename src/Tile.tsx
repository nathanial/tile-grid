import * as React from 'react';

interface TileProps {
	x: number;
	y: number;
}

export class Tile extends React.Component<TileProps, {}> {

	render(){
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}
