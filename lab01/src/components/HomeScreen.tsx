import { Text, StyleSheet, FlatList } from "react-native";
import NewsItem from "./NewsItem";

import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NewsItemProps } from "../types/newsTypes";

export default function HomeScreen() {
    const [news, setNews] = useState<NewsItemProps[]>([]);

    useEffect(() => {
        setNews(newsData);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Новини</Text>
            <FlatList
                data={news}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NewsItem {...item} />}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

const newsData = [
    {
        id: '1',
        title: 'Відкриття нового технологічного центру',
        date: '2025-03-08',
        description: 'У Житомирі відкрили новий центр для стартапів, що займаються штучним інтелектом.',
        imageSource: require("../assets/news/tech.png")
    },
    {
        id: '2',
        title: 'Українські студенти виграли хакатон',
        date: '2025-03-07',
        description: 'Команда студентів здобула перемогу в міжнародному хакатоні, представивши унікальну систему кібербезпеки.',
        imageSource: require("../assets/news/hackathon.png")
    },
    {
        id: '3',
        title: 'Новий закон про екологічний транспорт',
        date: '2025-03-06',
        description: 'Верховна Рада ухвалила законопроєкт про стимулювання електротранспорту в Україні.',
        imageSource: require("../assets/news/ecobus.png")
    },
    {
        id: '4',
        title: 'Український додаток отримав міжнародну нагороду',
        date: '2025-03-05',
        description: 'Мобільний додаток для вивчення мов, розроблений українськими програмістами, здобув нагороду "Best App 2025".',
        imageSource: require("../assets/news/award.png")
    },
    {
        id: '5',
        title: 'Успіх українських аграріїв',
        date: '2025-03-04',
        description: 'Україна вийшла в лідери за експортом органічної продукції до ЄС.',
        imageSource: require("../assets/news/agr.png")
    },
    {
        id: '6',
        title: 'Космічна галузь України розвивається',
        date: '2025-03-03',
        description: 'Україна підписала договір про співпрацю з NASA у сфері дослідження космосу.',
        imageSource: require("../assets/news/space.png")
    },
    {
        id: '7',
        title: 'Нові правила для IT-компаній',
        date: '2025-03-02',
        description: 'Міністерство цифрової трансформації оголосило про спрощення оподаткування для ІТ-бізнесу.',
        imageSource: require("../assets/news/it.png")
    },
    {
        id: '8',
        title: 'Запуск першого українського електромобіля',
        date: '2025-03-01',
        description: 'Компанія з України представила перший серійний електромобіль, що може конкурувати з Tesla.',
        imageSource: require("../assets/news/electrocar.png")
    },
];
