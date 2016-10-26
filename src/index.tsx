import * as _ from 'lodash';
import * as React from "react";
import * as ReactDOM from "react-dom";

import { TileGrid } from "./TileGrid";
import { Tile } from './Tile';

const tileStyle = {
	background: 'red',
	border: '1px solid black'
};

ReactDOM.render(
	<TileGrid rows={20} columns={20} tileWidth={20} tileHeight={20} tileStyle={tileStyle}>
		<Tile x={0} y={0}>
			<span>F</span>
		</Tile>
	</TileGrid>,
	document.getElementById("example")
);
