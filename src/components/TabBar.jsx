import { TouchableOpacity, StyleSheet} from "react-native";
import { Text } from "@ui-kitten/components";
import { useState } from "react";

import { theme } from "../theme";
import { Row } from "./Row";

export const TabBar = ({
    tabs,
    style,
}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePress = (index) => {
        setActiveIndex(index);
        func();
    };

    return (
        <Row style={style}>
            {tabs.map((item, index) => (
                <TouchableOpacity
                    onPress={() => handlePress(index, item.onPress)}
                    style={[
                        styles.marginRight,
                        {
                            borderTopColor:
                                activeIndex === index ? theme["color-primary-500"] : "",
                            borderTopWidth: activeIndex === index ? 3 : 0,
                            paddingTop: activeIndex === index ? 0 : 3,
                        },
                    ]}
                    key={item.title}
                >
                    <Text
                        category={"c2"}
                        appearance={activeIndex === index ? "default" : "hint"}
                    >
                        {item.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </Row>
    );
};

const styles = StyleSheet.create({
    marginRight: { marginRight: 15 },
});
