import { ImageSourcePropType } from "react-native";

export interface NewsItemProps {
    id: string;
    imageSource: ImageSourcePropType;
    title: string;
    date: string;
    description: string;
}
