import * as _ from 'lodash';
import * as React from 'react';
import { Tile } from './Tile';
import * as $ from 'jquery';

require('./TileGrid.less');

interface TileGridProps {
	columns: number;
	rows: number;
	tileWidth?: number;
	tileHeight?: number;
	tileStyle?: Object;
	style?: Object;
	onOverTile(row: number, column: number);
	onClickTile(row: number, column: number);
}

export class TileGrid extends React.Component<TileGridProps, {}> {

	public static defaultProps: TileGridProps = {
		columns: 0,
		rows: 0,
		tileWidth: 10,
		tileHeight: 10,
		tileStyle: {},
		style: {},
		onOverTile: () => {},
		onClickTile: () => {}
	};

	private offset: JQueryCoordinates;
	private tiles: {[location: string]: React.ReactHTMLElement<any>};

	_onMouseMove = (event) => {
		const {tileX, tileY} = this._findTileCoordinates(event);
		this.props.onOverTile(tileX, tileY);
	}
	_onMouseOver = () => {
		this.offset = $(this.refs['tileGrid']).offset();
	}
	_onClick = (event) => {
		const {tileX, tileY} = this._findTileCoordinates(event);
		this.props.onClickTile(tileY, tileX);
	}

	render(){
		return (
			<div ref="tileGrid" className="tile-grid" style={this.props.style}
						onMouseMove={this._onMouseMove}
						onMouseOver={this._onMouseOver}
						onClick={this._onClick}>
				{this._renderTiles()}
			</div>
		);
	}

	componentDidMount(){
	}

	_renderTiles(){
		const rows = [];
		this.tiles = {};
		let rawChildren = React.Children.map(this.props.children, (child:any) => {
			const key = [child.props.column, child.props.row].join(',');
			this.tiles[key] = child;
		});
		for(let i = 0; i < this.props.rows; i++){
			const columns = [];
			for(let j = 0; j < this.props.columns; j++){
				const key = [i,j].join(',');
				if(this.tiles[key]){
					columns.push(
						<div className="tile" style={this._getTileStyle(i,j, this.tiles[key].props.style)}>
							{this.tiles[key]}
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

	_findTileCoordinates(event){
		const x = event.clientX - this.offset.left;
		const y = event.clientY - this.offset.top;
		const tileX = Math.floor(x / this.props.tileWidth);
		const tileY = Math.floor(y / this.props.tileHeight);
		return {tileX, tileY};
	}
}
