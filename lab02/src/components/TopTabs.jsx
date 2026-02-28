import React, { useState } from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  padding: 0 16px;
  flex: 1;
`;

const TabBar = styled.View`
  flex-direction: row;
  background-color: ${props => props.theme["SECONDARY_COLOR"]};
  padding: 4px;
  border-radius: 12px;
`;

const TabButton = styled.TouchableOpacity`
  flex: 1;
  padding: 10px 0;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => (props.active ? props.theme["BACKGROUND_COLOR"] : 'transparent')};
`;

const TabText = styled.Text`
  color: ${(props) => (props.active ? props.theme['NEUTRAL_COLOR'] : props.theme['SECONDARY_TEXT_COLOR'])};
  font-size: 14px;
`;

const TabContent = styled.View`
    flex: 1;
    margin-top: 20px;
`;

export default function TopTabs({ tabs = [] }) {
    const [activeTab, setActiveTab] = useState(tabs[0]?.key || '');

    const activeContent = tabs.find((tab) => tab.key === activeTab)?.content;

    return (
        <Container>
            <TabBar>
                {tabs.map((tab) => (
                    <TabButton
                        key={tab.key}
                        active={tab.key === activeTab}
                        onPress={() => setActiveTab(tab.key)}
                    >
                        <TabText active={tab.key === activeTab}>{tab.title}</TabText>
                    </TabButton>
                ))}
            </TabBar>

            <TabContent>{activeContent}</TabContent>
        </Container>
    );
}