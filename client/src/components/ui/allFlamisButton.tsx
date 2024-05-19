import { LinkComponent } from "./link";

export function AllFlamisButton () {
    return (<LinkComponent variant={"secondary"} to="/flamis-map" className="text-sm opacity-50 border-none !shadow-none background-none">
        Flamis du monde entier
    </LinkComponent>)
}