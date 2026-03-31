import { Ionicons } from "@expo/vector-icons";

export interface ScreenProps {
    name: string;
    component: React.ComponentType<any>;
    iconName: keyof typeof Ionicons.glyphMap;
}

export interface CustomNavigationProps {
    screens: ScreenProps[];
}