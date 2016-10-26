import * as _ from 'lodash';
import * as React from 'react';
import { Tile } from './Tile';

require('./TileGrid.less');


interface TileGridProps {
	columns: number;
	rows: number;
	tileWidth?: number;
	tileHeight?: number;
	tileStyle?: Object;
	style?: Object;
}

export class TileGrid extends React.Component<TileGridProps, {}> {

	public static defaultProps: TileGridProps = {
		columns: 0,
		rows: 0,
		tileWidth: 10,
		tileHeight: 10,
		tileStyle: {},
		style: {}
	};

	render(){
		return (
			<div className="tile-grid" style={this.props.style}>
				{this._renderTiles()}
			</div>
		);
	}

	_renderTiles(){
		const rows = [];
		const tiles = {};
		let rawChildren = React.Children.map(this.props.children, (child:any) => {
			const key = [child.props.column, child.props.row].join(',');
			tiles[key] = child;
		});
		for(let i = 0; i < this.props.rows; i++){
			const columns = [];
			for(let j = 0; j < this.props.columns; j++){
				const key = [i,j].join(',');
				if(tiles[key]){
					columns.push(
						<div className="tile" style={this._getTileStyle(i,j, tiles[key].props.style)}>
							{tiles[key]}
						</div>
					);
				} else {
					columns.push(<div className="tile" style={this._getTileStyle(i,j)}></div>);
				}
			}
			rows.push(columns);
		}
		return rows;
	}

	_getTileStyle(row: number, column: number, localStyle: Object = {}): Object {
		const width = this.props.tileWidth;
		const height = this.props.tileHeight;
		return _.extend({}, {
			position: 'absolute',
			width,
			height,
			left: column * width,
			top: row * height
		}, this.props.tileStyle, localStyle);
	}
}
