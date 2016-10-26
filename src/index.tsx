import * as _ from 'lodash';
import * as React from "react";
import * as ReactDOM from "react-dom";

import { TileGrid } from "./TileGrid";
import { Tile } from './Tile';

const tileStyle = {
	background: 'white',
	border: '1px solid black'
};

ReactDOM.render(
	<TileGrid rows={20} columns={20} tileWidth={30} tileHeight={30} tileStyle={tileStyle}>
		<Tile row={0} column={0} style={{background: 'blue', color:'white'}}>
			<span>F</span>
		</Tile>
		<Tile row={0} column={1} style={{background: 'blue', color:'white'}}>
			<span>F</span>
		</Tile>
	</TileGrid>,
	document.getElementById("example")
);
