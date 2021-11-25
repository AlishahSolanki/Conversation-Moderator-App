//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 06/11/2020, 9:27:23 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//

import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Metrics } from "../../theme";

const icon = require("./img/icNotifications.png");
const IconWithBadge = ({ source = icon, badgeCount = 0, style = {} }) => {
  return (
    <View>
      <Image source={source} resizeMode="contain" style={styles.icon} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: "absolute",
            right: -2,
            top: -4,
            backgroundColor: "#B00020",
            borderRadius: Metrics.widthRatio(14 / 2),
            width: Metrics.widthRatio(14),
            height: Metrics.widthRatio(14),
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#fff",
            borderWidth: 1,
            ...style,
          }}
        >
          <Text style={styles.count}>{badgeCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: { height: Metrics.widthRatio(20), width: Metrics.widthRatio(20) },
  count: {
    fontSize: 8,
    color: "#fff",
    fontWeight: "700",
    lineHeight: 11,
  },
});

export default IconWithBadge;
