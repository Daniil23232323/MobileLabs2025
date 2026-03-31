import { ScrollView } from "react-native";
import styled from "styled-components/native";
import CategoryButton from "./CategoryButton";

const Container = styled(ScrollView).attrs(() => ({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { gap: 8, alignItems: "flex-start" },
}))`
    flex-direction: row;
`;

export default function CategoryList({ activeCategory, setActiveCategory, categories, padding }) {
    return (
        <Container style={{padding: padding}}>
            {categories && categories.map((category) => (
                <CategoryButton
                    key={category}
                    label={category}
                    active={category === activeCategory}
                    onPress={() => setActiveCategory(category)}
                />
            ))}
        </Container>
    );
}
