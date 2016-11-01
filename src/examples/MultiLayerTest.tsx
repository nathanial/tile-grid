import * as React from 'react';
import {TileGrid} from '../TileGrid';
import {Tile} from '../Tile';

const tileStyle = {
};
const tileSetStyle = {
	background: 'white',
	border: '1px solid black'
}

export default class MultiLayerTest extends React.Component<{},{}> {
	render(){
		return (
			<TileGrid rows={10} columns={10} tileWidth={30} tileHeight={30} tileStyle={tileStyle} tileSetStyle={tileSetStyle}>
				<Tile column={0} row={0} z={0}>
					<span>A</span>
				</Tile>
				<Tile column={0} row={0} z={1} style={{left: 15}}>
					<span>B</span>
				</Tile>
			</TileGrid>
		);
	}
}
