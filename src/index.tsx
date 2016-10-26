import * as _ from 'lodash';
import * as React from "react";
import * as ReactDOM from "react-dom";

import { TileGrid } from "./TileGrid";
import { Tile } from './Tile';

const tileStyle = {
	background: 'white',
	border: '1px solid black'
};

class App extends React.Component<{}, {}>{

	state = {
		tiles: {}
	};

	render(){
		return (
			<TileGrid rows={20} columns={20} tileWidth={30} tileHeight={30} tileStyle={tileStyle}
								onOverTile={this.onOverTile}
								onClickTile={this.onClickTile}>
				{this._renderTiles()}
			</TileGrid>
		);
	}

	_renderTiles(){
		const tiles = [];
		for(let tileKey of _.keys(this.state.tiles)){
			const value = this.state.tiles[tileKey];
			let [tileX, tileY] = tileKey.split(',');
			if(value){
				tiles.push(
					<Tile column={parseInt(tileX)} row={parseInt(tileY)} style={{background: 'blue', color: 'white'}}>
					</Tile>
				);
			}
		}
		return tiles;
	}

	onOverTile = (row: number, column: number) => {
	}

	onClickTile = (row: number, column: number) => {
		const oldTiles = _.cloneDeep(this.state.tiles);
		const key = [row,column].join(',');
		if(oldTiles[key]){
			oldTiles[key] = false;
		} else {
			oldTiles[key] = true;
		}
		this.setState({
			tiles: oldTiles
		});
	}

}

ReactDOM.render(<App />,
	document.getElementById("example")
);
