import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts, AppStyles } from '../../theme';

export default styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.primary.themeLight,
   },
   contentCont: {
      //  margin: Metrics.doubleBaseMargin,
      alignItems: 'center',
      backgroundColor: Colors.secondary.Woodsmoke,
      flexDirection: 'row',
      height: Metrics.heightRatio(140),
   },
   txtName: {
      //  ...Fonts.MediumFont(Fonts.Size.xSmall),
      color: Colors.primary.white,
   },
   txtEmail: {
      //  ...Fonts.RegularFont(Fonts.Size.xxSmall),
      color: Colors.primary.white,
      marginTop: 5,
   },
   cellContainer: {
      height: 40,
      marginLeft: Metrics.doubleBaseMargin,
      flexDirection: 'row',
      marginBottom: Metrics.heightRatio(20),
      alignItems: 'center',
   },
   cellContainerLogout: {
      height: 50,
      marginLeft: Metrics.doubleBaseMargin,
      flexDirection: 'row',
      marginVertical: Metrics.heightRatio(20),
      alignItems: 'center',
   },
   txtTitle: {
      //  ...Fonts.MediumFont(Fonts.Size.xSmall),
      color: Colors.primary.white,
      marginLeft: Metrics.baseMargin,
      fontStyle: 'italic'
   },
});
