import { Either } from "./source/Either"
import { Maybe, Nothing } from "./source/Maybe"

type Point = { lat: number, lng: number }
function getCurrentPosition(): Maybe<Point> {
    return Maybe({lat: 222, lng: 0.51923810283})
}

getCurrentPosition()
    .map((point) => {
        console.log(point);
        return Nothing()
    })
    .map(value => console.log("DID I RUN?", { value }))
