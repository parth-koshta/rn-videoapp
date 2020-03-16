import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Theme";

const {width} = Dimensions.get('window');
const playerHeight = width / (16 / 9);
export default styles = StyleSheet.create({
    container: {width: '100%', backgroundColor: Colors.WHITE},
    videoWrapper: {
        width: width,
        height: playerHeight,
        justifyContent: 'center',
        alignItems: 'center',
      },
      video: {
        width: '100%',
        height: '100%',
      },
      seekWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        position: 'absolute',
      },
      nameWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 20,
      },
      playWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',
      },
      quality: {
        fontSize: 8,
        fontWeight: 'bold',
        alignSelf: 'center',
      },
      picker: {
        width: '60%',
        color: '#344953',
        justifyContent: 'center',
      }
})