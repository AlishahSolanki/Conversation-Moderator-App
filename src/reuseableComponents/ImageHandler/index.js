/* eslint-disable react-native/no-inline-styles */
//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 06/11/2020, 9:27:23 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//

import React, { useState } from "react";
import { Image, ActivityIndicator, View, StyleSheet } from "react-native";
import { ButtonView } from "..";
import { Colors, Metrics } from "../../theme";

const cancelIcon = require("./img/cancel/cancel.png");
const imageHolder = require("./img/imageHolder.png");
const ImageHandler = ({
  source = undefined,
  defaultSource = imageHolder,
  cancelImage = cancelIcon,
  showLoader = false,
  style = {},
  removeImage = undefined,
  index = 0,
  resizeMode = "cover",
}) => {
  const [state, setState] = useState({
    imgLoading: false,
  });

  const { imgLoading } = state;
  return (
    <View>
      <Image
        defaultSource={defaultSource}
        source={source}
        style={{
          backgroundColor: Colors.background?.vlgray || "#F4F6F9",
          ...style,
        }}
        onLoadStart={(e) => setState({ ...state, imgLoading: true })} //Invoked on load start.
        onLoadEnd={() => {
          setState({
            ...state,
            imgLoading: false,
          });
        }} //Invoked when load completes successfully.
        resizeMode={resizeMode}
      />
      {removeImage && (
        <ButtonView
          style={{
            ...styles.removeIcon,
            left: style.width
              ? style.width - Metrics.widthRatio(25)
              : Metrics.widthRatio(62),
          }}
          onPress={() => removeImage(index)}
        >
          <Image
            style={{
              width: Metrics.icons.tiny,
              height: Metrics.icons.tiny,
            }}
            source={cancelImage}
            resizeMode="contain"
          />
        </ButtonView>
      )}
      {showLoader && imgLoading && (
        <ActivityIndicator
          color={Colors.icon?.theme || "#9a9a9a"}
          size="large"
          style={styles.loaderStyle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  removeIcon: {
    backgroundColor: Colors.background?.white,
    position: "absolute",
    // left: Metrics.widthRatio(62),
    top: 5,
    borderRadius: Metrics.widthRatio(23) / 2,
    width: Metrics.widthRatio(23),
    height: Metrics.widthRatio(23),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
});

export default ImageHandler;
