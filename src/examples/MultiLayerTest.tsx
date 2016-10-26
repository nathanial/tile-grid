import * as React from 'react';
import {TileGrid} from '../TileGrid';
import {Tile} from '../Tile';


const tileStyle = {
	background: 'white',
	border: '1px solid black'
};

export class MultiLayerTest extends React.Component<{},{}> {
	render(){
		return (
			<TileGrid rows={10} columns={10} tileWidth={30} tileHeight={30} tileStyle={tileStyle}>
				<Tile column={0} row={0}>
					<span>A</span>
					<span>B</span>
				</Tile>
			</TileGrid>
		);
	}
}
