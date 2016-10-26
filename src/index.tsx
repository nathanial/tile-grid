import * as _ from 'lodash';
import * as React from "react";
import * as ReactDOM from "react-dom";

import { TileGrid } from "./TileGrid";

ReactDOM.render(
	<TileGrid rows={20} columns={20} tileWidth={20} tileHeight={20} />,
	document.getElementById("example")
);
