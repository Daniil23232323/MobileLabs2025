import styled from "styled-components/native";
import {Pressable} from "react-native";

const ButtonContainer = styled(Pressable)`
    padding: 10px 16px;
    border-radius: 8px;
    background-color: ${({active, theme}) =>
            active ? theme["PRIMARY_COLOR"] : theme["SECONDARY_COLOR"]};
`;

const ButtonText = styled.Text`
    color: ${({theme}) => theme["NEUTRAL_COLOR"]};
    font-size: 14px;
`;

export default function CategoryButton({label, active, onPress}) {
    return (
        <ButtonContainer active={active} onPress={onPress}>
            <ButtonText active={active}>{label}</ButtonText>
        </ButtonContainer>
    );
}
