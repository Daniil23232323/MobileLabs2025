import styled from 'styled-components/native';

const Avatar = ({imageSource, status, size = 64}) => {
    const Container = styled.View`
        width: ${size}px;
        height: ${size}px;
    `;

    const Image = styled.Image`
        width: ${size}px;
        height: ${size}px;
        border-radius: ${size / 2}px;
    `;

    const StatusIndicator = styled.View`
        position: absolute;
        width: ${size / 4}px;
        height: ${size / 4}px;
        border-radius: ${size / 8}px;
        bottom: 0;
        right: 0;
        border: ${size / 32}px solid ${props => props.theme['BACKGROUND_COLOR']};
    `;

    const OnlineIndicator = styled(StatusIndicator)`
        background-color: ${props => props.theme['POSITIVE_COLOR']};
    `

    const InactiveIndicator = styled(StatusIndicator)`
        background-color: ${props => props.theme['PRIMARY_COLOR']};
    `

    const renderStatusIndicator = () => {
        switch (status) {
            case 'online':
                return <OnlineIndicator />;
            case 'inactive':
                return <InactiveIndicator />;
            default:
                return null;
        }
    };

    return (
        <Container>
            <Image source={imageSource}/>
            {renderStatusIndicator()}
        </Container>
    );
};

export default Avatar;