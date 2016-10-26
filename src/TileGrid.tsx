import * as React from 'react';
require('./TileGrid.less');

interface TileGridProps {
	columns: number;
	rows: number;
	tileWidth?: number;
	tileHeight?: number;
}

export class TileGrid extends React.Component<TileGridProps, {}> {

	public static defaultProps: TileGridProps = {
		columns: 0,
		rows: 0,
		tileWidth: 10,
		tileHeight: 10
	};

	render(){
		return (
			<div className="tile-grid">
				{this._renderTiles()}
			</div>
		);
	}

	_renderTiles(){
		const rows = [];
		for(let i = 0; i < this.props.rows; i++){
			const columns = [];
			for(let j = 0; j < this.props.columns; j++){
				columns.push(<div className="tile" style={this._getTileStyle(i,j)}></div>);
			}
			rows.push(columns);
		}
		return rows;
	}

	_getTileStyle(row: number, column: number): Object {
		const width = this.props.tileWidth;
		const height = this.props.tileHeight;
		return {
			width,
			height,
			left: column * width,
			top: row * height
		};
	}
}
