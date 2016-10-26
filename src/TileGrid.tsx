import * as React from 'react';
require('./TileGrid.less');

interface Props {
	columns: number;
	rows: number;
}

export class TileGrid extends React.Component<Props, {}> {

	render(){
		return (
			<div className="tile-grid">
				{this.props.children}
			</div>
		);
	}
}
 
