import * as _ from 'lodash';
import * as React from "react";
import * as ReactDOM from "react-dom";

import { TileGrid } from "./TileGrid";

ReactDOM.render(
    <TileGrid rows={10} columns={10} />,
    document.getElementById("example")
);
