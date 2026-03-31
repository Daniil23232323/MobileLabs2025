import * as React from "react"
import Svg, { Path } from "react-native-svg"

export default function SteamLogoSVG(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height={props.size ?? 24}
            width={props.size ?? 24}
            {...props}
        >
            <Path
                fill={props.fill || "none"}
                fillRule="evenodd"
                d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1C6.248 1 1.527 5.415 1.041 11.042l5.92 2.494a3.235 3.235 0 011.892-.534l2.409-3.433a4.25 4.25 0 114.127 3.93l-3.406 2.414a3.25 3.25 0 01-6.447.82l-4.123-1.737C2.718 19.616 6.963 23 12 23zm-3.25-4.371a2.38 2.38 0 01-2.198-1.467l1.36.572A1.75 1.75 0 009.27 14.51l-1.246-.525a2.379 2.379 0 11.726 4.645zm6.904-11.127a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zm-2.75 1.75a2.75 2.75 0 115.5 0 2.75 2.75 0 01-5.5 0z"
                clipRule="evenodd"
            />
        </Svg>
    )
}