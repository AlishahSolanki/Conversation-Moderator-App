//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 06/11/2020, 9:27:23 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//

import React from "react";
import { StyleSheet } from "react-native";
import { Metrics } from "../../theme";
import { ButtonView } from "../../reuseableComponents";

const profileHolder = require("./img/profileHolder.png");
const RoundProfileImage = (props) => {
  const {
    source,
    onPress = undefined,
    imgViewStyle,
    imgStyle,
    defaultSource = profileHolder,
    // resizeMode = 'center',
  } = props;

  return (
    <ButtonView
      style={{ ...styles.imgViewStyle, ...imgViewStyle }}
      disabled={onPress == undefined}
      onPress={onPress}
    >
      <Image
        source={source}
        defaultSource={defaultSource}
        style={{ ...styles.imgStyle, ...imgStyle }}
        // resizeMode={resizeMode}
      />
    </ButtonView>
  );
};

const styles = StyleSheet.create({
  imgViewStyle: {
    alignItems: "center",
    justifyContent: "center",
    // ...AppStyles.dropShadow,
  },
  imgStyle: {
    height: Metrics.widthRatio(50),
    width: Metrics.widthRatio(50),
    borderRadius: Metrics.widthRatio(50 / 2),
    borderWidth: 3,
    borderColor: "#fff",
  },
});

export default RoundProfileImage;
