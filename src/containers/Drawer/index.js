import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    LayoutAnimation,
    Image,
    ScrollView,
    Animated
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {logout, request} from '../../actions/ServiceAction';
import constant from '../../constants';
import {LoginContext} from '../../contexts';
import {ButtonView} from '../../reuseableComponents';
import {
  closeDrawer,
  navigate,
  toggleDrawer,
} from '../../services/NavigationService';
import {Images, Metrics} from '../../theme';
// import styles from './styles';

class index extends Component {
    state = {
        isPressed: false,
        animated: new Animated.Value(0),
        opacityA: new Animated.Value(1),
    }
    constructor(props) {
        super(props);
        this._onPress = this._onPress.bind(this);
    }
    _runAnimation() {
        const { animated, opacityA } = this.state;

        Animated.loop(
            Animated.parallel([
                Animated.timing(animated, {
                    toValue: 1,
                    duration: 1000,

                }),
                Animated.timing(opacityA, {
                    toValue: 0,
                    duration: 1000,

                })
            ])
        ).start();
    }
    _stopAnimation() {
        Animated.loop(
            Animated.parallel([
                Animated.timing(animated),
                Animated.timing(opacityA)
            ])
        ).stop();
    }
    _onPress() {
        this.setState(
            state => ({ isPressed: !state.isPressed }),
        )
    }
    _micButton() {
        const { isPressed, animated, opacityA, } = this.state;
        if (isPressed) {
            //some function
            this._runAnimation();
            return (
                <Animated.View style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: 'rgba(153,0,0,0.4)',
                    opacity: opacityA,
                    transform: [
                        {
                            scale: animated
                        }
                    ]
                }}>
                    {/* icon or image */}
                </Animated.View>
            );
        } else {
            //some function
            return (
                <View style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: 'rgba(153,0,0,0.4)',
                }}>
                    {/* icon or image */}
                </View>
            );
        }
    }






    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._onPress}>
                    {this._micButton()}
                </TouchableOpacity>
            </View>
        );
    }
}


const actions = {request};
const mapStateToProps = ({}) => {
  return {};
};

export default connect(mapStateToProps, actions)(index);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

});