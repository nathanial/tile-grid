import * as _ from 'lodash';
import * as React from 'react';
import { Tile } from './Tile';
import * as $ from 'jquery';

require('./TileGrid.less');

interface ITileCollection {
	[name: string]: React.ReactHTMLElement<any>[];
}

interface TileGridProps {
	columns: number;
	rows: number;
	tileWidth?: number;
	tileHeight?: number;
	tileStyle?: Object;
	tileSetStyle?: Object;
	style?: Object;
	onOverTile?: (row: number, column: number) => void;
	onClickTile?: (row: number, column: number) => void;
}

export class TileGrid extends React.Component<TileGridProps, {}> {

	public static defaultProps: TileGridProps = {
		columns: 0,
		rows: 0,
		tileWidth: 10,
		tileHeight: 10,
		tileStyle: {},
		style: {},
		tileSetStyle: {},
		onOverTile: () => {},
		onClickTile: () => {}
	};

	private offset: JQueryCoordinates;
	private tiles: ITileCollection;

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
		this.tiles = {} as ITileCollection;
		let rawChildren = React.Children.map(this.props.children, (child:any) => {
			const key = [child.props.column, child.props.row].join(',');
			if(_.isUndefined(this.tiles[key])){
				this.tiles[key] = [];
			}
			this.tiles[key].push(child);
		});
		for(let i = 0; i < this.props.rows; i++){
			const columns = [];
			for(let j = 0; j < this.props.columns; j++){
				const key = [i,j].join(',');
				if(this.tiles[key]){
					columns.push(
						<div className="tile-set" style={this._getTileSetStyle(i,j)}>
							{_.map(this.tiles[key], (tile) => {
								const props = tile.props as TileProps;
								return (
									<div className="tile" style={this._getTileStyle(i,j, props.z, props.style)}>
										{tile}
									</div>
								);
							})}
						</div>
					);
				} else {
					columns.push(
						<div className="tile-set" style={this._getTileSetStyle(i,j)}>
							<div className="tile" style={this._getTileStyle(i,j, 0)}></div>
						</div>
					);
				}
			}
			rows.push(columns);
		}
		return rows;
	}

	_getTileSetStyle(row: number, column: number){
		const width = this.props.tileWidth;
		const height = this.props.tileHeight;
		return _.extend({
			position: 'absolute',
			width,
			height,
			left: column * width,
			top: row * height
		}, this.props.tileSetStyle);
	}

	_getTileStyle(row: number, column: number, z: number, localStyle: Object = {}): Object {
		const width = this.props.tileWidth;
		const height = this.props.tileHeight;
		return _.extend({}, {
			position: 'absolute',
			left: 0,
			top: 0,
			width,
			height,
			zIndex: z
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
