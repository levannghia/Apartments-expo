import React from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Row from './Row';
import { default as theme } from '../../theme.json';

const Stars = ({ score, style }) => {
    return (
        <Row style={style}>
            {[1, 2, 3, 4, 5].map((item, index) => {
                let decimalValue = score % 1;
                let compareScore = score | 0; // will truncate the decimals

                // should hit all of the stars that need to be filled
                if (score / item >= 1)
                    return (
                        <MaterialCommunityIcons
                            key={item}
                            name={"star"}
                            size={24}
                            color={theme["color-primary-500"]}
                        />
                    );
                // a case like 3.5 (3.5 / 4 ! >= 1) but we need to signify the .5
                else if (decimalValue > 0 && compareScore === index)
                    if (decimalValue >= 0.5)
                        return (
                            <MaterialCommunityIcons
                                key={item}
                                name={"star-half-full"}
                                size={24}
                                color={theme["color-primary-500"]}
                            />
                        );

                return (
                    <MaterialCommunityIcons
                        key={item}
                        name={"star-outline"}
                        size={24}
                        color={theme["color-primary-500"]}
                    />
                );
            })}
        </Row>
    )
}

export default Stars