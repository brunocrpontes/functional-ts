"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Maybe_1 = require("./source/Maybe");
function getCurrentPosition() {
    return (0, Maybe_1.Maybe)({ lat: 222, lng: 0.51923810283 });
}
getCurrentPosition()
    .map((point) => {
    console.log(point);
    return (0, Maybe_1.Nothing)();
})
    .map(value => console.log("DID I RUN?", { value }));
